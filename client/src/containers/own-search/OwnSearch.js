import React, { useState, useEffect, useCallback } from 'react';

import SearchElement from '../../components/search/search-element';
import SpotifyApi from '../../util/spotify-api';

const placeholder = 'Search...';
    
const generateSnippets = playlists => {
    return playlists.map(playlist => ({
        title: playlist.name,
        owner: localStorage.displayName,
        img: playlist.images[0] ? playlist.images[0].url : ''
    }));
};

const OwnSearch = ({ handleSelect }) => {
    const [userPlaylists, setUserPlaylists] = useState([]);

    const fetchPlaylists = useCallback(async () => {
        const res = await SpotifyApi.getUserPlaylists();
        setUserPlaylists(res);
    }, []);

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    const searchFunc = async text => {
        const search = text.toLowerCase().trim();
        
        return userPlaylists.filter(playlist => {
            const name = playlist.name.toLowerCase();
            return name.includes(search);
        }).slice(0, 6);
    };

    return (
        <SearchElement 
            placeholder={placeholder} 
            searchFunc={searchFunc} 
            generateSnippets={generateSnippets} 
            handleSelect={handleSelect}
        />
    );
};

export default OwnSearch;