import React from 'react';

import SearchElement from '../../components/search/search-element';
import SpotifyApi from '../../util/spotify-api';

const placeholder = 'Search...';

const searchFunc = async text => {
    const res = await SpotifyApi.searchAlbumsPlaylists(text);
    return res[1];
}
    
const generateSnippets = playlists => {
    return playlists.map(playlist => ({
        title: playlist.name,
        owner: playlist.owner.display_name,
        img: playlist.images[0].url
    }));
};

const PlaylistSearch = ({ handleSelect }) => {
    return (
        <SearchElement 
            placeholder={placeholder} 
            searchFunc={searchFunc} 
            generateSnippets={generateSnippets} 
            handleSelect={handleSelect}
        />
    );
};

export default PlaylistSearch;