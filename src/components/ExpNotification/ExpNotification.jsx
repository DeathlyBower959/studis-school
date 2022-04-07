import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const ExpNotifications = ({ expNotification, setExpNotification }) => {
  const wrapperRef = useRef()

  useEffect(() => {
    const AnimationEnd = () => {
      setExpNotification(null)
    }
    
    wrapperRef.current?.addEventListener('animationend', AnimationEnd)
    return () =>
      wrapperRef.current?.removeEventListener('animationend', AnimationEnd)
  }, [wrapperRef])

  return (
    <ExpNotificationWrapper $shown={expNotification !== null} ref={wrapperRef}>
      <ExpContent>{expNotification}</ExpContent>
    </ExpNotificationWrapper>
  )
}

const ExpNotificationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  animation: ${(props) => (props.$shown ? 'floatUp' : 'floatDown')} 4s
    ease-in-out forwards;

  @keyframes floatUp {
    0% {
      bottom: -6em;
      opacity: 0;
    }
    45% {
      bottom: 1em;
      opacity: 1;
    }
    90% {
      bottom: 1em;
      opacity: 1;
    }
    100% {
      bottom: 1em;
      opacity: 0;
    }
  }

  @keyframes floatDown {
    0% {
      bottom: 1em;
      opacity: 0;
    }
    100% {
      bottom: -6em;
      opacity: 0;
    }
  }

  background-color: ${(props) => props.theme.expNotif.background};
  border: 2px solid ${(props) => props.theme.expNotif.border};
  border-radius: 15px;
  padding: 0.5em 1em;
`
const ExpContent = styled.p`
  margin: 0;
  color: ${(props) => props.theme.expNotif.foreground};
`

export default ExpNotifications
