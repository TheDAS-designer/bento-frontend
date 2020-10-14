import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import WalletProviderModal from '../../components/WalletProviderModal'
import womenChef from '../../assets/img/womenChef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useModal from '../../bento_hooks/useModal'
import Bento_Balances from './components/Bento_Balances'
import { useI18n } from 'use-i18n';
import { useWallet } from 'use-wallet'

const Home: React.FC = () => {
  const t = useI18n()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <PageHeader
              icon={<img src={womenChef} height={120} />}
              title={t.title}
              subtitle={t.subtitle}
              content={t.content}
            />

            <Container>
              {/* <Balances />  */}
              <Bento_Balances />
            </Container>
          </>
        ) : (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={onPresentWalletProviderModal}
                text="🔓 Unlock Wallet"
              />
            </div>
          )}
      </Page>
    </Switch>

  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
