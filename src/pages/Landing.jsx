import styled, { ThemeContext } from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../atoms/Loaders/Spinner'
import UserTitle from '../components/UserTitle'

// Recharts
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// Components
import {
  CardContainer,
  Card,
  CardFront,
  CardBack,
  EndCard
} from '../components/Cards/HomeCard'
import Form from '../components/Forms/Form'

// API
import { getCompetitors, getLeaderboard } from '../api/community'

// Contexts
import Account from '../contexts/AccountContext'

// Utils
import { addNumberSuffix, truncateString } from '../utils/strings'

// Images
import avatarPlaceholder from '../assets/avatar_placeholder.png'

import { updateUser } from '../api/user'
import useProfilePicture from '../hooks/useProfilePicture'
import { truncateNumber } from '../utils/numbers'
import LeftCompetitorArrow from '../assets/svg/LeftCompetitorArrow'
import RightCompetitorArrow from '../assets/svg/RightCompetitorArrow'
import VoteArrow from '../assets/svg/VoteArrow'

// FAKE DATA
const data = [
  {
    day: 'Sun',
    time: 4,
    points: 88
  },
  {
    day: 'Mon',
    time: 20,
    points: 344
  },
  {
    day: 'Tue',
    time: 5,
    points: 102
  },
  {
    day: 'Wed',
    time: 15,
    points: 288
  },
  {
    day: 'Thu',
    time: 10,
    points: 153
  },
  {
    day: 'Fri',
    time: 5,
    points: 60
  },
  {
    day: 'Sat',
    time: 0,
    points: 0
  }
]

const Landing = () => {
  const navigate = useNavigate()
  const { userData, isLoggedIn, localAuth, setUserData } = useContext(Account)
  const theme = useContext(ThemeContext)

  const [currentCompetitors, setCurrentCompetitors] = useState([])
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])

  const { imgLoadings, imgErrors, images } = useProfilePicture()

  useEffect(() => {
    if (isLoggedIn() === 0 || isLoggedIn() === 2)
      return setCurrentCompetitors(null)

    refreshCompetitors()
    refreshLeaderboard()
  }, [userData])

  if (isLoggedIn() === 2)
    return (
      <div
        style={{
          width: '100%',
          height: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Spinner height="50px" />
      </div>
    )

  if (isLoggedIn() === 0)
    return (
      <PageWrapper>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* Ik its kinda weird, but you have to put the cards in reverse order */}
        <CardContainer
          minw="300px"
          maxw="400px"
          minh="200px"
          maxh="250px"
          prefferedw="50vw"
          prefferedh="30vw">
          <Card>
            <EndCard>
              <Desc>Get started with your new favorite way to study!</Desc>
              <Form.Button
                onClick={() => navigate('/signup')}
                style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                Get Started
              </Form.Button>
            </EndCard>
          </Card>
          <Card>
            <CardFront>
              <Header style={{ fontSize: '2em' }}>Your Last Study Tool</Header>
            </CardFront>
            <CardBack>
              <Desc>
                You wont have to use those crumpled index cards that you lost in
                your bag, or the ones that you forgot it home!
              </Desc>
            </CardBack>
          </Card>
          <Card>
            <CardFront>
              <Header>Studis</Header>
            </CardFront>
            <CardBack>
              <Desc>
                Practice subjects like biology, calculus, history and more!
              </Desc>
            </CardBack>
          </Card>
        </CardContainer>
      </PageWrapper>
    )

  const refreshCompetitors = async () => {
    if (userData?.competitors?.length === 0) return setCurrentCompetitors([])
    const competitors = await getCompetitors(userData?.competitors)
    if (competitors?.data) setCurrentCompetitors(competitors.data)
  }

  const refreshLeaderboard = async () => {
    const leaderboard = await getLeaderboard()
    if (leaderboard?.data)
      setCurrentLeaderboard({
        place:
          leaderboard.data.findIndex((user) => user.userId === userData._id) +
          1,
        data: leaderboard.data.find((user) => user.userId === userData._id)
      })
  }

  const PrestigeUser = async () => {
    const updateResult = await updateUser(localAuth, { prestige: true })
    if (updateResult.status === 200) setUserData(updateResult.data.newUser)
  }

  // Means the user has an account
  return (
    <PageWrapper>
      <BlockHeader>Stats</BlockHeader>
      <BlockContainer>
        <StatContainer>
          <StatDataContainer>
            {currentLeaderboard?.length === 0 ? (
              <Spinner height="50px" />
            ) : (
              <>
                <StatData>
                  Place: {addNumberSuffix(currentLeaderboard?.place)}
                </StatData>
                <StatData>
                  Exp: {truncateNumber(currentLeaderboard?.data?.exp, 2)}
                </StatData>
                <StatData>
                  Prestige: {currentLeaderboard?.data?.prestiges}
                </StatData>
                <StatData>
                  Title:
                  <UserTitle
                    exp={currentLeaderboard?.data?.exp}
                    style={{ marginTop: '-0.25em ' }}
                  />
                </StatData>
              </>
            )}
          </StatDataContainer>
          <ProfilePictureWrapper>
            <StatImage
              $offset={
                images.find(
                  (image) => image.picture.name === userData.profilePicture
                )?.picture?.offset || { x: -12, y: -12 }
              }
              $scale={
                images.find(
                  (image) => image.picture.name === userData.profilePicture
                )?.picture?.scale || 0.85
              }
              width="125%"
              src={
                images.find(
                  (image) => image.picture.name === userData.profilePicture
                )?.src || avatarPlaceholder
              }
            />
          </ProfilePictureWrapper>
        </StatContainer>
        <ChartContainer>
          <ResponsiveContainer width="100%">
            <LineChart
              style={{
                fontSize: '15px',
                marginLeft: '-2em'
              }}
              data={data}>
              <Line type="monotone" dataKey="time" stroke={theme.accent} />
              <XAxis
                dataKey="day"
                tick={{ fill: theme.secondaryMuted }}
                stroke={theme.secondaryMuted}
              />
              <YAxis
                dataKey="time"
                tick={{ fill: theme.secondaryMuted }}
                stroke={theme.secondaryMuted}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <CompetitorContainer>
          <ArrowLeft />
          <CompetitorInnerContainer id="competitor-inner">
            {currentCompetitors?.length > 0 &&
              currentCompetitors.map((comp) => {
                return (
                  <CompetitorContentContainer
                    as={Link}
                    style={{ textDecoration: 'none' }}
                    to={`/community/user/${comp.userId}`}
                    id={comp.userId}
                    key={uuidv4()}>
                    <CompetitorName>{comp.name}</CompetitorName>
                    <CompetitorData>
                      Exp: {truncateNumber(comp.exp)}
                    </CompetitorData>
                    <CompetitorData>Prestige: {comp.prestiges}</CompetitorData>
                    <CompetitorData>
                      Leaderboard: {addNumberSuffix(comp.leaderboard)}
                    </CompetitorData>
                  </CompetitorContentContainer>
                )
              })}

            {currentCompetitors?.length <= 0 && (
              <Desc style={{ color: theme.secondaryMuted }}>
                Looks quite empty here... Try adding some competition
              </Desc>
            )}

            {currentCompetitors === null && <Spinner height="3em" />}
          </CompetitorInnerContainer>
          <ArrowRight />
        </CompetitorContainer>
      </BlockContainer>

      {userData.exp >= 1000000 && (
        <PrestigeButton onClick={PrestigeUser}>Prestige Now</PrestigeButton>
      )}

      <BlockHeader>Recent</BlockHeader>
      <BlockContainer>
        {userData.userSets?.length > 0 &&
          userData.userSets.map((set) => {
            return (
              <RecentStudyContainer
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
                    <DownvoteCount>{set.downvotes?.length}</DownvoteCount>
                    <Downvote />
                    <Upvote />
                    <UpvoteCount>{set.upvotes?.length}</UpvoteCount>
                  </VoteContainer>
                )}
              </RecentStudyContainer>
            )
          })}

        {userData.userSets?.length <= 0 && (
          <>
            <Desc
              style={{
                color: theme.secondaryMuted,
                width: '100%',
                textAlign: 'center',
                marginBottom: '0'
              }}>
              It's pretty barren here... Try creating a study set!
            </Desc>
            <Link to="/study/new">
              <CreateStudyButton secondary>Create</CreateStudyButton>
            </Link>
          </>
        )}
      </BlockContainer>
    </PageWrapper>
  )
}

