import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { getCommunity, getLeaderboard } from '../../api/community'
import Account from '../../contexts/AccountContext'
import ToastNotif from '../../contexts/ToastNotifContext'
import avatarPlaceholder from '../../assets/avatar_placeholder.png'
import { truncateString } from '../../utils/strings'

import { v4 as uuidv4 } from 'uuid'

import Spinner from '../../atoms/Loaders/Spinner'
import Form from '../../components/Forms/Form'

function Community() {
  const { userData } = useContext(Account)
  const SendToast = useContext(ToastNotif)
  const theme = useContext(ThemeContext)

  const [currentLeaderboard, setCurrentLeaderboard] = useState()
  const [currentCommunity, setCurrentCommunity] = useState()

  const GetLeaders = async () => {
    const leadersResult = await getLeaderboard()

    if (leadersResult.data.length <= 0) return

    setCurrentLeaderboard(leadersResult.data)
  }

  const GetCommunity = () => {
    const GetCommunityPromise = new Promise(async (resolve, reject) => {
      const communityResult = await getCommunity(userData._id)

      resolve()
      setCurrentCommunity(communityResult.data)
    })

    SendToast(
      {
        promise: GetCommunityPromise,
        pending: 'Retrieving community data...',
        error: 'Failed to retrieve community data!',
        success: 'Successfully retrieved community data!'
      },
      'promise'
    )
  }

  useEffect(() => {
    GetCommunity()
    GetLeaders()
  }, [])

  return (
    <PageWrapper>
      <Header>Community</Header>
      <BlockHeader>Top Leaders</BlockHeader>
      <LeaderWrapper>
        {currentLeaderboard ? (
          <>
            {currentLeaderboard.length > 0 &&
              currentLeaderboard.slice(0, 3).map((user) => {
                return (
                  <UserWrapper
                    as={Link}
                    to="/community/leaderboard"
                    style={{ textDecoration: 'none' }}
                    key={user.userId}>
                    <LeftWrapper>
                      <UserProfileLogo src={avatarPlaceholder} />
                      <Username $isCurrentUser={user.userId === userData?._id}>
                        {truncateString(user.name, 18)}
                      </Username>
                    </LeftWrapper>
                    <RightWrapper>
                      <UserEXP>EXP: {user.exp}</UserEXP>
                      <UserPrestige>Prestige: {user.prestiges}</UserPrestige>
                    </RightWrapper>
                  </UserWrapper>
                )
              })}
          </>
        ) : (
          <SpinnerWrapper>
            <Spinner height="50px" />
          </SpinnerWrapper>
        )}
      </LeaderWrapper>
      <BlockHeader>Study Sets</BlockHeader>
      <BlockContainer>
        {currentCommunity ? (
          <>
            {currentCommunity.userSets?.length > 0 &&
              currentCommunity.userSets.map((set) => {
                return (
                  <SetContainer
                    id={set._id}
                    key={uuidv4()}
                    as={Link}
                    to={`/community/${set.userId}/sets/${set._id}`}>
                    <RecentStudyTitle>{set.title}</RecentStudyTitle>
                    <RecentStudyDescription>
                      {truncateString(set.description, 75, false)}
                    </RecentStudyDescription>

                    {set.isPublic && (
                      <VoteContainer>
                        <DownvoteCount>{set.downvotes?.length}</DownvoteCount>
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
                        <UpvoteCount>{set.upvotes?.length}</UpvoteCount>
                      </VoteContainer>
                    )}
                  </SetContainer>
                )
              })}
          </>
        ) : (
          <SpinnerWrapper>
            <Spinner height="50px" />
          </SpinnerWrapper>
        )}
      </BlockContainer>
    </PageWrapper>
  )
}

const WordContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 3em;
  flex-wrap: wrap;

  margin-top: 1em;

  justify-content: center;
`

const BlockContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 3em;
  flex-wrap: wrap;

  justify-content: center;
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

const SearchBar = styled(Form.Text)``

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0;
`

const UserWrapper = styled.div`
  max-width: 600px;
  text-decoration: none;
  display: flex;

  justify-content: space-between;
  background-color: ${(props) => props.theme.secondaryBackground};
  width: 100%;
  border-radius: 15px;
  align-items: center;
  padding: 1em;

  transition: transform 300ms ease-in-out;
  &:hover {
    transform: scale(1.02);
  }

  @media only screen and (max-width: 475px) {
    flex-direction: column;
  }
`

const Username = styled.p`
  color: ${(props) =>
    props.$isCurrentUser
      ? props.theme.accent
      : props.theme.secondaryForeground};
`

const UserEXP = styled.p`
  color: ${(props) => props.theme.secondaryMuted};
`

const UserPrestige = styled.p`
  color: ${(props) => props.theme.secondaryMuted};
`

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`

const UserProfileLogo = styled.img`
  width: 3.5em;
  height: 3.5em;

  border-radius: 50%;
`

const Desc = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
`

const BlockHeader = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 2em;
  margin-bottom: 0.5em;
`

// Leaders
const LeaderWrapper = styled.div`
  /* min-width: 17em;
  max-width: 40em; */

  padding: 1em;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 0.5em;
`

export default Community
