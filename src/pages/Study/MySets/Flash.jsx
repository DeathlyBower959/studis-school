import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Account from '../../../contexts/AccountContext'
import { CardContainer } from '../../../components/Cards/WordCard'
import { useContext, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { updateUser } from '../../../api/user'
import { expDelay, expToAdd } from '../../../constants/ranks'
import { calculateRank } from '../../../utils/ranking'
import ExpNotifications from '../../../components/ExpNotification/ExpNotification'

const FlashSet = () => {
  const { setId } = useParams()

  const { userData, localAuth, setUserData } = useContext(Account)

  const [termIndex, setTermIndex] = useState(0)
  const [expNotification, setExpNotification] = useState(null)

  const lastInteracted = useRef(0)

  const dataIndex = userData?.userSets?.findIndex((set) => set._id === setId)

  useEffect(() => {
    const updateTime = () => {
      lastInteracted.current = Date.now()
    }

    document.addEventListener('click', updateTime)
    return () => document.removeEventListener('click', updateTime)
  }, [])

  const sendExpNotification = (newExp) => {
    setExpNotification(newExp)
  }

  useEffect(() => {
    const expInterval = setInterval(async () => {
      if (lastInteracted.current + expDelay >= Date.now()) {
        const newExp = Math.floor(
          expToAdd() *
            calculateRank(
              userData.exp.reduce((prev, current) => prev + current.amount, 0)
            ).multiplier
        )
        const updateUserResult = await updateUser(localAuth, {
          exp: `+${newExp}`
        })
        if (updateUserResult.status === 200) {
          setUserData(updateUserResult.data.newUser)
          sendExpNotification(newExp)
        }
      }
    }, expDelay)

    return () => clearInterval(expInterval)
  }, [lastInteracted])

  if (dataIndex < 0)
    return (
      <>
        <Header>Not Found</Header>
        <Description>
          I tried to find this set, but it doesn't seem to exist in your
          account!
        </Description>
      </>
    )

  const data = userData.userSets[dataIndex]

  const nextCard = () =>
    setTermIndex((prev) => (prev < data.terms.length - 1 ? prev + 1 : prev))
  const prevCard = () => setTermIndex((prev) => (prev > 0 ? prev - 1 : prev))

  return (
    <>
      <Header>{data.title}</Header>
      <CardWrapper>
        <InnerCardContainer>
          {data.terms &&
            data.terms?.length > 0 &&
            data.terms.map((term, index) => {
              if (termIndex !== index) return <></>
              return (
                <CardContainer
                  key={term._id}
                  index={index}
                  termIndex={termIndex}
                  minw="5em"
                  prefferedw="40vw"
                  maxw="50em"

                  minh="9em"
                  prefferedh="20vw"
                  maxh="25em"
                  front={
                    <>
                      <TermTitle>{term.term}</TermTitle>
                    </>
                  }
                  back={
                    <>
                      <TermDef>{term.def}</TermDef>
                    </>
                  }
                />
              )
            })}
        </InnerCardContainer>
      </CardWrapper>
      <CardNav>
        <StyledArrowLeft onClick={prevCard} />
        <CardIndex>
          {termIndex + 1}/{data.terms.length}
        </CardIndex>
        <StyledArrowRight onClick={nextCard} />
      </CardNav>
      <ExpNotifications
        expNotification={expNotification}
        setExpNotification={setExpNotification}
      />
    </>
  )
}

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 2em;
  margin: 0.25em;

  /* width: 100%; */
  /* text-align: center; */

  width: 11ch;
  overflow-wrap: anywhere;
  word-wrap: break-all;

  text-align: center;

  overflow: hidden overlay;
  width: 100%;
`

const Description = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
  text-align: center;
  width: 80%;
  margin: 0 auto;
`

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2em 0 1em 0;
`

const InnerCardContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: center;
`

const CardNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  max-width: 200px;
  margin: 0 auto;
`

const TermTitle = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
`

const TermDef = styled.p`
  color: ${(props) => props.theme.secondaryForeground};

  overflow-wrap: anywhere;
  word-wrap: break-all;

  text-align: center;

  overflow: hidden overlay;
  width: 100%;
`

const StyledArrowLeft = styled(ArrowLeft).attrs({ size: '1.75em' })`
  stroke: ${(props) => props.theme.secondaryMuted};
  cursor: pointer;
`
const StyledArrowRight = styled(ArrowRight).attrs({ size: '1.75em' })`
  stroke: ${(props) => props.theme.secondaryMuted};
  cursor: pointer;
`

const CardIndex = styled.p`
  color: ${(props) => props.theme.muted};
`

export default FlashSet
