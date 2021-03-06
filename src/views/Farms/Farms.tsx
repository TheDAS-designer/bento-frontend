import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import womenChef from '../../assets/img/womenChef.png'
import {default as Button, CyberButton} from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'
import { useI18n  } from 'use-i18n';

const Farms: React.FC = () => {
  const t = useI18n();
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={womenChef} height="120" />}
                subtitle={t.farm_subtitle}
                title={t.farm_title}
              />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
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
           <CyberButton
            buttonWidth={250}
            buttonHeight={100}
            onClick={onPresentWalletProviderModal}
            buttonFontSize={30}
            text={`${t.unlockWallet}`}

          />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
