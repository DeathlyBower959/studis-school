import React from 'react'
import styled from 'styled-components'

const InputButton = styled.button`
    padding: 0.6em 2em;
    color: ${(props) => props.theme.foreground};
    font-size: clamp(12px, 4vw, 15px);
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: filter 240ms ease-in-out;
    background: ${(props) => props.theme.accent};
    background: linear-gradient(
        58deg,
        ${(props) => props.theme.accent} 20%,
        ${(props) => props.theme.secondaryAccent} 100%
    );
    &:hover {
        filter: brightness(0.9);
    }

    &:disabled {
        cursor: auto;
        filter: brightness(0.4);
    }
`

const Button = (props) => {
    return (
        <InputButton {...props}/>
    )
}

export default Button
