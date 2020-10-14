import { useCallback, useState } from 'react'
import useBento from './useBento'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { approveBento } from '../bento/utils'


const useApprove = (govAddress) => {
  const [result, setResult] = useState(false)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()

  const handleApprove = useCallback(async (amount: string) => {
      //@ts-ignore
      return await approveBento(bento.contracts.bento , govAddress, account, amount).then((result) => {
        console.log('result in useAppve', result)
        return (result)
      }) 
  }, [result, account, setResult, bento])

  return { onApprove: handleApprove }
}

export default useApprove
