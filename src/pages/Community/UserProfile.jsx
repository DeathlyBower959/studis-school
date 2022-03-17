import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function UserProfile() {
  const { userId } = useParams()
  
  return (
    <Header>User Profile | userId: {userId}</Header>
  )
}

const Header = styled.h1`
    color: red;
`

export default UserProfile
