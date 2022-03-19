import { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { ChevronDown } from 'react-feather'

const Dropdown = ({ children, title, img, tb }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const theme = useContext(ThemeContext)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  return (
    <ContentWrapper>
      <LinkWrapper
        onClick={toggleDropdown}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault()
            toggleDropdown()
          }
        }}
        tabIndex={tb}>
        {img ? (
          <DropdownLinkImage src={img} />
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
  @media only screen and (max-width: 650px) {
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
  @media only screen and (max-width: 650px) {
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

  transition: filter 250ms ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }

  user-select: none;

  cursor: pointer;

  padding-left: 0.5em;
  padding-right: 0.5em;
`

const DropdownLinkImage = styled.img`
  margin-right: 0.3em;

  height: 100%;
  border-radius: 50%;
`
const DropdownLink = styled.p`
  color: ${(props) => props.theme.navbar.foreground};

  margin-right: 0.3em;
`

export default Dropdown
