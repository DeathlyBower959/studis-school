import styled, { ThemeContext } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Account from '../../contexts/AccountContext'
import { MOBILE } from '../../constants/sizes'
import Spinner from '../../atoms/Loaders/Spinner'
import ToastNotif from '../../contexts/ToastNotifContext'
import {
  downvoteSet,
  getCommunity,
  remixSet,
  upvoteSet
} from '../../api/community'
import VoteArrow from '../../assets/svg/VoteArrow'

function UserSet() {
  const { userId, setId } = useParams()

  const { userData, localAuth, setUserData } = useContext(Account)
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

      if (remixResult.status !== 200) return reject()

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

  const UpvoteSet = async (remove = false) => {
    const upvoteResult = await upvoteSet(localAuth, userId, setId)
    if (upvoteResult?.data?.errors?.userSets?.length === 0) {
      setCurrentCommunity((prev) => {
        let newCommunity = {
          ...prev
        }

        if (!remove) {
          newCommunity.userSets[dataIndex] = {
            ...newCommunity.userSets[dataIndex],
            downvotes: prev.userSets[dataIndex].downvotes.filter(
              (userId) => userId !== userData._id
            ),
            upvotes: !prev.userSets[dataIndex].upvotes.includes(userData._id)
              ? [...prev.userSets[dataIndex].upvotes, userData._id]
              : prev.userSets[dataIndex].upvotes
          }
        } else {
          newCommunity.userSets[dataIndex] = {
            ...newCommunity.userSets[dataIndex],
            downvotes: prev.userSets[dataIndex].downvotes.filter(
              (userId) => userId !== userData._id
            ),
            upvotes: prev.userSets[dataIndex].upvotes.filter(
              (userId) => userId !== userData._id
            )
          }
        }
        
        return newCommunity
      })
    }
  }

  const DownvoteSet = async (remove = false) => {
    const downvoteResult = await downvoteSet(localAuth, userId, setId)
    if (downvoteResult?.data?.errors?.userSets?.length === 0) {
      setCurrentCommunity((prev) => {
        let newCommunity = {
          ...prev
        }

        if (!remove) {
          newCommunity.userSets[dataIndex] = {
            ...newCommunity.userSets[dataIndex],
            upvotes: prev.userSets[dataIndex].upvotes.filter(
              (userId) => userId !== userData._id
            ),
            downvotes: !prev.userSets[dataIndex].downvotes.includes(
              userData._id
            )
              ? [...prev.userSets[dataIndex].downvotes, userData._id]
              : prev.userSets[dataIndex].downvotes
          }
        } else {
          newCommunity.userSets[dataIndex] = {
            ...newCommunity.userSets[dataIndex],
            upvotes: prev.userSets[dataIndex].upvotes.filter(
              (userId) => userId !== userData._id
            ),
            downvotes: prev.userSets[dataIndex].downvotes.filter(
              (userId) => userId !== userData._id
            )
          }
        }
        return newCommunity
      })
    }
  }

  return (
    <>
      <Header>{data.title}</Header>
      <Description>{data.description}</Description>
      <NavWrapper>
        <Downvote
          isdownvoted={data.downvotes.includes(userData._id)}
          onClick={() => DownvoteSet(data.downvotes.includes(userData._id))}
        />
        <StudyModeButton onClick={RemixSet}>Add To Sets</StudyModeButton>
        <Upvote
          isupvoted={data.upvotes.includes(userData._id)}
          onClick={() => UpvoteSet(data.upvotes.includes(userData._id))}
        />
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

const Upvote = styled(VoteArrow)`
  transform: rotateX(180deg);
`

const Downvote = styled(VoteArrow)``

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
