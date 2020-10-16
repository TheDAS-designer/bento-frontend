import { useCallback, useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getGovs, getLaunchedVoteByGovContract } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

export interface IVote {
  proposal_id: string,
  originator: string,
  endAtBlockNumber: number,
  nowBentosInVote: BigNumber,
  trueoptionVotes: number,
  falseOptionVotes: number,
  stateNow: number,
  name: string,
  icon: string,
}
const useVotes = () => {
  const [votes, setVotes] = useState([] as Array<IVote>)
  
  const bento = useBento()
  const wallet = useWallet()
  const block = useBlock()
  const account  = wallet.account

  const govs = getGovs(bento)

  const fetchVotes = useCallback(async () => {
    let votes: Array<IVote> = []
    await Promise.all(
      govs.map(
        async ({
          govContract,
          name,
          icon,
          pid,
        }: {
          govContract: Contract
          name: string
          icon: string
          pid: number
        }) => {
          if(pid === 0) return
          // @ts-ignore
          const _block = await bento.web3.eth.getBlockNumber()
          let vote = await getLaunchedVoteByGovContract(govContract, _block)

          vote.map( (_vote) => {
            votes.push({
              ..._vote,
              name,
              icon,
            })
          })
        },
      ))
    //console.log('votes:', votes)
    votes = votes.sort((vote1, vote2) => vote2.nowBentosInVote.toNumber() - vote1.nowBentosInVote.toNumber())
    setVotes(votes)
  }, [account, bento, setVotes, govs])

  useEffect(() => {
    if (bento && account) {
      fetchVotes()
    }
  }, [account, block, bento])

  return votes
}

export default useVotes
