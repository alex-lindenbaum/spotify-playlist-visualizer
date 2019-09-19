import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Button from '../button';
import arrow from '../../assets/right-arrow.svg';

const StyledButton = styled(Button)`
    position: fixed;
    top: 15px;
    left: -100px;
    transition: transform 500ms ease-in-out;
`;

const Img = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 25px;
    left: 10px;
    transition: transform 500ms ease-in-out;
`;

const ToggleAuth = ({ text, handleClick }) => {
    const [transitionState, setTransitionState] = useState('contracted');
    const [arrowTransform, setArrowTransform] = useState('');
    const [buttonTransform, setButtonTransform] = useState('');

    const expand = () => {
        setTransitionState('transitioning');

        setArrowTransform('rotate(-180deg)');
        setTimeout(() => {
            setArrowTransform('translate(110px) rotate(180deg)');
            setButtonTransform('translate(110px)');

            setTransitionState('expanded');
        }, 500);
    };

    const contract = () => {
        setTransitionState('transitioning');

        setArrowTransform('rotate(-180deg)');
        setButtonTransform('');
        setTimeout(() => {
            setArrowTransform('');

            setTransitionState('contracted');
        }, 500);
    };

    const toggle = () => {
        if (transitionState === 'contracted')
            expand();
        else if (transitionState === 'expanded')
            contract();
    };

    const wheelHandler = useCallback(event => {
        if (transitionState === 'expanded')
            contract();
    }, [transitionState]);

    useEffect(() => {
        window.addEventListener('wheel', wheelHandler);

        return () => window.removeEventListener('wheel', wheelHandler);
    }, [wheelHandler]);

    return (
        <div>
            <StyledButton style={{ transform: buttonTransform }} small primary onClick={handleClick}>{text}</StyledButton>
            <Img style={{ transform: arrowTransform }} onClick={toggle} src={arrow} alt={text} />
        </div>
    );
};

export default ToggleAuth;