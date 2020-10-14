import { useCallback } from 'react'

import { useWallet } from 'use-wallet'

import { voteOption } from '../bento/utils'
import { Auction } from './useAuctions'

  const useVote = (auction:Auction ) => {
    const { account } = useWallet()
  
    const handleVote = useCallback(
      async (support:boolean, amount: string) => {
  
        return await voteOption(
          auction.govContract, 
          auction.proposalId, 
          support, 
          amount,
          account
        )
        .then((rst) => {
          return rst
        })
      },
      [account],
    )
  
    return { onVote: handleVote }
}

export default useVote
