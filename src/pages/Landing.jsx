import styled from 'styled-components'
import {
  CardContainer,
  Card,
  CardFront,
  CardBack,
  EndCard
} from '../components/Cards/HomeCard'

const Landing = () => {
  return (
    <PageWrapper>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Ik its kinda weird, but you have to put the cards in reverse order */}
      <CardContainer width="300px" height="200px" isCenter>
        <Card>
          <EndCard>Ending Card</EndCard>
        </Card>
        <Card>
          <CardFront>2</CardFront>
          <CardBack>2</CardBack>
        </Card>
        <Card>
          <CardFront>
            <p style={{ color: 'white' }}>
              These cards are completely modular, so you it accomodates any
              amount of cards!
            </p>
          </CardFront>
          <CardBack>Back</CardBack>
        </Card>
      </CardContainer>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`

// const CardContainer = styled.div`
//   background-color: transparent;
//   width: 300px;
//   height: 200px;
//   perspective: 1500px;
// `

// const Card = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   text-align: center;
//   transition: transform 0.6s, z-index 0s 0.165s;
//   transform-style: preserve-3d;
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

//   position: absolute;
//   z-index: -1;

// ${(props) => props.isCardFlipped && 'transform 0.6s, transition: z-index 1s;'}
// ${(props) => props.isCardFlipped && 'z-index: ' + (props.offset || 0) + ';'}
//   /* ${(props) =>
//     props.isCardFlipped && 'animation: animateZIndex 1s forwards;'} */

//   /* rotateY(${(props) => (props.isCardFlipped ? '-180deg' : '0')})  */
//   transform-origin: 10px 10px;
//   transform:
//   rotateY(${(props) => (props.isCardFlipped ? '-180deg' : '0')})
//   rotateZ(${(props) =>
//     props.isCardFlipped ? (45 + (props.offset * 15 || 0)) * -1 + 'deg' : '0'});
//   /* transform:
//   rotateX(${(props) => (props.isCardFlipped ? '180deg' : '0')})
//   rotateZ(${(props) =>
//     props.isCardFlipped ? 90 + (props.offset || 0) + 'deg' : '0'})
//   translateX(${(props) => (props.isCardFlipped ? '85%' : '0')})
//   translateY(${(props) => (props.isCardFlipped ? '100%' : '0')}) */
//   ;
// `

// const CardFront = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   -webkit-backface-visibility: hidden;
//   backface-visibility: hidden;
//   background: linear-gradient(
//     135deg,
//     ${(props) => props.theme.accent},
//     ${(props) => props.theme.secondaryAccent}
//   );
//   color: black;
// `

// const CardBack = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   -webkit-backface-visibility: hidden;
//   backface-visibility: hidden;

//   background-color: ${(props) => props.theme.tertiaryBackground};
//   color: white;
//   transform: rotateY(180deg);
// `

export default Landing
