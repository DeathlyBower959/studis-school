import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getCommunity, getLeaderboard } from '../../api/community'
import Account from '../../contexts/AccountContext'
import ToastNotif from '../../contexts/ToastNotifContext'
import { truncateString } from '../../utils/strings'

import { v4 as uuidv4 } from 'uuid'

import Spinner from '../../atoms/Loaders/Spinner'
import Form from '../../components/Forms/Form'
import { truncateNumber } from '../../utils/numbers'
import VoteArrow from '../../assets/svg/VoteArrow'
import ProfilePicture from '../../atoms/ProfilePicture'
import UserTitle from '../../components/UserTitle'

function Community() {
  const { userData } = useContext(Account)
  const SendToast = useContext(ToastNotif)

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
      <BlockHeader>Top 3 Leaders</BlockHeader>
      <LeaderWrapper>
        {currentLeaderboard ? (
          <>
            {currentLeaderboard.length > 0 &&
              currentLeaderboard.slice(0, 3).map((user) => {
                return (
                  <UserWrapper
                    key={uuidv4()}
                    as={Link}
                    to={`/community/user/${user.userId}`}>
                    <LeftWrapper>
                      <ProfilePicture profilePicture={user.profilePicture} borderSize='3px'/>
                      <Username $isCurrentUser={user.userId === userData?._id}>
                        {truncateString(user.name, 18)}
                      </Username>
                    </LeftWrapper>
                    <RightWrapper>
                      <UserEXP>EXP: {truncateNumber(user.exp.reduce((prev, current) => prev + current.amount, 0), 2)}</UserEXP>
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
        <SeeMoreLink to="/community/leaderboard">See more...</SeeMoreLink>
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

                    <VoteContainer>
                      <DownvoteCount>{set.downvotes?.length}</DownvoteCount>
                      <Downvote isdownvoted={set.downvotes.includes(userData._id)}/>
                      <Upvote isupvoted={set.upvotes.includes(userData._id)}/>
                      <UpvoteCount>{set.upvotes?.length}</UpvoteCount>
                    </VoteContainer>
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

const WordTitle = styled.p`
  font-size: 1.75em;
  margin: 0.25em;

  width: 15ch;
  overflow-wrap: anywhere;
  word-wrap: break-all;

  text-align: center;

  color: ${(props) => props.theme.secondaryForeground};
`

const WordType = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0.5em;
  font-size: 0.8em;

  color: ${(props) => props.theme.secondaryMuted};
`

const WordDef = styled.p`
  color: ${(props) => props.theme.secondaryForeground};

  margin: 0.25em;

  width: 11ch;
  overflow-wrap: anywhere;
  word-wrap: break-all;

  text-align: center;
`

const WordContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 3em;
  flex-wrap: wrap;

  margin-top: 1em;

  justify-content: center;
`

const SeeMoreLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.muted};
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
