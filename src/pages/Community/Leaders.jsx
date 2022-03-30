import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ToastNotif from '../../contexts/ToastNotifContext'
import { getLeaderboard } from '../../api/community'
import { ArrowDown } from 'react-feather'

import { truncateString } from '../../utils/strings'

import avatarPlaceholder from '../../assets/avatar_placeholder.png'
import Account from '../../contexts/AccountContext'
import { Link } from 'react-router-dom'
import Spinner from '../../atoms/Loaders/Spinner'
import useProfilePicture from '../../hooks/useProfilePicture'
import { truncateNumber } from '../../utils/numbers'

function Leaders() {
  const SendToast = useContext(ToastNotif)
  const { userData } = useContext(Account)
  const [currentLeaderboard, setCurrentLeaderboard] = useState()

  const { imgErrors, imgLoadings, images } = useProfilePicture()

  const currentUserWrapperRef = useRef()

  const [isCurrentUserVisible, setIsCurrentUserVisible] = useState({
    isVisible: true,
    top: 0
  })

  const GetLeaders = () => {
    const GetLeadersPromise = new Promise(async (resolve, reject) => {
      const leadersResult = await getLeaderboard()

      if (leadersResult.data.length <= 0) return reject('No leaders found!')

      resolve()
      setCurrentLeaderboard(leadersResult.data)
    })

    SendToast(
      {
        promise: GetLeadersPromise,
        pending: 'Retrieving leaders...',
        error: 'Failed to retrieve leaders!',
        success: 'Successfully retrieved leaders!'
      },
      'promise'
    )
  }

  useEffect(() => {
    GetLeaders()
  }, [])

  useEffect(() => {
    if (currentUserWrapperRef.current !== undefined) {
      const observer = new IntersectionObserver(
        (entries) => {
          setIsCurrentUserVisible({
            isVisible: entries[0].isIntersecting || false,
            top: entries[0].boundingClientRect.top
          })
        },
        {
          threshold: [1]
        }
      )

      observer.observe(currentUserWrapperRef.current)

      const currentObserved = currentUserWrapperRef.current

      return () => observer.unobserve(currentObserved)
    }
  }, [currentUserWrapperRef.current])

  return (
    <>
      <Header>Leaderboard</Header>
      <LeaderboardWrapper>
        {currentLeaderboard ? (
          <>
            {currentLeaderboard.length > 0 && (
              <>
                {currentLeaderboard.map((user) => {
                  return (
                    <>
                      <UserWrapper
                        as={Link}
                        to={`/community/user/${user.userId}`}
                        key={user.userId}
                        ref={
                          user.userId === userData?._id
                            ? currentUserWrapperRef
                            : null
                        }>
                        <LeftWrapper>
                          <ProfilePictureWrapper>
                            <ProfilePictureChooserImg
                              $offset={
                                images.find(
                                  (image) =>
                                    image.picture.name === user.profilePicture
                                )?.picture?.offset
                              }
                              $scale={
                                images.find(
                                  (image) =>
                                    image.picture.name === user.profilePicture
                                )?.picture?.scale
                              }
                              width="125%"
                              src={
                                images.find(
                                  (image) =>
                                    image.picture.name === user.profilePicture
                                )?.src || avatarPlaceholder
                              }
                            />
                          </ProfilePictureWrapper>
                          <Username
                            $isCurrentUser={user.userId === userData?._id}>
                            {truncateString(user.name, 18)}
                          </Username>
                        </LeftWrapper>
                        <RightWrapper>
                          <UserEXP>EXP: {truncateNumber(user.exp, 2)}</UserEXP>
                          <UserPrestige>
                            Prestige: {user.prestiges}
                          </UserPrestige>
                        </RightWrapper>
                      </UserWrapper>
                    </>
                  )
                })}
              </>
            )}
            {!isCurrentUserVisible.isVisible && (
              <FloatingButtonWrapper
                $isBelow={isCurrentUserVisible.top >= 0}
                onClick={() => {
                  if (currentUserWrapperRef.current !== undefined)
                    currentUserWrapperRef.current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'center'
                    })
                }}>
                <FloatingButton
                  $isBelow={isCurrentUserVisible.top >= 0}
                  size="2.5em"
                />
              </FloatingButtonWrapper>
            )}
          </>
        ) : (
          <SpinnerWrapper>
            <Spinner height="50px" />
          </SpinnerWrapper>
        )}
      </LeaderboardWrapper>
    </>
  )
}

const ProfilePictureWrapper = styled.div`
  width: 4em;
  height: 4em;
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  cursor: pointer;
`

const ProfilePictureChooserImg = styled.img`
  position: absolute;
  top: ${(props) => props.$offset?.y || 0}%;
  left: ${(props) => props.$offset?.x || 0}%;
  
  transform: scale(${(props) => props.$scale || 1});
`

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FloatingButton = styled(ArrowDown)`
  background-color: ${(props) => props.theme.tertiaryBackground}88;
  stroke: ${(props) => props.theme.muted};
  padding: 0.5em;
  border-radius: 50%;

  transition: box-shadow 400ms ease-in-out;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.15);

  ${(props) => !props.$isBelow && 'transform: rotateZ(180deg)'};
`

const FloatingButtonWrapper = styled.div`
  position: fixed;
  cursor: pointer;
  transition: transform 400ms ease-in-out;

  &:hover {
    transform: translateY(${(props) => (props.$isBelow ? '0.5em' : '-0.5em')});
  }

  &:hover ${FloatingButton} {
    box-shadow: 0px 0px 13px 5px rgba(0, 0, 0, 0.15);
  }

  ${(props) => (props.$isBelow ? 'bottom: 0.5em' : 'top: 4.5em')};
  padding: 0.5em;
`

const LeaderboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0 3em;
  gap: 0.5em;
`

const UserWrapper = styled.div`
  max-width: 750px;
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

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;

  width: 100%;
  text-align: center;
`

export default Leaders
