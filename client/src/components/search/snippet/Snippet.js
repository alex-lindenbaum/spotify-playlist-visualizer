import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    position: relative;
    width: 400px;
    height: 75px;
    text-align: left;
    outline: 1px solid ${props => props.theme.secondaryColor};
    margin-bottom: 1px;
    opacity: 0.8;

    &:hover {
        z-index: 999;
        outline: 1px solid ${props => props.theme.primaryColor};
        opacity: 1.0;
    }
`;

const Title = styled.h3`
    color: ${props => props.theme.textColor};
    padding: 10px 0px 5px 10px;
`;

const Owner = styled.h4`
    color: ${props => props.theme.secondaryColor};
    padding-left: 10px;
`;

const Img = styled.img`
    position: absolute;
    width: 75px;
    height: 75px;
    top: 0px;
    right: 0px;
`;

const Snippet = ({ title, owner, img }) => {
    const finalTitle = title.length <= 25 ? title : title.substr(0, 25) + '...';

    return (
        <Div>
            <div>
                <Title>{finalTitle}</Title>
                <Owner>{owner}</Owner>
            </div>
            {img && <Img src={img} alt={title} />}
        </Div>
    );
};

export default Snippet;