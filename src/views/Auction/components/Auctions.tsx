import BigNumber from 'bignumber.js'
import { tmpdir } from 'os'
import React, { useEffect, useState, useCallback, createContext } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import {default as Button, CyberButton, StyledMiniButton}  from '../../../components/Button'
import CardContent from '../../../components/CardContent'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { bnToDec } from '../../../utils'
import { useI18n } from 'use-i18n';
import Card, { GreyCard, LightCard } from './Card'
import { default as useAuctions, Auction } from '../../../bento_hooks/useAuctions'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useVote from '../../../bento_hooks/useVoteToAuction'
import useApprove from '../../../bento_hooks/useAuctionApprove'
import DepositModal from './DepositModal'
import useModal from '../../../bento_hooks/useAuctionModal'
import useBentoBalance from '../../../bento_hooks/useBentoBalance'

const Auctions: React.FC = () => {

  const { account } = useWallet()

  const auctions = useAuctions()
  if (auctions) console.log('auctions:', auctions)

  return (
    <Box>
      {!!auctions.length ? auctions.map((auction, i) => (
        <StyledRow key={i}>
          <React.Fragment>
          <Spacer size='md'></Spacer>
            <AuctionDetails auction={auction} />
          </React.Fragment>
        </StyledRow>
      )) : (
          <StyledLoadingWrapper>
            <Loader text="Cooking the rice ..." />
          </StyledLoadingWrapper>
        )}
    </Box>
  )
}


interface AuctionDetailsContent {
  auction: Auction
}
const AuctionDetails: React.FC<AuctionDetailsContent> = ({ auction }: AuctionDetailsContent) => {
  const t = useI18n();
  const [showMore, setShowMore] = useState(true)
  const poolActive = true

  const [arrow, setArrow] = useState('⬇️')
  const handleExpand = useCallback(() => {
    console.log(`showMore ${showMore}`)
    setShowMore(!showMore)
    if (showMore === true) {
      setArrow('⬇️')
    } else {
      setArrow('⬆️')
    }
  }, [showMore, arrow])


  // useEffect(() => {
  //   async function fetchEarned() {
  //     if (sushi) return
  //     const earned = await getEarned(
  //       getMasterChefContract(sushi),
  //       lpTokenAddress,
  //       account,
  //     )
  //     setHarvestable(bnToDec(earned))
  //   }
  //   if (sushi && account) {
  //     fetchEarned()
  //   }
  // }, [sushi, lpTokenAddress, account, setHarvestable])
  interface Support {
    support: boolean
  }

  const tokenBalance = useBentoBalance();
  const [support, setSupport] = useState(false)
  const { onVote } = useVote(auction)
  const { onApprove } = useApprove(auction.govContract.options.address)
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onVote}
      onApprove={onApprove}
      tokenName={auction.auctionName}
    />,
  )
  const forVotes = auction.auctionForVotes
  const againstVotes = auction.auctionAgainstVotes

  return (
    
    <StyledPositionCard>
      <Spacer size='sm'></Spacer>
      <AutoColumn gap="0px">
        <FixedHeightRow>
          <RowFixed gap="2px">
          </RowFixed>
          <RowFixed gap="2px">
            <StyledLink
              target="_blank"
              href="https://uniswap.info/pair/0xce84867c3c02b05dc570d0135103d3fb9cc19433"
            >
              {auction.auctionName}
            </StyledLink>
          </RowFixed>
          <RowFixed gap="2px">
            <StyledText>{getBalanceNumber(auction.totalBentoInVote)} BENTO </StyledText>
          </RowFixed>
          <RowFixed gap="2px">
            <StyledText>{getBalanceNumber(auction.totalVotes) < 1 ? 0 : getBalanceNumber(auction.totalVotes)} COMP </StyledText>
          </RowFixed>
          <RowFixed gap="2px">
            <StyledText>{auction.endAtBlockNumber} BLOCKS</StyledText>
          </RowFixed>
      
          <RowFixed gap="0px">
            <StyledContent>
              <StyledMiniButton
                size='sm'
                disabled={!poolActive}
                onClick={handleExpand}
              >
                {arrow}
              </StyledMiniButton>
            </StyledContent>
          </RowFixed>
        </FixedHeightRow>
      </AutoColumn>
      {showMore && (<hr />)}
      {showMore && (
        <AutoColumn justify='flex-start'>
          <RowFixed gap="0px">
            <StyledText>
              {auction.auctionName}：{auction.proposalDescription}
            </StyledText>
          </RowFixed>
        </AutoColumn>
      )}
      {showMore && (
        <StyledCards>
          <StyledRow>
            <StyledCardWrapper>
              <Card>
                <CardContent>
                  <StyledContainer>
                    <StyledText>
                      {t.auction_agree}
                    </StyledText>
                    <StyledBox>
                      <StyledBar height={

                        forVotes.isZero() ? '0%'
                          : againstVotes.isZero() ? '100%'
                            : (`${(forVotes.div(forVotes.plus(againstVotes)).times(new BigNumber(100)))
                              .toNumber()
                              .toLocaleString('en-US')
                              .slice(0, -1)}%`)
                      }>

                      </StyledBar>
                    </StyledBox>
                    <StyledText>
                      <CyberButton
                        size='md'
                        buttonWidth={250}
                        disabled={!poolActive}
                        text={t.auction_agree}
                        onClick={() => { onPresentDeposit(true) }}
                      >
                      </CyberButton>
                    </StyledText>
                  </StyledContainer>
                </CardContent>
              </Card>
            </StyledCardWrapper>
            <StyledCardWrapper>
              <Card>
                <CardContent>
                  <StyledContainer>
                    <StyledText>
                      {t.auction_disagree}
                    </StyledText>
                    <StyledBox>
                      <StyledBar height={

                        againstVotes.isZero() ? '0%'
                          : forVotes.isZero() ? '100%'
                            : (`${(againstVotes.div(forVotes.plus(againstVotes)).times(new BigNumber(100)))
                              .toNumber()
                              .toLocaleString('en-US')
                              .slice(0, -1)}%`)
                      }>

                      </StyledBar>
                    </StyledBox>
                    <StyledText>
                      <CyberButton
                        size='sm'
                        buttonWidth={250}
                        disabled={!poolActive}
                        text={t.auction_disagree}
                        onClick={() => { onPresentDeposit(false) }}
                      >
                      </CyberButton>
                    </StyledText>
                  </StyledContainer>
                </CardContent>
              </Card>
            </StyledCardWrapper>
          </StyledRow>
        </StyledCards>
      )}
    </StyledPositionCard>
  )
}

