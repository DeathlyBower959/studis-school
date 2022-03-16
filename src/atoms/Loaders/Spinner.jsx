import styled from 'styled-components'

const Spinner = ({ height, speed = '1s' }) => {
  return <Loader height={height} speed={speed}></Loader>
}

const Loader = styled.div`
  border: 4px solid ${(props) => props.theme.thirdBackground};
  border-top: 4px solid ${(props) => props.theme.secondaryAccent};
  border-radius: 50%;
  height: ${(props) => props.height};
  /* width: ${props => props.height}; */
  aspect-ratio: 1/1;

  animation: spin ${(props) => props.speed} linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
