import styled from 'styled-components'
import { useState } from 'react'

export const CardContainer = ({ front, back, termIndex, index, ...props }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  const hideCard = () => {
    if (isCardFlipped === true) setIsCardFlipped(false)
  }

  return (
    <StyledCardContainer $termIndex={termIndex} $index={index} {...props}>
      <CardWrapper
        maxw={props.maxw}
        isCardFlipped={isCardFlipped}
        onClick={() => {
          setIsCardFlipped((prev) => !prev)
        }}>
        {termIndex !== index && hideCard()}

        <StyledCardFront {...props}>{front}</StyledCardFront>
        <StyledCardFront $spacer $isCardFlipped={isCardFlipped} {...props}>
          {front}
        </StyledCardFront>

        <StyledCardBack {...props}>{back}</StyledCardBack>
        <StyledCardBack $spacer $isCardFlipped={isCardFlipped} {...props}>
          {back}
        </StyledCardBack>
      </CardWrapper>
    </StyledCardContainer>
  )
}

const StyledCardContainer = styled.div`
display: ${(props) => (props.$termIndex === props.$index ? 'block' : 'none')};
  background-color: transparent;
  width: clamp(
    ${(props) => props.minw},
    ${(props) => props.prefferedw},
    ${(props) => props.maxw}
  );
  /* height: clamp(
    ${(props) => props.minh},
    ${(props) => props.prefferedh},
    ${(props) => props.maxh}
  ); */
  height: auto;
  perspective: 1000px;
  cursor: pointer;

  flex: 1 1 25%;
  min-width: 17em;
  max-width: 25%;

`

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  position: ${(props) => (props.$spacer ? 'relative' : 'absolute')};
  width: 100%;
  height: auto;
  backface-visibility: hidden;

  background: ${(props) => props.theme.secondaryBackground};

  display: ${(props) =>
    props.$spacer && props.$isCardFlipped ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  border-radius: 8px;

  transition: transform 400ms ease-in-out;

  visibility: ${(props) => (props.$spacer ? 'hidden' : 'visible')};
`

const StyledCardBack = styled.div`
  position: ${(props) => (props.$spacer ? 'relative' : 'absolute')};
  width: 100%;
  height: auto;
  backface-visibility: hidden;

  background-color: ${(props) => props.theme.secondaryBackground};
  transform: rotateY(180deg);

  display: ${(props) =>
    props.$spacer && !props.$isCardFlipped ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  border-radius: 8px;

  visibility: ${(props) => (props.$spacer ? 'hidden' : 'visible')};
`
