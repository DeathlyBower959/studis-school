import styled from 'styled-components'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

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

// Contexts
import Account from '../contexts/AccountContext'

// Utils
import { addNumberSuffix } from '../utils/addSuffix'
import { checkInView } from '../utils/htmlDOM'

// Images
import placeholderAvatar from '../assets/avatar_placeholder.png'
// import ArrowSVG from '../assets/arrow.svg'

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

const COMPETITORS = [
  {
    name: 'Mark Masha',
    exp: 2000,
    prestiege: 2,
    leaderboard: 71
  },
  {
    name: 'John Doe',
    exp: 200,
    prestiege: 1,
    leaderboard: 102
  },
  {
    name: 'Shylie Baskin',
    exp: 4000,
    prestiege: 3,
    leaderboard: 2
  }
]

const Landing = () => {
  const navigate = useNavigate()
  const { userData } = useContext(Account)
  const [competitorIndex, setCompetitorIndex] = useState(0)

  if (!userData)
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

  // Means the user has an account
  return (
    <PageWrapper>
      <BlockHeader>Stats</BlockHeader>
      <BlockContainer>
        <StatContainer>
          <StatData>Place: 3rd</StatData>
          <StatData>Exp: 523</StatData>
          <StatData>Prestiege: 3</StatData>
          <StatData>Study Streak: 3</StatData>
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
              <Line type="monotone" dataKey="time" stroke="red" />
              <XAxis dataKey="day" />
              <YAxis dataKey="time" />
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

                        if (!prevVisible && currentVisible) {
                          prevChild.scrollIntoView({ behavior: 'smooth' })
                        }

                        currentObserver.unobserve(currentEntries[0].target)
                      },
                      { threshold: [1] }
                    )

                    currentObserver.observe(child)
                    prevObserver.unobserve(prevEntries[0].target)
                  },
                  { threshold: [1] }
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
            {COMPETITORS.map((comp, index) => {
              return (
                <CompetitorContentContainer
                  id={`competitor-${index}`}
                  key={uuidv4()}>
                  <CompetitorName>{comp.name}</CompetitorName>
                  <CompetitorData>Exp: {comp.exp}</CompetitorData>
                  <CompetitorData>Prestiege: {comp.prestiege}</CompetitorData>
                  <CompetitorData>
                    Leaderboard: {addNumberSuffix(comp.leaderboard)}
                  </CompetitorData>
                </CompetitorContentContainer>
              )
            })}
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
                          nextChild.scrollIntoView({ behavior: 'smooth' })
                        }

                        currentObserver.unobserve(currentEntries[0].target)
                      },
                      { threshold: [1] }
                    )

                    currentObserver.observe(child)
                    nextObserver.unobserve(nextEntries[0].target)
                  },
                  { threshold: [1] }
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
      <BlockContainer></BlockContainer>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
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
`

const BlockHeader = styled.p`
  color: white;
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

  position: relative;

  width: 0;
`

const StatData = styled.p`
  margin: 0.9em;
  color: ${(props) => props.theme.secondaryForeground};
`

const StatImage = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  height: 7em;
  width: 7em;
  border-radius: 50%;
  transform: translateY(-50%);
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

  position: absolute;
  top: 0;
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
  
  padding: 1em 3em;
  border-radius: 15px;

  height: 12em;

  position: relative;

  width: 20%;
`

const CompetitorInnerContainer = styled.div`
  overflow: hidden;
  height: 100%;

  border-radius: 15px;

  display: flex;
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

export default Landing
