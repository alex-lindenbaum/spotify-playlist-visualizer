import React from 'react';

import SearchElement from '../../components/search/search-element';
import SpotifyApi from '../../util/spotify-api';

const placeholder = 'Search...';

const searchFunc = async text => {
    const res = await SpotifyApi.searchAlbumsPlaylists(text);
    return res[0];
}
    
const generateSnippets = albums => {
    return albums.map(album => ({
        title: album.name,
        owner: album.artists.map(artist => artist.name).join(', '),
        img: album.images[0].url
    }));
};

const AlbumSearch = ({ handleSelect }) => {
    return (
        <SearchElement 
            placeholder={placeholder} 
            searchFunc={searchFunc} 
            generateSnippets={generateSnippets} 
            handleSelect={handleSelect}
        />
    );
};

export default AlbumSearch;