const Box = styled.div({})

const StyledPositionCard = styled.div`
  width: 900px;
  border: 2px solid #00f0ff;
  position: relative;
`

const AutoColumn = styled.div<{
  gap?: 'sm' | 'md' | 'lg' | string
  justify?: 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'space-between'
}>`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap};
  justify-items: ${({ justify }) => justify && justify};
`

const Row = styled(Box) <{ align?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: ${({ align }) => (align ? align : 'center')};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

const RowBetween = styled(Row)`
  justify-content: space-between;
`

const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`

export const AutoRow = styled(Row) <{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

const RowFixed = styled(Row) <{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`


const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

const MiniCardIcon: React.FC = ({ children }) => (
  <StyledMiniCardIcon>
    {children}
  </StyledMiniCardIcon>
)

const StyledMiniCardIcon = styled.div`
  background-color: ${props => props.theme.color.grey[200]};
  font-size: 20px;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
  // box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
  //   inset -6px -6px 12px ${props => props.theme.color.grey[100]};
  // margin: 0 auto ${props => props.theme.spacing[3]}px;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 2);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBox = styled.div`
  position:relative;
  display:table-cell;
  vertical-align:bottom;
  height:150px;
`
const StyledBar = styled.div<{
  height?: '0%' | string
}>`
  width: 350px;
  height: ${({ height }) => height};
  position: relative;
  border-left: 350px solid #FF8484;
  border-bottom: 0px solid #FF8484;

  bottom: 0;
  animation: up3 1s ease-in;

  &:before{
    position:absolute;
    left:0;right:0;top:100%;
    // padding:5px 1em 0;
      display:block;
    text-align:center;
    content:attr(title);
    word-wrap: break-word;
  }
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

const StyledContainer = styled.div`
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  // line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
  `

const StyledText = styled.div`
  display: flex;
  justify-content: center;
  color: #aa9584;
  width: 100%;
  // margin-top: 12px;
  // line-height: 64px;
  font-size: 16px;
  text-align: center;
  align-items: center;
`

export default Auctions