const CreateStudyButton = styled(Form.Button)``

const PrestigeButton = styled(Form.Button)`
  margin-top: 1em;

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.15);
    }
  }

  animation: bounce 1s infinite alternate;
`

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// No Account
const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 4em;
`

const Desc = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
`

// Has Account
const BlockContainer = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 3em;
  flex-wrap: wrap;

  justify-content: center;
`

const BlockHeader = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 3em;
  margin-bottom: 0.5em;
`

// Stats
const StatContainer = styled.div`
  background-color: ${(props) => props.theme.secondaryBackground};
  flex-grow: 1;
  min-width: max-content;

  padding: 1em;
  border-radius: 15px;

  height: 12em;

  width: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatDataContainer = styled.div``

const StatData = styled.div`
  margin: 0.9em;
  color: ${(props) => props.theme.secondaryForeground};
  display: flex;
  gap: 0.5em;
`

const ProfilePictureWrapper = styled.div`
  width: 7em;
  height: 7em;
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  box-shadow: 5px 5px 13px 0px rgba(0, 0, 0, 0.25);
`

const StatImage = styled.img`
  position: absolute;
  top: ${(props) => props.$offset?.y || 0}%;
  left: ${(props) => props.$offset?.x || 0}%;

  transform: scale(${(props) => props.$scale || 1});
`

// Charts
const ChartContainer = styled.div`
  background-color: ${(props) => props.theme.secondaryBackground};
  flex-grow: 1;
  min-width: 17em;

  width: 17em;

  padding: 1em;
  border-radius: 15px;

  height: 12em;
`

// Competitors
const ArrowLeft = styled(LeftCompetitorArrow)`
  left: 1em;
`

const ArrowRight = styled(RightCompetitorArrow)`
  transform: rotateY(180deg);

  right: 1em;
`

const CompetitorContainer = styled.div`
  background-color: ${(props) => props.theme.secondaryBackground};
  flex-grow: 1;
  min-width: 17em;
  /* max-width: 40em; */

  padding: 1em;
  border-radius: 15px;

  height: 12em;

  width: 20%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
`

const CompetitorInnerContainer = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;

  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  gap: 1em;
`

const CompetitorContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-width: 13em;
  border-radius: 15px;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 1em;
`

const CompetitorName = styled.p`
  font-size: 1.5em;
  margin: 0;
  color: ${(props) => props.theme.secondaryForeground};
`

const CompetitorData = styled.p`
  margin: 0.2em 0;
  color: ${(props) => props.theme.tertiaryForeground};
`

// Recents
const RecentStudyContainer = styled.div`
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

const Upvote = styled(VoteArrow)`
  transform: rotateX(180deg);
`

const DownvoteCount = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryMuted};
`

const Downvote = styled(VoteArrow)``

export default Landing
