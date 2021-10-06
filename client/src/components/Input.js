import styled from 'styled-components';

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    margin: 1rem 0;

    & input {
        width: 100%;
        height: 40px;
        outline: none;
        font-size: 16px;
        border: 2px solid white;
        background-color: transparent;
        border-radius: 20px;
        color: white;
        padding-left: 15px;
        transition: .3s ease all
    }
    & input:focus{
        border-color: #176ceb;
    }
    & label {
        position: absolute;
        bottom: 11px;
        left: 17px;
        pointer-events: none;
        font-size: 16px;
        color: white;
        transition: .3s ease all;
    }
    & input:focus ~ label,
    & input:not(:placeholder-shown)~ label{
        transform: translateY(-30px);
        color: #176ceb;
        font-size: 13px;
        background-color: transparent;
    }
    
`;

const Input = (
    { 
        type,
        value, 
        handleChange,
        name, 
        label,
        handleBlur
    }) => {
    return (
        <InputContainer value={value}>
            <input
                type={type}
                value={value} 
                name = {name}
                id = {name}
                onChange ={handleChange}
                autoComplete = "off"
                onBlur ={handleBlur}
                placeholder=" "
                required
                />
            <label 
                htmlFor={name}
                >
                    {label}
            </label>
        </InputContainer>
    )
}

export default Input
