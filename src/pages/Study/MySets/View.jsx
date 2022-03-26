import styled, { ThemeContext } from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import Account from '../../../contexts/AccountContext'
import { Globe, Lock, ChevronDown } from 'react-feather'
import { MOBILE } from '../../../constants/sizes'
import { calculateDate } from '../../../utils/time'
import { deleteSet } from '../../../api/user'
import ToastNotif from '../../../contexts/ToastNotifContext'

const ViewSet = () => {
  const { setId } = useParams()

  const { userData, localAuth, setUserData } = useContext(Account)
  const theme = useContext(ThemeContext)
  const SendToast = useContext(ToastNotif)

  const navigate = useNavigate()

  const [isNavOpen, setIsNavOpen] = useState(true)

  const dataIndex = userData?.userSets?.findIndex((set) => set._id === setId)

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

  const DeleteSet = () => {
    if (window.confirm('Are you sure you want to delete this set?')) {
      const DeleteSetPromise = new Promise(async (resolve, reject) => {
        const deleteResult = await deleteSet(localAuth, setId)

        if (!deleteResult?.data?.newUser) return reject(deleteResult.data)

        setUserData(deleteResult.data.newUser)
        navigate('/study/sets')
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
        <PrivacyStatusWrapper>
          {data.isPublic ? <PublicStatusIcon /> : <PrivateStatusIcon />}

          <PrivacyStatus isPublic={data.isPublic}>
            {data.isPublic ? 'Public' : 'Private'}
          </PrivacyStatus>
        </PrivacyStatusWrapper>

        <FloatingDivider />

        <Link
          to={`/study/sets/edit/${data._id}`}
          style={{ textDecoration: 'none' }}>
          <StudyModeButton>Edit</StudyModeButton>
        </Link>

        <FloatingDivider />

        <Link
          to={`/study/sets/flash/${data._id}`}
          style={{ textDecoration: 'none' }}>
          <StudyModeButton>Flash</StudyModeButton>
        </Link>
        <Link
          to={`/study/sets/test/${data._id}`}
          style={{ textDecoration: 'none' }}>
          <StudyModeButton>Test</StudyModeButton>
        </Link>

        <FloatingDivider />
        <StudyModeButton style={{ color: theme.error }} onClick={DeleteSet}>
          Delete
        </StudyModeButton>

        <CreatedDate>{calculateDate(new Date(data.createdAt))}</CreatedDate>
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

  max-height: ${(props) => (props.$isOpen ? '24em' : '1.5em')};
  
  @media only screen and (max-width: ${MOBILE.viewSet}) {
    position: relative;
    top: 0;
    right: 0;
    margin: 1em auto;
    max-width: 15em;
  }

  z-index: 0;
`

const PrivacyStatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
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

  margin-bottom: 2em;
`

const PublicStatusIcon = styled(Globe)`
  stroke: ${(props) => props.theme.success};
`
const PrivateStatusIcon = styled(Lock)`
  stroke: ${(props) => props.theme.error};
`

const PrivacyStatus = styled.p`
  /* Makes the color fully red for the "Public/PRivate" text */
  /* color: ${(props) =>
    props.isPublic ? props.theme.success : props.theme.error}; */
  color: ${(props) => props.theme.tertiaryForeground};
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

export default ViewSet
