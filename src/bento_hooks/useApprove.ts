import { useCallback, useState } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approveGovToken, getBentoMinerContract, getBentoContract } from '../bento/utils'
import { BigNumber } from '../sushi'

// const useApprove = (lpContract: Contract) => {
const useApprove = (farm) => {
  const [result, setResult] = useState(false)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)
  const lpContract = getBentoMinerContract(bento)
  // const tokenContract = getBentoContract(bento)

  const handleApprove = useCallback(async (amount: string) => {
    console.log('approve amount:', amount)
    console.log('farm.tokenContract,farm.govAddress:',farm.tokenContract,farm.govAddress)
      return await approveGovToken(farm.tokenContract,farm.govAddress, account, amount).then((result) => {
        console.log('result in useAppve', result)
        return (result)
      }) 
      // try {
      //   await .then((result) => result)
      //   // const tx = await approve(bentoMinerContract, bentoMinerContract, account)
      // } catch (e) {
      //   console.log(`failed to approve the allowance ${e} account ${account} tokenContract ${tokenContract}`)
      //   return false
      // }
      // return false
  }, [result, account, lpContract, bentoMinerContract, setResult])

  return { onApprove: handleApprove }
}

export default useApprove
