import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LinkBody = ({ text, url, ...props }) => {
  return (
    <LinkWrapper>
      <NavLink to={url} {...props}>
        {text}
      </NavLink>
    </LinkWrapper>
  )
}

const LinkWrapper = styled.div`
  height: 100%;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 0.5em;
  padding-right: 0.5em;
`

const NavLink = styled(Link)`
  color: ${(props) => props.theme.navbar.foreground};
  text-decoration: none;
  transition: filter 250ms ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }
`

export default LinkBody
