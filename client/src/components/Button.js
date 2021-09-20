import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
    border: none;
    background-color: #2EA043;
    height: 40px;
    color: white;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    &:hover{
        background-color: #36bb4f;
    }
`;

const Button = ({ type = "submit", text, handleClick}) => {
    return type !== "submit" ? (
        <>
            <ButtonStyle 
                type={type}
                onClick={handleClick}
            >
                {text}
            </ButtonStyle>
        </>
    ): (
        <>
            <ButtonStyle 
                type={type}
            >
                {text}
            </ButtonStyle>
        </>
    )
}

export default Button
