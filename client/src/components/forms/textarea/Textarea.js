import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
    display: block;
    width: 400px;
    height: 140px;
    font-size: 1rem;
    padding-top: 10px;
    padding-left: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.textColor};
    resize: none;
`;

const Textarea = ({ handleType, placeholder }) => {
    return (
        <StyledTextarea onChange={e => handleType(e.target.value)} placeholder={placeholder} />
    );
};

export default Textarea;