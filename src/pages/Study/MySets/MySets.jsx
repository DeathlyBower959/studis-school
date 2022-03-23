import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Account from '../../../contexts/AccountContext'
import { truncateString } from '../../../utils/strings'
import Form from '../../../components/Forms/Form'

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
                  {truncateString(set.description, 180, true)}
                </RecentStudyDescription>

                {set.isPublic && (
                  <VoteContainer>
                    <DownvoteCount>{set.downvotes}</DownvoteCount>
                    <Downvote
                      width="18"
                      height="19"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.29167 3.94878L7.29167 2C7.29167 1.44772 6.84395 1 6.29167 1L3.70833 0.999999C3.15605 0.999999 2.70833 1.44771 2.70833 2L2.70833 3.94878C2.70833 4.43189 2.31669 4.82353 1.83358 4.82353C1.09774 4.82353 0.690699 5.67674 1.15369 6.24867L4.22276 10.0399C4.62299 10.5343 5.37701 10.5343 5.77724 10.0399L8.84631 6.24867C9.3093 5.67675 8.90226 4.82353 8.16642 4.82353C7.68331 4.82353 7.29167 4.43189 7.29167 3.94878Z"
                        fill={theme.muted}
                        stroke={theme.secondaryMuted}
                        strokeLinecap="round"
                      />
                    </Downvote>
                    <Upvote
                      width="18"
                      height="19"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.29167 3.94878L7.29167 2C7.29167 1.44772 6.84395 1 6.29167 1L3.70833 0.999999C3.15605 0.999999 2.70833 1.44771 2.70833 2L2.70833 3.94878C2.70833 4.43189 2.31669 4.82353 1.83358 4.82353C1.09774 4.82353 0.690699 5.67674 1.15369 6.24867L4.22276 10.0399C4.62299 10.5343 5.37701 10.5343 5.77724 10.0399L8.84631 6.24867C9.3093 5.67675 8.90226 4.82353 8.16642 4.82353C7.68331 4.82353 7.29167 4.43189 7.29167 3.94878Z"
                        fill={theme.muted}
                        stroke={theme.secondaryMuted}
                        strokeLinecap="round"
                      />
                    </Upvote>
                    <UpvoteCount>{set.upvotes}</UpvoteCount>
                  </VoteContainer>
                )}
              </SetContainer>
            )
          })}

        {userData.userSets?.length <= 0 && (
          <MissingContainer>
            <Desc
              style={{
                color: theme.secondaryMuted,
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
  /* max-width: 25%; */

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
`

const UpvoteCount = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryMuted};
`

const Upvote = styled.svg`
  transform: rotateX(180deg);
`

const DownvoteCount = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryMuted};
`

const Downvote = styled.svg``

const Desc = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
`

export default MySets
