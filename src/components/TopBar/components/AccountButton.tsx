import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import {default as Button, CyberButton} from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import { useI18n  } from 'use-i18n';


interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const t = useI18n();
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!account ? (
        <CyberButton onClick={handleUnlockClick} size="lg" buttonWidth={100} text={t.unlockWallet} />
      ) : (
        <CyberButton onClick={onPresentAccountModal} size="lg" buttonWidth={100} text={t.myWallet} />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
