import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    display: block;
    width: 400px;
    height: 35px;
    font-size: 1rem;
    padding-left: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.textColor};
`;

const Input = ({ handleType, placeholder }) => {
    return (
        <StyledInput autoFocus onChange={e => handleType(e.target.value)} type='text' placeholder={placeholder} />
    );
};

export default Input;