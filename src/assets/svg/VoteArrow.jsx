import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const VoteArrow = (props) => {
  const theme = useContext(ThemeContext)
  return (
    <StyledSvg
      width="22"
      height="23"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M7.29167 3.94878L7.29167 2C7.29167 1.44772 6.84395 1 6.29167 1L3.70833 0.999999C3.15605 0.999999 2.70833 1.44771 2.70833 2L2.70833 3.94878C2.70833 4.43189 2.31669 4.82353 1.83358 4.82353C1.09774 4.82353 0.690699 5.67674 1.15369 6.24867L4.22276 10.0399C4.62299 10.5343 5.37701 10.5343 5.77724 10.0399L8.84631 6.24867C9.3093 5.67675 8.90226 4.82353 8.16642 4.82353C7.68331 4.82353 7.29167 4.43189 7.29167 3.94878Z"
        fill={
          props.isdownvoted || props.isupvoted
            ? theme.accent
            : theme.muted
        }
        stroke={
          props.isdownvoted || props.isupvoted
            ? theme.secondaryAccent
            : theme.secondaryMuted
        }
        strokeLinecap="round"
      />
    </StyledSvg>
  )
}

const StyledSvg = styled.svg`
  cursor: pointer;
  path {
    transition: all 250ms;
  }
`

export default VoteArrow
