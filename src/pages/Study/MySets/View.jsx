import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useContext, useState, useRef } from 'react'
import Account from '../../../contexts/AccountContext'
import Spinner from '../../../atoms/Loaders/Spinner'
import { Globe, Lock, ChevronDown } from 'react-feather'

const ViewSet = () => {
  const { userData } = useContext(Account)
  const { setId } = useParams()

  const [isNavOpen, setIsNavOpen] = useState(true)
  const divRef = useRef()

  const data = userData?.userSets?.find((set) => set._id == setId)

  const calculateDate = (date, showAgo = true) => {
    var seconds = Math.floor((new Date() - date) / 1000)

    var interval = seconds / 31536000

    if (interval > 1) {
      return date.toLocaleDateString()
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return date.toLocaleDateString()
    }
    interval = seconds / 86400
    if (interval > 1 && interval < 7) {
      return Math.floor(interval) + ' days' + (showAgo ? ' ago' : '')
    } else if (interval > 1) {
      return date.toLocaleDateString()
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hours' + (showAgo ? ' ago' : '')
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minutes' + (showAgo ? ' ago' : '')
    }
    return Math.floor(seconds) + ' seconds' + (showAgo ? ' ago' : '')
  }

  if (!data)
    return (
      <SpinnerWrapper>
        <Spinner height="50px" />
      </SpinnerWrapper>
    )

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
          to={`/study/sets/learn/${data._id}`}
          style={{ textDecoration: 'none' }}>
          <StudyModeButton>Learn</StudyModeButton>
        </Link>
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

// REMEMBER TO ADD MOBILE SUPPORT FOR MOBILE WRAPPER

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

  max-height: ${(props) => (props.$isOpen ? '20em' : '1.5em')};
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
  max-width: 800px;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  margin-top: 2em;
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
