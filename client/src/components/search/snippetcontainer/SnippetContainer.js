import React from 'react';
import styled from 'styled-components';

import Snippet from '../snippet';

const P = styled.p`
    color: ${props => props.theme.secondaryColor};
    font-size: 1.2rem;
    width: 400px;
`;

const SnippetContainer = ({ snippets, handleSelect, message }) => {
    if (snippets.length === 0)
        return <P>{message}</P>;

    return (
        <div>
            {snippets.map((snippet, index) => (
                <div key={index} onClick={() => handleSelect(index)}>
                    <Snippet
                        title={snippet.title}
                        owner={snippet.owner}
                        img={snippet.img}
                    />
                </div>
            ))}
        </div>
    );
};

export default SnippetContainer;