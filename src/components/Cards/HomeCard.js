import styled from 'styled-components'
import { useState } from 'react'

export const CardContainer = ({ children, ...props }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(0)

  return (
    <StyledCardContainer {...props}>
      {children.map((child, index) => {
        return (
          <CardWrapper
            maxw={props.maxw}
            key={`cardWrapper-${index}`}
            $isEnd={children.length - 1 === index}
            offset={index === 0 ? null : children.length - index}
            isCardFlipped={
              index === 0 ? null : isCardFlipped > children.length - index
            }
            onClick={
              index === 0
                ? null
                : () => {
                    setIsCardFlipped((prev) => {
                      if (prev > children.length - index) return prev - 1
                      else return prev + 1
                    })
                  }
            }>
            {child}
          </CardWrapper>
        )
      })}
    </StyledCardContainer>
  )
}

export const Card = ({ children }) => {
  return <>{children}</>
}

export const CardFront = ({ children, ...props }) => {
  return <StyledCardFront {...props}>{children}</StyledCardFront>
}

export const CardBack = ({ children, ...props }) => {
  return <StyledCardBack {...props}>{children}</StyledCardBack>
}

export const EndCard = ({ children, ...props }) => {
  return (
    <CardFront endcard {...props}>
      {children}
    </CardFront>
  )
}

const StyledCardContainer = styled.div`
  background-color: transparent;
  width: clamp(
    ${(props) => props.minw},
    ${(props) => props.prefferedw},
    ${(props) => props.maxw}
  );
  height: clamp(
    ${(props) => props.minh},
    ${(props) => props.prefferedh},
    ${(props) => props.maxh}
  );
  perspective: 3000px;
`

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2);

  position: absolute;
  z-index: -1;


  /* Return */
  transition: transform 0.6s, z-index 0s 0.185s;
  /* Forward */
  ${(props) =>
    props.isCardFlipped && 'transition: transform 0.6s, z-index 0.316s;'}
  ${(props) => props.isCardFlipped && 'z-index: ' + (props.offset || 0) + ';'}

  transform-origin: 10px 10px;
  transform: rotateY(${(props) => (props.isCardFlipped ? '-180deg' : '0')})
    rotateZ(
      ${(props) =>
        props.isCardFlipped ? (25 + (props.offset * 5 || 0)) * -1 + 'deg' : '0'}
    )
    ${(props) =>
      props.$isEnd &&
      !props.isCardFlipped &&
      `translateX(-20px) translateY(-10px)`};

  &:hover {
    transform: rotateY(${(props) => (props.isCardFlipped ? '-180deg' : '0')})
      rotateZ(
        ${(props) =>
          props.isCardFlipped
            ? (25 + (props.offset * 5 || 0)) * -1 + 'deg'
            : (props.offset || 0) * -1 + 'deg'}
      )
      ${(props) =>
        props.$isEnd &&
        !props.isCardFlipped &&
        `translateX(-10px) translateY(-5px)`};
  }

  
  @media only screen and (max-width: ${(props) => `calc(${props.maxw} * 3)`}) {
    /* Return */
  transition: transform 0.6s, z-index 0s 0.167s;
  /* Forward */
  ${(props) =>
    props.isCardFlipped && 'transition: transform 0.6s, z-index 0.330s;'}
  ${(props) => props.isCardFlipped && 'z-index: ' + (props.offset || 0) + ';'}
    
    transform: rotateY(${(props) => (props.isCardFlipped ? '180deg' : '0')})
      translateX(${(props) => (props.isCardFlipped ? '-100%' : '0')})
      translateY(${(props) => (props.isCardFlipped ? '100%' : '0')})
      rotateZ(
        ${(props) =>
          props.isCardFlipped ? (props.offset * 3 || 0) * -1 + 'deg' : '0'}
      )
      ${(props) =>
        props.$isEnd &&
        !props.isCardFlipped &&
        `translateX(-20px) translateY(-10px)`};

    &:hover {
      transform: rotateY(${(props) => (props.isCardFlipped ? '180deg' : '0')})
      translateX(${(props) => (props.isCardFlipped ? '-100%' : '0')})
      translateY(${(props) => (props.isCardFlipped ? '100%' : '0')})
      rotateZ(
        ${(props) =>
          props.isCardFlipped ? (props.offset * 3 || 0) * -1 + 'deg' : '0'}
      )
      ${(props) =>
        props.$isEnd &&
        !props.isCardFlipped &&
        `translateX(-20px) translateY(-10px)`};
    }
  }
`

const StyledCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: ${(props) =>
    props.endcard
      ? props.theme.tertiaryBackground
      : `
      linear-gradient(135deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), 
      linear-gradient(135deg, ${props.theme.accent}, ${props.theme.secondaryAccent})`};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
`

const StyledCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

  background-color: ${(props) => props.theme.tertiaryBackground};
  color: white;
  transform: rotateY(180deg);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
`
