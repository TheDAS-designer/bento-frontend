import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import womenChef from '../../assets/img/womenChef.png'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      
      <StyledText>
        <MasterChefText>Cyber🦾Union</MasterChefText> 
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: #f7f4f2;
  font-family: 'Reem Kufi', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`

const MasterChefText = styled.span`
font-family: Tomorrow, sans-serif;

`
export default Logo
