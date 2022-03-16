import { useContext } from 'react'
import styled from 'styled-components'
import Account from '../contexts/AccountContext'

function About() {
  const { AuthLogin } = useContext(Account)

  return (
    <>
      <Header>About Page</Header>
      <button onClick={() => {
        AuthLogin('maryjane1988@gmail.com', 'MaryJane123')
      }}>Login</button>
    </>
  )
}

const Header = styled.h1`
  color: red;
`

export default About
