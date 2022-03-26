import styled from 'styled-components'

function About() {
  return (
    <>
      <Header>About</Header>
    </>
  )
}

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;

  width: 100%;
  text-align: center;
`

export default About
