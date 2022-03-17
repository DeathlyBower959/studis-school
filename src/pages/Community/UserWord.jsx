import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function UserWord() {
  const { userId, wordId } = useParams()
  
  return (
    <Header>User Set | userId: {userId} | wordId: {wordId}</Header>
  )
}

const Header = styled.h1`
    color: red;
`

export default UserWord
