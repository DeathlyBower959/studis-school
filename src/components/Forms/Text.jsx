import React from 'react'
import styled from 'styled-components'

const TextboxInput = styled.input`
    
    max-width: 500px;
    border-radius: 5px;
    width: 50%;
    height: 42px;
    outline: none;
    color: ${(props) => props.theme.foreground};
    border: 1px solid ${(props) => props.theme.secondaryBackground}08;
    caret-color: ${(props) => props.theme.muted};
    padding: 0px 10px;
    border-bottom: 1.4px solid transparent;
    transition: border 200ms ease;
    font-size: 12px;
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

const Textbox = (props) => {
    return (
        <TextboxInput {...props}/>
    )
}

export default Textbox
