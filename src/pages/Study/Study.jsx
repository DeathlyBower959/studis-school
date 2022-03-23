import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Form from '../../components/Forms/Form'

function Study() {
  return (
    <>
      <Header>Study</Header>
      <Container>
        <SectionWrapper>
        <Link to="/study/new">
            <SectionButton secondary>Create</SectionButton>
          </Link>
          <SectionDesc>Want to create a new study set?</SectionDesc>
        </SectionWrapper>
        <Divider />
        <SectionWrapper>
          <Link to="/study/view">
            <SectionButton secondary>Practice</SectionButton>
          </Link>
          <SectionDesc>Need to practice a set for an upcoming test?</SectionDesc>
        </SectionWrapper>
      </Container>
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media only screen and (max-width: 650px) {
    justify-content: center;
    flex-direction: column;
    height: 50%;
  }
`

const SectionWrapper = styled.div`
  width: 100%;

  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SectionButton = styled(Form.Button)`
  font-size: 1.5em;
`

const SectionDesc = styled.p`
  font-size: 1.3em;
  margin: 0.5em;
  color: ${(props) => props.theme.secondaryMuted};

  user-select: none;
`

const Divider = styled.div`
  width: 2px;
  background-color: ${(props) => props.theme.tertiaryBackground};
  height: 70vh;

  @media only screen and (max-width: 650px) {
    width: 80vw;
    height: 2px;

    margin-top: 1em;
    margin-bottom: 2em;
  }
`

export default Study
