import React, { useState } from 'react';

import Input from '../../forms/input';
import SnippetContainer from '../snippetcontainer';

const SearchElement = ({ placeholder, searchFunc, generateSnippets, handleSelect }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [snippets, setSnippets] = useState([]);
    const [message, setMessage] = useState('Powered by Spotify');

    const [timeoutId, setTimeoutId] = useState('');

    const search = async text => {
        const res = await searchFunc(text);
        setSearchResults(res);
        setSnippets(generateSnippets(res));

        if (res.length === 0)
            if (text.length === 0)
                setMessage('Powered by Spotify');
            else
                setMessage('No Results Found.');
    }

    const debouncedSearch = async text => {
        clearTimeout(timeoutId);

        setTimeoutId(setTimeout(async () => await search(text), 1000));
    }

    const handleType = async text => {
        setMessage('Loading...');
        setSnippets([])
        await debouncedSearch(text);
    };

    return (
        <div>
            <Input handleType={handleType} placeholder={placeholder} />
            <br />
            <br />
            <SnippetContainer snippets={snippets} handleSelect={index => handleSelect(searchResults[index])} message={message} />
        </div>
    );
};

export default SearchElement;