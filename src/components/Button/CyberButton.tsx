import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import '../../CyberCSS.css'
import { Link } from 'react-router-dom'
//https://www.youtube.com/watch?v=3RRgVHd2TXQ
interface ButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'tertiary',
  clipPath?: string,
  buttonWidth?: number,
  buttonHeight?: number,

}

export const CyberButton: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
  clipPath,
  buttonWidth,
  buttonHeight,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      boxShadow = `4px 4px 8px ${color.grey[300]},
        -8px -8px 16px ${color.grey[100]}FF;`
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      clipPath = clipPath
      break
    case 'lg':
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      // boxShadow = `6px 6px 12px ${color.grey[300]},
      //   -12px -12px 24px -2px ${color.grey[100]}ff;`
      boxShadow = `-3px -3px 16px ${color.grey[300]},
        -12px -12px 24px -2px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return (<StyledLink to={to}><span className="btn__content">{text}</span>
        <span className="btn__glitch"></span>
        <span className="btn__label"></span>
      </StyledLink>
      )
    } else if (href) {
      return <StyledExternalLink href={href} target="_blank"><span className="btn__content">{text}</span>
        <span className="btn__glitch"></span>
        <span className="btn__label"></span>
      </StyledExternalLink>
    } else {
      if(clipPath){
        return (
  
          <div style={{width: buttonWidth? `${buttonWidth}px`: '50px', 
          height:buttonHeight ?`${buttonHeight}px` : '37px'}}>
            <span className="btn__content" style={{clipPath: clipPath}}>{text}</span>
            <span className="btn__glitch"></span>
            <span className="btn__label"></span>
          </div>)

      }else{
        return (
          <div style={{ width: buttonWidth? `${buttonWidth}px`: '50px', 
          height:buttonHeight ?`${buttonHeight}px` : '37px'}} >
            <span className="btn__content" >{text}</span>
            <span className="btn__glitch"></span>
            <span className="btn__label"></span>
            </div>
            )
      }
    }
  }, [href, text, to])
  console.log('clipPath:', clipPath)
  console.log('buttonWidth:', buttonWidth)
  console.log('buttonHeight:', buttonHeight)
  if (clipPath) {
    return (
      <button className="btn"
    style={{ width: buttonWidth? `${buttonWidth}px`: '50px', 
    height:buttonHeight ?`${buttonHeight}px` : '37px', clipPath: clipPath}}
    onClick={onClick}>
        {children}
        {ButtonChild}
      </button>
    )
  } else {
    return (
      // : ${clipPath}`: 'polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0)'
      <button className="btn"
      style={{ width: buttonWidth? `${buttonWidth}px`: '50px', 
      height:buttonHeight ?`${buttonHeight}px` : '37px'}}
      onClick={onClick}>
          {children}
          {ButtonChild}
        </button>
    )
  }
 
}

{/* <div style={{width: buttonSize, boxShadow: boxShadow}}>
    
</div> */}

export const StyledMiniButton: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      boxShadow = `none`
      buttonSize = 20
      fontSize = 20
      break
    case 'lg':
      boxShadow = `none`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      boxShadow = `none`
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{text}</StyledExternalLink>
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>

  )
}


interface StyledButtonProps {
  boxShadow: string,
  color: string,
  disabled?: boolean,
  fontSize: number,
  padding: number,
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
  align - items: center;
  background - color: ${ props => props.theme.color.grey[200] };
  border: 0;
  box - shadow: ${ props => props.boxShadow };
  color: ${ props => !props.disabled ? props.color : `${props.color}55` };
  cursor: pointer;
  display: flex;
  font - size: ${ props => props.fontSize } px;
  font - weight: 700;
  height: ${ props => props.size } px;
  justify - content: center;
  outline: none;
  padding - left: 0px;
  padding - right: 0px;
  width: 100 %;
  clip - path: polygon(92 % 0, 100 % 25 %, 100 % 100 %, 8 % 100 %, 0 % 75 %, 0 0);

  `

// &:hover {
//   background-color: ${props => props.theme.color.grey[100]};
// }

const StyledLink = styled(Link)`
  align - items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify - content: center;
  margin: 0 ${ props => -props.theme.spacing[4] } px;
  padding: 0 ${ props => props.theme.spacing[4] } px;
  text - decoration: none;
  `

const StyledExternalLink = styled.a`
  align - items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify - content: center;
  margin: 0 ${ props => -props.theme.spacing[4] } px;
  padding: 0 ${ props => props.theme.spacing[4] } px;
  text - decoration: none;
  `
