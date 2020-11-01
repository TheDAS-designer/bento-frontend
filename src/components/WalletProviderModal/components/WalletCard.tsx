import React from 'react'
import {default as Button, CyberButton}  from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'
import { useI18n } from 'use-i18n'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) =>{
  const t = useI18n()
  return (
  <Card>
    <CardContent>
      <CardIcon>{icon}</CardIcon>
      <CardTitle text={title} />
      <Spacer />
      <CyberButton onClick={onConnect} buttonWidth={185} text={t.walletConnect} />
    </CardContent>
  </Card>
)}

export default WalletCard
