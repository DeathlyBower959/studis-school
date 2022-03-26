import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Form from '../../components/Forms/Form'
import { MOBILE } from '../../constants/sizes'

function Study() {
  return (
    <>
      <Header>Study</Header>
      <Container>
        <SectionWrapper>
          <Link to="/study/sets">
            <SectionButton secondary>My Sets</SectionButton>
          </Link>
          <SectionDesc>Want to study sets that you have created?</SectionDesc>
        </SectionWrapper>
        <Divider />
        <SectionWrapper>
          <Link to="/study/saved">
            <SectionButton secondary>Saved Sets</SectionButton>
          </Link>
          <SectionDesc>Need to find your remixed sets?</SectionDesc>
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

  @media only screen and (max-width: ${MOBILE.studyDivider}) {
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

  @media only screen and (max-width: ${MOBILE.studyDivider}) {
    width: 80vw;
    height: 2px;

    margin-top: 1em;
    margin-bottom: 2em;
  }
`

export default Study
