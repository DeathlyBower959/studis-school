import styled, { ThemeContext } from 'styled-components'
import { useContext, useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react'
import { Link as ReactLink } from 'react-router-dom'

// Atoms
import Spinner from '../atoms/Loaders/Spinner'
import Link from '../atoms/Navbar/Link'
import Account from '../contexts/AccountContext'
import Dropdown from '../atoms/Navbar/Dropdown'
import DropdownLink from '../atoms/Navbar/DropdownLink'

const Navbar = () => {
  const { isLoggedIn, AuthLogout } = useContext(Account)
  const theme = useContext(ThemeContext)

  const userLoggedInState = isLoggedIn()
  const [isNavShown, setShowNav] = useState(false)

  const hideNav = () => {
    setShowNav(false)
  }

  return (
    <>
      <NavWrapper $isNavShown={isNavShown} className="noSelect">
        <LeftDiv>
          <AppLogo tabIndex="-1" to="/">
            Studis
          </AppLogo>
          <VerticalSeparator />
          <NavLink onClick={hideNav} text="Home" url="/" />
          {/* MODIFY URLS HERE */}
          {/* <NavLink text="NAME" url="/URL" /> */}
          <NavLink onClick={hideNav} text="Study" url="/study" />
          <NavLink onClick={hideNav} text="My Words" url="/words" />
          <NavLink onClick={hideNav} text="Community" url="/community" />
          <NavLink onClick={hideNav} text="About" url="/about" />
        </LeftDiv>
        <Separator />
        <RightDiv>
          {userLoggedInState === 0 && (
            <>
              <NavLink onClick={hideNav} text="Signup" url="/signup" />
              <NavLink onClick={hideNav} text="Login" url="/login" />
            </>
          )}
          {userLoggedInState === 1 && (
            <>
              <Dropdown tb="0" title="Account">
                <DropdownLink
                  onClick={hideNav}
                  text="Settings"
                  url="/settings"
                />
                <DropdownLink
                  tabIndex="0"
                  onClick={() => {
                    hideNav()
                    AuthLogout()
                  }}
                  text="Log Out"
                />
                {/* <DropdownLink onClick={hideNav} text="Log Out" url="/" /> */}
              </Dropdown>
            </>
          )}
          {userLoggedInState === 2 && (
            <>
              <Spinner height="auto" />
            </>
          )}
        </RightDiv>
        <MobileAppLogo tabIndex="-1" to="/">
          Studis
        </MobileAppLogo>
      </NavWrapper>
      <MobileNavBackground />
      <MobileNavWrapper className="noSelect">
        <AppLogo tabIndex="-1" to="/" $isNavShown={isNavShown} $alwaysShow>
          Studis
        </AppLogo>
        <HamburgerWrapper
          tabIndex="0"
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault()

              setShowNav((prev) => !prev  )
            }
          }}>
          <Hamburger
            toggled={isNavShown}
            toggle={setShowNav}
            duration={1}
            color={theme.navbar.foreground}
          />
        </HamburgerWrapper>
      </MobileNavWrapper>
    </>
  )
}

const HamburgerWrapper = styled.div`
  pointer-events: all;
`

const AppLogo = styled(ReactLink)`
  padding-left: 0.3em;
  font-size: 2em;
  transition: margin-left 600ms ease-in-out;

  user-select: none;

  margin: 0;

  color: ${(props) => props.theme.accent};
  margin-left: ${(props) => (props.$isNavShown ? '-4em' : '0')};

  text-decoration: none;

  display: block;
  @media only screen and (max-width: 650px) {
    display: ${(props) => (props.$alwaysShow ? 'block' : 'none')};
  }
`

const MobileAppLogo = styled(ReactLink)`
  padding: 0.5em;
  /* height: 30vw;
  width: 30vw; */

  user-select: none;

  font-size: 3em;
  margin-bottom: 0;

  text-align: center;

  color: ${(props) => props.theme.accent};

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;

  text-decoration: none;

  display: none;
  @media only screen and (max-width: 650px) {
    display: block;
  }
`
const VerticalSeparator = styled.div`
  width: 1px;
  height: 100%;
  margin-left: 1em;
  margin-right: 0.5em;
  background-color: ${(props) => props.theme.navbar.foreground};
`

const MobileNavBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 3.5rem;

  padding: 0.5rem 0.3rem 0.5rem 0.5rem;

  background-color: ${(props) => props.theme.navbar.background};
  justify-content: space-between;
  align-items: center;

  display: none;
  @media only screen and (max-width: 650px) {
    display: block;
  }
`

const MobileNavWrapper = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  height: 3.5rem;

  padding: 0.5rem 0.3rem 0.5rem 0.5rem;
  z-index: 99999999;

  pointer-events: none;

  /* background-color: ${(props) => props.theme.navbar.background}; */
  justify-content: space-between;
  align-items: center;

  display: none;
  @media only screen and (max-width: 650px) {
    display: flex;
  }
`

const NavLink = styled(Link)`
  user-select: none;

  @media only screen and (max-width: 650px) {
    margin: 0.5em;
  }
`

const LeftDiv = styled.div`
  display: flex;

  @media only screen and (max-width: 650px) {
    flex-direction: column;
    margin-bottom: 0.5em;
  }
`

const Separator = styled.hr`
  display: none;

  @media only screen and (max-width: 650px) {
    display: block;
    border: 1px solid ${(props) => props.theme.tertiaryBackground};
  }
`

const RightDiv = styled.div`
  display: flex;

  @media only screen and (max-width: 650px) {
    flex-direction: column;
    margin-top: 0.5em;
  }
`

const NavWrapper = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;

  z-index: 99999;

  background-color: ${(props) => props.theme.navbar.background};

  display: flex;
  justify-content: space-between;
  padding: 0.5rem;

  transition: left 600ms ease-in-out;
  ${(props) => (props.$isNavShown ? 'left: 0;' : 'left: -100vw;')}

  @media only screen and (max-width: 650px) {
    display: block;
    position: fixed;
    align-items: center;
    height: 100%;
  }
`

export default Navbar
