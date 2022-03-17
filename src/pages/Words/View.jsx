import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function View() {
  const { wordId } = useParams()
  
  return (
    <Header>Viewing User Word | wordId: {wordId} </Header>
  )
}

const Header = styled.h1`
    color: red;
`

export default View