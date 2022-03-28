import React from 'react'
import styled from 'styled-components'

const TextAreaStyled = styled.textarea`
  max-width: 400px;
  width: 90%;
  border-radius: 0.5rem;
  resize: none;
  min-height: 6em;
  height: 6em;
  overflow: hidden;
  overflow-y: scroll;
  outline: none;
  color: ${(props) => props.theme.foreground};
  border: 1px solid ${(props) => props.theme.secondaryBackground}08;
  caret-color: ${(props) => props.theme.muted};
  padding: 0.8em;
  border-bottom: 1.4px solid transparent;
  transition: border 200ms ease;
  font-size: 1em;
  max-height: 12em;
  &::placeholder {
    color: ${(props) => props.theme.muted};
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 3px solid ${(props) => props.theme.accent};
  }
  background-color: ${(props) => props.theme.inputBackground};
  margin-left: 7px;
`

const TextArea = (props) => {
  return (
    <TextAreaStyled
      {...props}
      onChange={(e) => {
        if (props.onChange) props.onChange(e)

        // Reset field height
        e.target.style.height = 'auto'

        // Get the computed styles for the element
        const computed = window.getComputedStyle(e.target)

        // Calculate the height
        const height =
          parseInt(computed.getPropertyValue('border-top-width'), 10) +
          parseInt(computed.getPropertyValue('padding-top'), 10) +
          e.target.scrollHeight -
          parseInt(computed.getPropertyValue('padding-bottom'), 10) * 0.8 +
          parseInt(computed.getPropertyValue('border-bottom-width'), 10)

        e.target.style.height = `${height}px`
      }}
    />
  )
}

export default TextArea
