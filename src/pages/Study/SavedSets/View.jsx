import styled, { ThemeContext } from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import Account from '../../../contexts/AccountContext'
import Spinner from '../../../atoms/Loaders/Spinner'
import { ChevronDown } from 'react-feather'
import { MOBILE } from '../../../constants/sizes'
import { calculateDate } from '../../../utils/time'
import { truncateString } from '../../../utils/strings'
import { deleteRemixedSet } from '../../../api/community'
import ToastNotif from '../../../contexts/ToastNotifContext'

const ViewSaved = () => {
  const { setId } = useParams()

  const { userData, localAuth, setUserData } = useContext(Account)
  const theme = useContext(ThemeContext)
  const SendToast = useContext(ToastNotif)

  const navigate = useNavigate()

  const [isNavOpen, setIsNavOpen] = useState(true)

  const dataIndex = userData?.savedSets?.findIndex((set) => set._id === setId)

  if (!userData?.savedSets)
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
          I tried to find this set, but it doesn't seem to exist in your
          account!
        </Description>
      </>
    )

  const data = userData.savedSets[dataIndex]
  
  const DeleteSet = () => {
    if (window.confirm('Are you sure you want to delete this set?')) {
      const DeleteSetPromise = new Promise(async (resolve, reject) => {
        const deleteResult = await deleteRemixedSet(localAuth, setId)


        if (!deleteResult?.data?.newUser) return reject(deleteResult.data)

        setUserData(deleteResult.data.newUser)
        navigate('/study/saved')
        resolve(deleteResult.data.newUser)
      })

      SendToast(
        {
          promise: DeleteSetPromise,
          pending: 'Deleting set...',
          error: 'Failed to delete set!',
          success: 'Successfully deleted set!'
        },
        'promise'
      )
    }
  }

  return (
    <>
      <Header>{data.title}</Header>
      <Description>{data.description}</Description>

      <FloatingWrapper $isOpen={isNavOpen}>
        <Link
          to={`/study/saved/edit/${data._id}`}
          style={{ textDecoration: 'none' }}>
          <StudyModeButton>Edit</StudyModeButton>
        </Link>

        <FloatingDivider />

        <Link
          to={`/study/saved/flash/${data._id}`}
          style={{ textDecoration: 'none' }}>
          <StudyModeButton>Flash</StudyModeButton>
        </Link>
        <Link
          to={`/study/saved/test/${data._id}`}
          style={{ textDecoration: 'none' }}>
          <StudyModeButton>Test</StudyModeButton>
        </Link>

        <FloatingDivider />
        <StudyModeButton style={{ color: theme.error }} onClick={DeleteSet}>
          Delete
        </StudyModeButton>

        <CreatedDate>{calculateDate(new Date(data.createdAt))}</CreatedDate>
        <RemixedFrom>
          {truncateString(data.ownerName, 15) || 'Unknown User'}
        </RemixedFrom>
        <MinimizeArrow
          onClick={() => setIsNavOpen((prev) => !prev)}
          $isOpen={isNavOpen}
        />
      </FloatingWrapper>

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

// Floating Navbar
const FloatingWrapper = styled.div`
  position: fixed;
  right: 1em;
  top: 8em;
  background-color: ${(props) => props.theme.tertiaryBackground};
  border-radius: 15px;
  padding: 0.5em 1em 0 1em;

  overflow: hidden;

  transition: max-height 1s ease-in-out;

  max-height: ${(props) => (props.$isOpen ? '22em' : '1.5em')};

  @media only screen and (max-width: ${MOBILE.viewSet}) {
    position: relative;
    top: 0;
    right: 0;
    margin: 1em auto;
    max-width: 15em;
  }

  z-index: 0;
`

const StudyModeButton = styled.p`
  margin: 0.25em 0;
  cursor: pointer;
  background-color: ${(props) => props.theme.tertiaryBackground};
  color: ${(props) => props.theme.tertiaryForeground};

  width: 100%;
  text-align: center;
  padding: 0.75em 0;

  border-radius: 15px;

  transition: filter 250ms ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
`

const MinimizeArrow = styled(ChevronDown)`
  stroke: ${(props) => props.theme.secondaryMuted};
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  transition: filter 250ms ease-in-out, transform 750ms ease-in-out;

  transform: rotateZ(${(props) => (props.$isOpen ? '0' : '-180deg')});

  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`

const CreatedDate = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;

  color: ${(props) => props.theme.secondaryMuted};
  font-size: 0.75em;

  /* margin-bottom: 2em; */
`

const RemixedFrom = styled.p`
  color: ${(props) => props.theme.secondaryMuted};
  font-size: 0.75em;
  width: 100%;
  text-align: center;
  margin: 0.25em 0 2em 0;
`

const FloatingDivider = styled.div`
  height: 2px;
  width: 80%;
  background-color: ${(props) => props.theme.quaternaryBackground};
  margin: 0 auto;
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

  margin-top: 2em;
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

export default ViewSaved
