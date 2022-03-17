import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function UserSet() {
  const { userId, setId } = useParams()
  
  return (
    <Header>User Set | userId: {userId} | setId: {setId}</Header>
  )
}

const Header = styled.h1`
    color: red;
`

export default UserSet
