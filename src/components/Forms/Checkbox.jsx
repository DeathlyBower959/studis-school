import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: ${(props) => props.theme.foreground};
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) =>
    props.checked ? props.theme.accent : props.theme.inputBackground};
  border-radius: 3pt;
  transition: all 350ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${(props) => props.theme.accent};
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`

const CheckboxText = styled.span`
  color: ${(props) =>
    props.$disabled
      ? props.theme.secondaryMuted
      : props.theme.secondaryForeground};
  user-select: none;
  margin-left: 8px;
`

const Checkbox = ({ checked, labelText = '', disabled, ...props }) => {
  return (
    <label>
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} disabled={disabled} {...props} />
        <StyledCheckbox checked={checked}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <CheckboxText $disabled={disabled}>{labelText}</CheckboxText>
    </label>
  )
}

export default Checkbox
