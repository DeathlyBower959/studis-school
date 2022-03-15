import styled from 'styled-components'

// Atoms
import Link from '../atoms/Navbar/Link'

const Navbar = () => {
  return (
    <NavWrapper>
      <NavLink text="test" url="/planner" />
    </NavWrapper>
  )
}

const NavLink = styled(Link)`
  &:visited {
    color: red;
  }
`

const NavWrapper = styled.div`
  position: sticky;
  right: 0;
  left: 0;
  top: 0;
  height: 3em;

  background-color: ${props => props.theme.navbar.background};
`

export default Navbar
