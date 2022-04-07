import { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { getUser } from '../../api/community'
import Spinner from '../../atoms/Loaders/Spinner'
import useProfilePicture from '../../hooks/useProfilePicture'

import TimeAgo from 'timeago-react'

import avatarPlaceholder from '../../assets/avatar_placeholder.png'
import Form from '../../components/Forms/Form'
import { truncateString, addNumberSuffix } from '../../utils/strings'

import { v4 as uuidv4 } from 'uuid'
import { calculateTitle } from '../../utils/ranking'
import { calculateDate } from '../../utils/time'
import { sanitize } from '../../utils/sanitize'
import UserTitle from '../../components/UserTitle'
import { truncateNumber } from '../../utils/numbers'
import Account from '../../contexts/AccountContext'
import { addCompetitor, deleteCompetitor } from '../../api/user'
import ToastNotif from '../../contexts/ToastNotifContext'
import VoteArrow from '../../assets/svg/VoteArrow'
import { MOBILE } from '../../constants/sizes'
import ProfilePicture from '../../atoms/ProfilePicture'

function UserProfile() {
  const { userId } = useParams()

  const { localAuth, userData, setUserData } = useContext(Account)
  const SendToast = useContext(ToastNotif)

  const [currentUser, setCurrentUser] = useState()

  const GetUserData = useCallback(async () => {
    const getUserResult = await getUser(userId)
    if (getUserResult.status === 200) return setCurrentUser(getUserResult.data)

    setCurrentUser({})
  }, [userId])

  const AddCompetitor = useCallback(async () => {
    const AddCompetitorPromise = new Promise(async (resolve, reject) => {
      const competitorResult = await addCompetitor(localAuth, userId)

      if (!competitorResult?.data?.newUser) reject(competitorResult.data)

      setUserData(competitorResult.data.newUser)
      resolve(competitorResult.data.newUser)
    })

    SendToast(
      {
        promise: AddCompetitorPromise,
        pending: 'Adding competitor...',
        error: 'Failed to add competitor!',
        success: 'Successfully added competitor!'
      },
      'promise'
    )
  }, [localAuth, userId])

  const RemoveCompetitor = useCallback(async () => {
    const RemoveCompetitorPromise = new Promise(async (resolve, reject) => {
      const competitorResult = await deleteCompetitor(localAuth, userId)

      if (!competitorResult?.data?.newUser) reject(competitorResult.data)

      setUserData(competitorResult.data.newUser)
      resolve(competitorResult.data.newUser)
    })

    SendToast(
      {
        promise: RemoveCompetitorPromise,
        pending: 'Removing competitor...',
        error: 'Failed to remove competitor!',
        success: 'Successfully removed competitor!'
      },
      'promise'
    )
  }, [localAuth, userId])

  useEffect(() => {
    GetUserData()
  }, [userId])

  if (!currentUser)
    return (
      <SpinnerWrapper>
        <Spinner height="50px" />
      </SpinnerWrapper>
    )

  if (!currentUser.name)
    return (
      <>
        <Header>Not Found</Header>
        <Description>
          I tried to find this set, but it doesn't seem to exist in this
          person's account!
        </Description>
      </>
    )

  return (
    <>
      <HeaderWrapper>
        <Header>{currentUser.name}</Header>
        <UserTitle
          exp={currentUser.exp.reduce(
            (prev, current) => prev + current.amount,
            0
          )}
        />
      </HeaderWrapper>
      <UserInformationWrapper>
        <LeftWrapper>
          <UserEXP>Exp: {truncateNumber(currentUser.exp.reduce((prev, current) => prev + current.amount, 0), 2)}</UserEXP>
          <UserLeaderboard>
            Leaderboard: {addNumberSuffix(currentUser.leaderboard)}
          </UserLeaderboard>
          <UserPrestige>Prestige: {currentUser.prestiges}</UserPrestige>
        </LeftWrapper>

        <VerticalDivider />

        <RightWrapper>
          <UserBiography>
            {sanitize(currentUser.biography.trim()).__html ||
              "Hmm, seems like I don't have a unique biography yet! Just know that I am very amazing, creative, and overall awesome person!"}
          </UserBiography>
          <UserProfileWrapper>
            <ProfilePicture profilePicture={currentUser.profilePicture} />
          </UserProfileWrapper>
        </RightWrapper>

        <CreatedAt>
          Joined:{'  '}
          <TimeAgo datetime={new Date(currentUser.createdAt)} />
        </CreatedAt>
      </UserInformationWrapper>
      {currentUser.userId !== userData._id && (
        <>
          {userData.competitors?.includes(currentUser.userId) ? (
            <CompetitorButton secondary onClick={RemoveCompetitor}>
              Remove Competitor
            </CompetitorButton>
          ) : (
            <CompetitorButton secondary onClick={AddCompetitor}>
              Add Competitor
            </CompetitorButton>
          )}
        </>
      )}

      <SetHeader>User Sets</SetHeader>
      <BlockContainer>
        {currentUser.userSets?.length > 0 &&
          currentUser.userSets.map((set) => {
            return (
              <SetContainer
                id={set._id}
                key={uuidv4()}
                as={Link}
                to={
                  userData._id === currentUser.userId
                    ? `/study/sets/view/${set._id}`
                    : `/community/${currentUser.userId}/sets/${set._id}`
                }>
                <RecentStudyTitle>{set.title}</RecentStudyTitle>
                <RecentStudyDescription>
                  {truncateString(set.description, 75, false)}
                </RecentStudyDescription>

                {set.isPublic && (
                  <VoteContainer>
                    <DownvoteCount>{set.downvotes?.length}</DownvoteCount>
                    <Downvote
                      isdownvoted={set.downvotes.includes(userData._id)}
                    />
                    <Upvote isupvoted={set.upvotes.includes(userData._id)} />
                    <UpvoteCount>{set.upvotes?.length}</UpvoteCount>
                  </VoteContainer>
                )}
              </SetContainer>
            )
          })}

        {currentUser.userSets?.length <= 0 && (
          <MissingContainer>
            <Description $muted>
              This user hasn't created any sets yet...
            </Description>
          </MissingContainer>
        )}
      </BlockContainer>
    </>
  )
}

// Header
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 2em 0 1em 0;

  gap: 0.5em;
`

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 2em;
  margin: 0;
`
const SetHeader = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 1.5em;
  margin: 1.5em 0 0.5em 0;
  width: 100%;
  text-align: center;
`

const Description = styled.p`
  color: ${(props) =>
    props.$muted
      ? props.theme.secondaryMuted
      : props.theme.secondaryForeground};
  text-align: center;
  width: 80%;
  margin: 0 auto;
`

// User Sets
const BlockContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 3em;
  flex-wrap: wrap;

  justify-content: center;
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

// User Data

const UserInformationWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  gap: 1em;

  background-color: ${(props) => props.theme.secondaryBackground};
  padding: 1em;
  border-radius: 15px;

  position: relative;

  max-width: 700px;

  @media only screen and (max-width: ${MOBILE.userProfile}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5em;
  }
`

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.5em;

  width: 100%;
  max-width: max-content;
`

const RightWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
  align-items: center;
  justify-content: right;

  @media only screen and (max-width: ${MOBILE.userProfile}) {
    justify-content: center;
  }
`

const UserEXP = styled.p`
  color: ${(props) => props.theme.muted};
`

const UserLeaderboard = styled.p`
  color: ${(props) => props.theme.muted};
`

const UserPrestige = styled.p`
  color: ${(props) => props.theme.muted};
`

const VerticalDivider = styled.div`
  width: 2px;
  background-color: ${(props) => props.theme.tertiaryBackground};

  @media only screen and (max-width: ${MOBILE.userProfile}) {
    height: 2px;
    width: 100%;
  }
`

const CreatedAt = styled.p`
  position: absolute;
  bottom: 1em;
  right: 1em;
  margin: 0;
  font-size: 0.8em;
  color: ${(props) => props.theme.secondaryMuted};

  @media only screen and (max-width: ${MOBILE.userProfile}) {
    position: relative;
    bottom: 0;
    right: 0;
  }
`

const UserBiography = styled.p`
  text-align: right;
  max-width: 25em;

  color: ${(props) => props.theme.secondaryForeground};
`

const UserProfileWrapper = styled.div``

const CompetitorButton = styled(Form.Button)`
  margin-top: 0.5em;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`

export default UserProfile
