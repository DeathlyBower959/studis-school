import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ripped from "../assets/ripped.png";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <PageNotFoundWrapper>
      <Header404>404</Header404>
      <Desc>Sorry, we can't seem to find what you're looking for.</Desc>
      <ImgWrapper>
        <img draggable={false} src={ripped} width="100%" />
      </ImgWrapper>
      <GoBack onClick={() => navigate(-1)}>Go Back</GoBack>
    </PageNotFoundWrapper>
  );
};

const PageNotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  margin: 0 auto;

  text-align: center;
`;

const ImgWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  top: 20%;
  z-index: -1;

  height: 80vh;
  img {
    filter: blur(3px);
    /* Make image get bigger and always fill bottom of screen */
  }
`;

const Header404 = styled.h2`
  padding: 20px 0px 0px 0px;
  margin: 0;
  color: ${(props) => props.theme.secondaryForeground};

  font-family: "Marck Script", cursive;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  font-size: 6em;
`;

const Desc = styled.h1`
  padding: 0px 10px;
  color: ${(props) => props.theme.foreground};

  font-family: "Marck Script", cursive;
`;

const GoBack = styled.button`
  width: 100px;
  padding: 10px;
  margin-top: 20px;
  color: ${(props) => props.theme.foreground};
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: filter 240ms ease-in-out;
  background: ${(props) => props.theme.accent};
  background: linear-gradient(
    58deg,
    ${(props) => props.theme.accent} 20%,
    ${(props) => props.theme.secondaryAccent} 100%
  );
  &:hover {
    filter: brightness(0.9);
  }
`;

export default PageNotFound;
