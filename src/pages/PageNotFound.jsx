import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

// Icons
import { RotateCcw } from 'react-feather'

// Images
import ripped from '../assets/ripped.png'

const PageNotFound = () => {
  const navigate = useNavigate()
  const theme = useContext(ThemeContext)

  return (
    <PageNotFoundWrapper>
      <HeaderBackgroundWrapper>
        <Header404>404</Header404>
        <Desc>Sorry, we can't seem to find what you're looking for.</Desc>
        <ImgWrapper>
          <Image draggable={false} src={ripped} />
        </ImgWrapper>
        <GoBack onClick={() => navigate(-1)}>Go Back</GoBack>
      </HeaderBackgroundWrapper>
      <StyledRotateCcw
        color={theme.secondaryForeground}
        size="50"
        strokeWidth="2px"
        onClick={() => {
          window.location.reload(true)
        }}
      />
    </PageNotFoundWrapper>
  )
}

const StyledRotateCcw = styled(RotateCcw)`
  cursor: pointer;
  transition: transform 750ms ease;
  &:hover {
    transform: rotate(-360deg);
  }
`

const PageNotFoundWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  margin: 0 auto;

  text-align: center;
`

const HeaderBackgroundWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.075);
  border-radius: 30px;

  padding-bottom: 20px;

  margin: 20px;
`

const ImgWrapper = styled.div`
  overflow: hidden;
  /* position: absolute;
  top: 20%; */
  z-index: -1;

  /* height: 70vh; */
  img {
    filter: blur(4px);
    /* Make image get bigger and always fill bottom of screen */
  }

  position: fixed;
  top: -25%;
  left: -50%;
  width: 200%;
  height: 200%;
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 50%;
  min-height: 50%;
`

const Header404 = styled.h2`
  padding: 0;
  margin: 20px 0 0 0;
  color: ${(props) => props.theme.secondaryForeground};

  font-family: 'Marck Script', cursive;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  font-size: 6em;
`

const Desc = styled.h1`
  margin: 10px;
  padding: 0.75em;
  color: ${(props) => props.theme.foreground};

  font-family: 'Marck Script', cursive;
`

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
`

export default PageNotFound
