import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 15px 0px 20px 0px;
    & label{
        position:absolute;
        top: ${(props) => props.chance ? "-15px": props.value? "-15px": "10px"};
        font-size:${(props) => props.chance? "0.8em": props.value? "0.8em": "1em"};
        color: white;
        transition: 0.1s ease-in;
        cursor: text;
        left: 8px;
    }
    & input{
        border: 2px solid white;
        width: 100%;
        height: 40px;
        padding: 8px;
        font-size: 15px;
        border-radius: 6px;
        color: white;
        background-color: transparent;
    }
    & input:focus{
        border: 2px solid rgb(76, 76, 209);
        transition: 0.1s ease all;
    }
`;

const Input = (
    { 
        type,
        value, 
        handleChange, 
        autocomplete = "off", 
        name, 
        label,
        handleBlur
    }) => {
        const [focus, setFocus] = useState(false);
    return (
        <InputContainer chance={focus} value={value}>
            <label 
                htmlFor={name}
                >
                    {label}
                </label>
            <input 
                type={type}
                value={value} 
                name = {name}
                id = {name}
                onChange ={handleChange}
                autoComplete ={autocomplete}
                onFocus={() => setFocus(true) }
                onBlur ={handleBlur}
                />
        </InputContainer>
    )
}

export default Input
