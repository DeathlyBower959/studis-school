import styled, { ThemeContext } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Account from '../../contexts/AccountContext'
import { ChevronDown } from 'react-feather'
import { MOBILE } from '../../constants/sizes'
import Spinner from '../../atoms/Loaders/Spinner'
import ToastNotif from '../../contexts/ToastNotifContext'
import { downvoteSet, getCommunity, remixSet, upvoteSet } from '../../api/community'

function UserSet() {
  const { userId, setId } = useParams()

  const { userData, localAuth, setUserData } = useContext(Account)
  const theme = useContext(ThemeContext)
  const SendToast = useContext(ToastNotif)

  const navigate = useNavigate()

  const [currentCommunity, setCurrentCommunity] = useState()

  const dataIndex = currentCommunity?.userSets?.findIndex(
    (set) => set._id === setId && set.userId === userId
  )

  const GetCommunity = async () => {
    const communityResult = await getCommunity(userData._id)

    setCurrentCommunity(communityResult.data)
  }

  const RemixSet = () => {
    const RemixSetPromise = new Promise(async (resolve, reject) => {
      const remixResult = await remixSet(localAuth, userId, setId)

      console.log(remixResult)

      resolve()
      navigate(
        `/study/saved/view/${
          remixResult.data.newUser.savedSets[
            remixResult.data.newUser.savedSets.length - 1
          ]._id
        }`
      )
      setUserData(remixResult.data.newUser)
    })

    SendToast(
      {
        promise: RemixSetPromise,
        pending: 'Remixing set...',
        error: 'Failed to remix set!',
        success: 'Successfully remixed set!'
      },
      'promise'
    )
  }

  useEffect(() => {
    GetCommunity()
  }, [])

  if (dataIndex === undefined)
    return (
      <SpinnerWrapper>
        <Spinner height="50px" />
      </SpinnerWrapper>
    )

  if (dataIndex < 0)
    return (
      <>
        <Header>Not Found</Header>
        <Description>
          I tried to find this set, but it doesn't seem to exist in this
          person's account!
        </Description>
      </>
    )

  const data = currentCommunity.userSets[dataIndex]

  const UpvoteSet = async () => {
    const upvoteResult = await upvoteSet(localAuth, userId, setId)
  }
  
  const DownvoteSet = async () => {
  const downvoteResult = await downvoteSet(localAuth, userId, setId)

  }

  return (
    <>
      <Header>{data.title}</Header>
      <Description>{data.description}</Description>
      <NavWrapper>
        <Downvote
          onClick={DownvoteSet}
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
        <StudyModeButton onClick={RemixSet}>Remix</StudyModeButton>
        <Upvote
          onClick={UpvoteSet}
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
      </NavWrapper>
      <TermContainer>
        {data.terms?.map((term) => {
          return (
            <TermWrapper key={term._id}>
              <Term>{term.term}</Term>
              <TermDef>{term.def}</TermDef>
            </TermWrapper>
          )
        })}
      </TermContainer>
    </>
  )
}

const Upvote = styled.svg`
  transform: rotateX(180deg);
  cursor: pointer;
`

const Downvote = styled.svg`
cursor: pointer;`

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`

const StudyModeButton = styled.p`
  margin: 1em 0;
  cursor: pointer;
  background-color: ${(props) => props.theme.tertiaryBackground};
  color: ${(props) => props.theme.tertiaryForeground};

  width: 80%;
  max-width: 200px;
  text-align: center;
  padding: 0.75em 0;

  border-radius: 15px;

  transition: filter 250ms ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
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

const Header = styled.p`
  color: ${(props) => props.theme.foreground};
  font-size: 2em;
  margin-bottom: 0.2em;

  width: 100%;
  text-align: center;
`

const Description = styled.p`
  color: ${(props) => props.theme.secondaryForeground};
  text-align: center;
  width: 80%;
  margin: 0 auto;
`

const TermContainer = styled.div`
  width: 80%;
  max-width: 600px;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  margin-top: 1em;
  @media only screen and (max-width: ${MOBILE.viewSet}) {
    margin-top: 0;
  }
`

const TermWrapper = styled.div`
  padding: 1em;
  border-radius: 15px;
  background-color: ${(props) => props.theme.secondaryBackground};
`

const Term = styled.p`
  margin: 0;
  color: ${(props) => props.theme.secondaryForeground};
  overflow-wrap: break-word;
`

const TermDef = styled.p`
  margin: 0;
  text-indent: 1em;
  color: ${(props) => props.theme.tertiaryForeground};
  width: 100%;
  overflow-wrap: break-word;
`

export default UserSet
