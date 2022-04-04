import { useState, useContext, useEffect, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { ChevronDown } from 'react-feather'
import { MOBILE } from '../../constants/sizes'
import avatarPlaceholder from '../../assets/avatar_placeholder.png'
import ProfilePicture from '../ProfilePicture'

const Dropdown = ({ children, title, img, tb }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const theme = useContext(ThemeContext)
  const ContentWrapperRef = useRef()

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  const handleClickOutside = (event) => {
    if (
      ContentWrapperRef.current &&
      !ContentWrapperRef.current.contains(event.target)
    ) {
      closeDropdown()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <ContentWrapper ref={ContentWrapperRef}>
      <LinkWrapper
        onClick={toggleDropdown}
        onKeyUp={(e) => {
          if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault()
            toggleDropdown()
          }
        }}
        tabIndex={tb}>
        {img ? (
          <ProfilePicture height='2.5em' profilePicture={img}/>
        ) : (
          <DropdownLink>{title}</DropdownLink>
        )}
        <ChevronDown color={theme.navbar.foreground} />
      </LinkWrapper>
      <DropdownWrapper $isDropdownOpen={isDropdownOpen}>
        {children?.length !== undefined ? (
          children.map((child, index) => (
            <ChildWrapper index={index} key={uuidv4()} onClick={closeDropdown}>
              {child}
            </ChildWrapper>
          ))
        ) : (
          <ChildWrapper index={0} onClick={closeDropdown}>
            {children}
          </ChildWrapper>
        )}
      </DropdownWrapper>
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  /* background-color: ${(props) => props.theme.navbar.background}; */
  position: relative;

  margin-left: 0.5em;
`

const ChildWrapper = styled.div`
  @media only screen and (max-width: ${MOBILE.navbar}) {
    padding-top: ${(props) => (props.index === 0 ? '0.5em' : '0')};
  }
`

const DropdownWrapper = styled.div`
  background-color: ${(props) => props.theme.navbar.background};
  border: 1px solid ${(props) => props.theme.navbar.outline};
  padding: 0.75em 0.75em 0.75em 0.25em;
  border-radius: 8px;

  text-align: center;
  position: absolute;
  right: 0;

  user-select: none;

  transition: margin-top 450ms ease-out, opacity 500ms ease-out;

  opacity: ${(props) => (props.$isDropdownOpen ? '1' : '0')};
  margin-top: ${(props) => (props.$isDropdownOpen ? '0' : '-2em')};
  z-index: -1;
  @media only screen and (max-width: ${MOBILE.navbar}) {
    left: 0;
    margin-top: ${(props) => (props.$isDropdownOpen ? '0' : '-3em')};
    padding-top: 0;
  }
`

const LinkWrapper = styled.div`
  height: 100%;
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    transition: filter 250ms ease-in-out;
  }
  &:hover svg {
    filter: brightness(0.8);
  }

  user-select: none;

  cursor: pointer;

  padding-left: 0.5em;
  padding-right: 0.5em;
`

const ProfilePictureWrapper = styled.div`
  width: 2.5em;
  height: 2.5em;
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  cursor: pointer;
`

const ProfilePictureChooserImg = styled.img`
  position: absolute;
  top: ${(props) => props.$offset?.y || 0}%;
  left: ${(props) => props.$offset?.x || 0}%;

  transform: scale(${(props) => props.$scale || 1});
  user-select: none;
  -webkit-user-select: none;
`

const DropdownLink = styled.p`
  color: ${(props) => props.theme.navbar.foreground};

  margin-right: 0.3em;
`

export default Dropdown
