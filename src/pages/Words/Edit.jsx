import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function EditWord() {
  const { wordId } = useParams()
  
  return (
    <Header>User Word | wordId: {wordId} </Header>
  )
}

const Header = styled.h1`
    color: red;
`

export default EditWord