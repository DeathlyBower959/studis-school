import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkBody = ({ text, url }) => {
  return (
    <LinkWrapper>
      <NavLink to={url}>{text}</NavLink>
    </LinkWrapper>
  );
};

const LinkWrapper = styled.div`
  height: 100%;
  width: min-content;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 10px;
  padding-right: 10px;
`

const NavLink = styled(Link)`
  color: ${props => props.theme.navbar.foreground};
  text-decoration: none;
`

export default LinkBody;
