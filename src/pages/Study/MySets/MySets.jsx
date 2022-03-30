import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Account from '../../../contexts/AccountContext'
import { truncateString } from '../../../utils/strings'
import Form from '../../../components/Forms/Form'
import VoteArrow from '../../../assets/svg/VoteArrow'

const MySets = () => {
  const { userData } = useContext(Account)
  const theme = useContext(ThemeContext)

  return (
    <>
      <Header>My Sets</Header>
      <BlockContainer>
        {userData.userSets?.length > 0 &&
          userData.userSets.map((set) => {
            return (
              <SetContainer
                id={set._id}
                key={uuidv4()}
                as={Link}
                to={`/study/sets/view/${set._id}`}>
                <RecentStudyTitle>{set.title}</RecentStudyTitle>
                <RecentStudyDescription>
                  {truncateString(set.description, 75, false)}
                </RecentStudyDescription>

                {set.isPublic && (
                  <VoteContainer>
                    <DownvoteCount>{set.downvotes?.length}</DownvoteCount>
                    <Downvote />
                    <Upvote />
                    <UpvoteCount>{set.upvotes?.length}</UpvoteCount>
                  </VoteContainer>
                )}
              </SetContainer>
            )
          })}

        {userData.userSets?.length <= 0 && (
          <MissingContainer>
            <Desc
              style={{
                color: theme.secondaryMuted
              }}>
              Looks pretty barren here... Try creating a study set!
            </Desc>
            <Link to="/study/new">
              <Form.Button secondary>Create</Form.Button>
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

const VoteContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;

  padding: 0.5em 0.75em;

  flex-wrap: nowrap;
  align-items: center;
  gap: 0.3em;

  background-color: ${(props) => props.theme.secondaryBackground};
`

const UpvoteCount = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryMuted};
`

const Upvote = styled(VoteArrow)`
  transform: rotateX(180deg);
`

const DownvoteCount = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryMuted};
`

const Downvote = styled(VoteArrow)``

const Desc = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
`

export default MySets
