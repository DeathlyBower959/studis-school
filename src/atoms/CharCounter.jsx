import styled from 'styled-components'

const CharCounter = ({ currentLength, maxLength, ...props }) => {
  return (
    <Chars {...props}>
      {currentLength}/{maxLength}
    </Chars>
  )
}

const Chars = styled.p`
  color: ${(props) => props.theme.secondaryMuted};
  margin: 0;
`

export default CharCounter
