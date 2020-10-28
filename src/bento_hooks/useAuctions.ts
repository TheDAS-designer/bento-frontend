import { useCallback, useEffect, useState, useRef } from 'react'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getProposalsEvent, getVoteCreatedEvent, getGovs, totalGovTokensLocked, getVoteObjectInfo } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

export interface Auction {
  proposalId: number
  auctionName: string
  proposalDescription: string
  Proposer: string
  proposalStartBlock: number
  proposalEndBlock: number
  totalVotes: BigNumber
  totalBentoInVote: BigNumber
  endAtBlockNumber: number
  auctionForVotes: BigNumber
  auctionAgainstVotes: BigNumber
  auctionState: number
  auctionResult: boolean
  auctionOriginator: string
  govContract: Contract
}
const useAuctions = () => {
  // const _isMounted = useRef(true);
  const [auctions, setAuctions] = useState([] as Array<Auction>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const block = useBlock()
  const govs = getGovs(bento)

  const fetchAuctions = useCallback(async () => {
    // if(!_isMounted.current) return
    let auctions: Array<Auction> = await Promise.all(
      govs.filter( gov => gov.pid !== 0)
      .map(
        async ({
          govContract,
          originalGovContract,
          name,
          icon
        }) => {
          //@ts-ignore
          const _block = await bento.web3.eth.getBlockNumber()
          const votes = await getVoteCreatedEvent(govContract, _block)
          const totalVotes = await totalGovTokensLocked(govContract)
         //mydebug
          let proposals = await getProposalsEvent(originalGovContract, name, _block)
          proposals = proposals.filter( p => {
            let flag = false
            for(let i in votes){
              if(votes[i].Proposalid === p.id){
                  flag = true
                  break
              }
            }
            return flag
          })

          
          const _auctions = Promise.all(proposals.map( async(p, i) => {
            let auction
            const voteInfo = await getVoteObjectInfo(govContract, votes[i].Proposalid)
            auction= {
              proposalId: p.id,
              auctionName: `${name} ${p.id}`,
              proposalDescription: p.description,
              Proposer: p.proposer.toString(),
              proposalStartBlock: p.startBlock,
              proposalEndBlock: p.endBlock,
              totalVotes: totalVotes,
              totalBentoInVote: new BigNumber(voteInfo.nowBentosInVote),
              endAtBlockNumber: votes[i].endAtBlockNumber - _block,
              auctionForVotes: voteInfo.trueOptionVotes? new BigNumber(voteInfo.trueOptionVotes): new BigNumber(0),
              auctionAgainstVotes: voteInfo.falseOptionVotes? new BigNumber(voteInfo.falseOptionVotes): new BigNumber(0),
              auctionState: voteInfo.stateNow,
              auctionResult: voteInfo.voteResult,
              auctionOriginator: voteInfo.originator.toString(),
              govContract
            }
            // console.log('auctionForVotes:', auction.auctionForVotes)
            // console.log('auctionAgainstVotes:', auction.auctionAgainstVotes)
            // console.log('height :', `${(auction.auctionForVotes.div(auction.auctionForVotes.plus(auction.auctionAgainstVotes)).times(new BigNumber(100)))
            //   .toNumber()
            //   .toLocaleString('en-US')
            //   .slice(0, -1)}%`)
            return auction
          }))


          return _auctions
        },
      ),
    )
   
    setAuctions(auctions.flat())
  }, [account, bento, setAuctions])

  useEffect(() => {
    if (bento) {
      console.log('fdasfdsafdsafdsafdsafdsa')
      fetchAuctions()
    }
    // return () => {
    //   _isMounted.current = false
    // }
  }, [account, block, bento])

  return auctions
}

export default useAuctions
