import styled, { ThemeContext } from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../atoms/Loaders/Spinner'

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
import placeholderAvatar from '../assets/avatar_placeholder.png'

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
  const { userData, isLoggedIn } = useContext(Account)
  const theme = useContext(ThemeContext)

  const [currentCompetitors, setCurrentCompetitors] = useState([])
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])

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
    if (leaderboard?.data) setCurrentLeaderboard({
      place: leaderboard.data.findIndex(user => user.userId === userData._id) + 1,
      data: leaderboard.data.find(user => user.userId === userData._id)
    })
  }

  // Means the user has an account
  return (
    <PageWrapper>
      <BlockHeader>Stats</BlockHeader>
      <BlockContainer>
        <StatContainer>
          <StatDataContainer>
            <StatData>Place: {currentLeaderboard.place}</StatData>
            <StatData>Exp: {currentLeaderboard.data.exp}</StatData>
            <StatData>Prestige: {currentLeaderboard.data.prestiges}</StatData>
            <StatData>Study Streak: PLACEHOLDER</StatData>
          </StatDataContainer>
          <StatImage src={placeholderAvatar} />
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
          <ArrowLeft
            onClick={() => {
              const container = document.getElementById('competitor-inner')
              const children = container?.children

              if (!children) return

              for (var i = 0; i < children.length; i++) {
                let prevChild = children[i - 1]
                let child = children[i]

                let prevVisible = false
                let currentVisible = false

                if (!prevChild) continue

                const prevObserver = new IntersectionObserver(
                  function (prevEntries) {
                    prevVisible = prevEntries[0].isIntersecting

                    const currentObserver = new IntersectionObserver(
                      function (currentEntries) {
                        currentVisible = currentEntries[0].isIntersecting

                        currentObserver.unobserve(currentEntries[0].target)
                        if (!prevVisible && currentVisible) {
                          prevChild.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'nearest'
                          })

                          return
                        }
                      },
                      { threshold: [0.8] }
                    )

                    currentObserver.observe(child)
                    prevObserver.unobserve(prevEntries[0].target)
                  },
                  { threshold: [0.8] }
                )

                if (prevChild) prevObserver.observe(prevChild)
              }
            }}
            width="21"
            height="46"
            viewBox="0 0 21 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 4.57898L6 22.6316L16 40.6842"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </ArrowLeft>
          <CompetitorInnerContainer id="competitor-inner">
            {currentCompetitors?.length > 0 &&
              currentCompetitors.map((comp) => {
                return (
                  <CompetitorContentContainer id={comp.userId} key={uuidv4()}>
                    <CompetitorName>{comp.name}</CompetitorName>
                    <CompetitorData>Exp: {comp.exp}</CompetitorData>
                    <CompetitorData>Prestige: {comp.prestiges}</CompetitorData>
                    <CompetitorData>
                      Leaderboard: {addNumberSuffix(comp.leaderboard)}
                    </CompetitorData>
                  </CompetitorContentContainer>
                )
              })}

            {currentCompetitors?.length <= 0 && (
              <Desc style={{ color: theme.secondaryMuted }}>
                Looks pretty barren here... Try adding some competition
              </Desc>
            )}

            {currentCompetitors === null && <Spinner height="3em" />}
          </CompetitorInnerContainer>
          <ArrowRight
            onClick={() => {
              const container = document.getElementById('competitor-inner')
              const children = container?.children

              if (!children) return

              for (var i = 0; i < children.length; i++) {
                let child = children[i]
                let nextChild = children[i + 1]

                let currentVisible = false
                let nextVisible = false

                if (!nextChild) continue

                const nextObserver = new IntersectionObserver(
                  function (nextEntries) {
                    nextVisible = nextEntries[0].isIntersecting

                    const currentObserver = new IntersectionObserver(
                      function (currentEntries) {
                        currentVisible = currentEntries[0].isIntersecting

                        if (!nextVisible && currentVisible) {
                          nextChild.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'nearest'
                          })
                        }

                        currentObserver.unobserve(currentEntries[0].target)
                      },
                      { threshold: [0.8] }
                    )

                    currentObserver.observe(child)
                    nextObserver.unobserve(nextEntries[0].target)
                  },
                  { threshold: [0.8] }
                )

                if (nextChild) nextObserver.observe(nextChild)
              }
            }}
            width="21"
            height="46"
            viewBox="0 0 21 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 4.57898L6 22.6316L16 40.6842"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </ArrowRight>
        </CompetitorContainer>
      </BlockContainer>
      <BlockHeader>Recents</BlockHeader>
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
              </RecentStudyContainer>
            )
          })}

        {userData.userSets?.length <= 0 && (
          <Desc
            style={{
              color: theme.secondaryMuted,
              width: '100%',
              textAlign: 'center'
            }}>
            Looks pretty barren here... Try creating a study set!
          </Desc>
        )}
      </BlockContainer>
    </PageWrapper>
  )
}

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
  min-width: 17em;

  padding: 1em;
  border-radius: 15px;

  height: 12em;

  width: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatDataContainer = styled.div``

const StatData = styled.p`
  margin: 0.9em;
  color: ${(props) => props.theme.secondaryForeground};
`

const StatImage = styled.img`
  height: 7em;
  width: 7em;
  border-radius: 50%;
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
const Arrow = styled.svg`
  height: 100%;
  width: 1em;

  path {
    stroke: ${(props) => props.theme.inputBackground};
  }

  transition: filter 300ms ease-out;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`
const ArrowLeft = styled(Arrow)`
  left: 1em;
`

const ArrowRight = styled(Arrow)`
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

const Upvote = styled.svg`
  transform: rotateX(180deg);
`

const DownvoteCount = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryMuted};
`

const Downvote = styled.svg``
export default Landing
