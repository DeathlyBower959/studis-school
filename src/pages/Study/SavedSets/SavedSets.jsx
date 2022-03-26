import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Account from '../../../contexts/AccountContext'
import { truncateString } from '../../../utils/strings'
import Form from '../../../components/Forms/Form'

const SavedSets = () => {
  const { userData } = useContext(Account)

  return (
    <>
      <Header>Saved Sets</Header>
      <BlockContainer>
        {userData.savedSets?.length > 0 &&
          userData.savedSets.map((set) => {
            return (
              <SetContainer
                id={set._id}
                key={uuidv4()}
                as={Link}
                to={`/study/saved/view/${set._id}`}>
                <RecentStudyTitle>{set.title}</RecentStudyTitle>
                <RecentStudyDescription>
                  {truncateString(set.description, 90, false)}
                </RecentStudyDescription>
              </SetContainer>
            )
          })}

        {userData.savedSets?.length <= 0 && (
          <MissingContainer>
            <Desc>Looks pretty barren here... Try remixing a study set!</Desc>
            <Link to="/community">
              <Form.Button secondary>Explore</Form.Button>
            </Link>
          </MissingContainer>
        )}
      </BlockContainer>
    </>
  )
}

const BlockContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 3em;
  flex-wrap: wrap;

  justify-content: center;
`

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;

  width: 100%;
  text-align: center;
`

const MissingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SetContainer = styled.div`
  text-decoration: none;
  background-color: ${(props) => props.theme.secondaryBackground};
  flex: 1 1 25%;
  min-width: 17em;
  max-width: 25%;

  padding: 1em;
  border-radius: 15px;

  height: 8em;

  display: flex;
  flex-direction: column;

  position: relative;

  cursor: pointer;
  transition: transform 400ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`

const RecentStudyTitle = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryForeground};
`

const RecentStudyDescription = styled.p`
  margin: 0;
  text-indent: 1em;
  color: ${(props) => props.theme.tertiaryForeground};
`

const Desc = styled.p`
  color: ${(props) => props.theme.secondaryMuted};
`

export default SavedSets
