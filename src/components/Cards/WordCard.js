import styled from 'styled-components'
import { useState } from 'react'

export const CardContainer = ({ front, back, ...props }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  return (
    <StyledCardContainer {...props}>
      <CardWrapper
        maxw={props.maxw}
        isCardFlipped={isCardFlipped}
        onClick={() => {
          setIsCardFlipped((prev) => !prev)
        }}>
        <StyledCardFront {...props}>{front}</StyledCardFront>

        <StyledCardBack {...props}>{back}</StyledCardBack>
      </CardWrapper>
    </StyledCardContainer>
  )
}

const StyledCardContainer = styled.div`
  display: block;
  background-color: transparent;
  width: clamp(
    ${(props) => props.minw},
    ${(props) => props.prefferedw},
    ${(props) => props.maxw}
  );
  height: clamp(
    ${(props) => props.minh || '9em'},
    ${(props) => props.prefferedh || '9em'},
    ${(props) => props.maxh || '9em'}
  );
  perspective: 1000px;
  cursor: pointer;

  min-width: 17em;
  min-height: 9em;
  /* flex: 1 1 25%; */
  /* max-width: 25%; */
`

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  text-align: center;
  transform-style: preserve-3d;
  box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: -1;

  transform-origin: 0;
  position: relative;
  
  /* Return */
  transition: transform 0.6s, z-index 0s 0.167s;
  /* Forward */
  ${(props) =>
    props.isCardFlipped && 'transition: transform 0.6s, z-index 0.330s;'}
  ${(props) => props.isCardFlipped && 'z-index: 0;'}
    
    transform: rotateY(${(props) => (props.isCardFlipped ? '180deg' : '0')})
      translateX(${(props) => (props.isCardFlipped ? '-100%' : '0')});

    &:hover {
      transform: rotateY(${(props) => (props.isCardFlipped ? '180deg' : '0')})
      translateX(${(props) => (props.isCardFlipped ? '-100%' : '0')})${(
  props
) => !props.isCardFlipped && `translateX(-0.2em) translateY(-0.1em)`};
    }
`

const StyledCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  background: ${(props) => props.theme.secondaryBackground};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25em 1em;
  border-radius: 8px;

  transition: transform 400ms ease-in-out;
`

const StyledCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  background-color: ${(props) => props.theme.secondaryBackground};
  transform: rotateY(180deg);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25em 1em;
  border-radius: 8px;
`
