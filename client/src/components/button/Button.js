import styled from 'styled-components';

const contextColor = props => props.primary ? props.theme.primaryColor : props.theme.secondaryColor;

const Button = styled.button`
    font-size: ${props => props.small ? '1rem' : '1.5rem'};
    font-weight: 500;
    height: ${props => props.small ? '40px' : '60px'};
    padding: 10px 15px;
    border: none;
    outline: none;
    border-radius: 15px;
    color: ${props => props.theme.textColor};
    background: ${contextColor};
    opacity: ${props => props.disabled ? '0.4' : '1.0'};

    &:hover:enabled {
        color: ${contextColor};
        background: ${props => props.theme.textColor};
    }
`;

export default Button;