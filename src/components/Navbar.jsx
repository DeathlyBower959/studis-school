import { useContext } from 'react'
import styled from 'styled-components'
import Spinner from '../atoms/Loaders/Spinner'

// Atoms
import Link from '../atoms/Navbar/Link'
import Account from '../contexts/AccountContext'

const Navbar = () => {
  const { isLoggedIn } = useContext(Account)

  const userLoggedInState = isLoggedIn()

  return (
    <NavWrapper>
      <LeftDiv>
        <NavLink text="Home" url="/" />
        <NavLink text="Planner" url="/planner" />
      </LeftDiv>
      <RightDiv>
        {userLoggedInState === 0 && (
          <>
            <NavLink text="Signup" url="/signup" />
            <NavLink text="Login" url="/login" />
          </>
        )}
        {userLoggedInState === 1 && (
          <>
            <NavLink text="Account" url="/" />
          </>
        )}
        {userLoggedInState === 2 && (
          <>
            <Spinner height='auto'/>
          </>
        )}
      </RightDiv>
    </NavWrapper>
  )
}

const NavLink = styled(Link)``

const LeftDiv = styled.div`
  display: flex;
`

const RightDiv = styled.div`
  display: flex;
`

const NavWrapper = styled.div`
  position: sticky;
  right: 0;
  left: 0;
  top: 0;
  height: 3em;

  background-color: ${(props) => props.theme.navbar.background};

  display: flex;
  justify-content: space-between;
  padding: 0.5em;
`

export default Navbar
