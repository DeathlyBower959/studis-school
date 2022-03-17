import styled, { ThemeContext } from 'styled-components'
import { useContext, useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react'
import { Link as ReactLink } from 'react-router-dom'

// Atoms
import Spinner from '../atoms/Loaders/Spinner'
import Link from '../atoms/Navbar/Link'
import Account from '../contexts/AccountContext'

// Images
import ApplicationLogo from '../assets/AppLogo.png'

const Navbar = () => {
  const { isLoggedIn } = useContext(Account)
  const theme = useContext(ThemeContext)

  const userLoggedInState = isLoggedIn()
  const [isNavShown, setShowNav] = useState(false)

  return (
    <>
      <NavWrapper shown={isNavShown}>
        <LeftDiv>
          <NavLink text="Home" url="/" />
          {/* MODIFY URLS HERE */}
          {/* <NavLink text="NAME" url="/URL" /> */}
          <NavLink text="Study" url="/study" />
          <NavLink text="My Words" url="/words" />
          <NavLink text="Community" url="/community" />
          <NavLink text="About" url="/about" />
        </LeftDiv>
        <Separator />
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
              <Spinner height="auto" />
            </>
          )}
          <MobileAppLogo src={ApplicationLogo} />
        </RightDiv>
      </NavWrapper>
      <MobileNav>
        {/* PUT AN APP LOGO HERE */}
        <AppLogo src={ApplicationLogo} isNavShown={isNavShown} />
        <StyledHamburger
          toggled={isNavShown}
          toggle={setShowNav}
          duration={1}
          color={theme.navbar.foreground}
        />
      </MobileNav>
    </>
  )
}

const AppLogo = styled.img`
  padding: 0.5em;
  height: 3.5em;
  width: auto;
  transition: margin-left 600ms ease-in-out;

  ${(props) => (props.isNavShown ? 'margin-left: -4em;' : 'margin-left: 0;')}
`
const MobileAppLogo = styled.img`
  padding: 0.5em;
  height: 30vw;
  width: 30vw;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;

  display: none;
  @media only screen and (max-width: 500px) {
    display: block;
  }
`

const StyledHamburger = styled(Hamburger)``

const MobileNav = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5em;

  padding-right: 0.3em;

  background-color: ${(props) => props.theme.navbar.background};
  justify-content: space-between;
  align-items: center;

  display: none;
  @media only screen and (max-width: 500px) {
    display: flex;
  }
`

const NavLink = styled(Link)`
  @media only screen and (max-width: 500px) {
    margin: 0.5em;
  }
`

const LeftDiv = styled.div`
  display: flex;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    margin-bottom: 0.5em;
  }
`

const Separator = styled.hr`
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
    border: 1px solid ${(props) => props.theme.thirdBackground};
  }
`

const RightDiv = styled.div`
  display: flex;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    margin-top: 0.5em;
  }
`

const NavWrapper = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5em;

  background-color: ${(props) => props.theme.navbar.background};

  display: flex;
  justify-content: space-between;
  padding: 0.5em;

  transition: left 600ms ease-in-out;
  ${(props) => (props.shown ? 'left: 0;' : 'left: -100vw;')}

  @media only screen and (max-width: 500px) {
    display: block;
    position: fixed;
    align-items: center;
    height: 100%;
  }
`

export default Navbar
