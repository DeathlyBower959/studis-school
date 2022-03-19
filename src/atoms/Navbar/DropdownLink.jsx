import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LinkBody = ({ text, url, onClick, ...props }) => {
  return (
    <LinkWrapper>
      {url ? (
        <NavLink onClick={onClick} to={url} {...props}>
          {text}
        </NavLink>
      ) : (
        <NavLinkNoTo onClick={onClick} {...props}>
          {text}
        </NavLinkNoTo>
      )}
    </LinkWrapper>
  )
}

const LinkWrapper = styled.div`
  height: 100%;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5em;
  padding-left: 1em;
`

const NavLink = styled(Link)`
  color: ${(props) => props.theme.navbar.foreground};
  text-decoration: none;
  transition: filter 250ms ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }
`
const NavLinkNoTo = styled.p`
  color: ${(props) => props.theme.navbar.foreground};
  text-decoration: none;
  transition: filter 250ms ease-in-out;

  cursor: pointer;

  margin: 0;

  &:hover {
    filter: brightness(0.8);
  }
`

export default LinkBody
