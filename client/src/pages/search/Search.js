import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import AlbumSearch from '../../containers/album-search';
import PlaylistSearch from '../../containers/playlist-search';
import OwnSearch from '../../containers/own-search';
import Button from '../../components/button';

import { WorkspaceContext, createWorkspace } from '../../util/workspace-util';

const Container = styled.div`
    display: block;
    width: 400px;
    margin: 75px auto 0px auto;
    text-align: center;
    transition: opacity 500ms ease-in-out;
`;

const H2 = styled.h2`
    color: ${props => props.theme.textColor};
    float: ${props => props.left ? 'left' : 'none'};
`;

const SearchButton = styled(Button)`
    display: block;
    margin: 30px auto;
    width: 350px;
`;

const BackButton = styled(Button)`
    float: right;
    margin-bottom: 20px;
`;

const Search = () => {
    const dispatch = useContext(WorkspaceContext);

    const [searchParam, setSearchParam] = useState('');
    const [opacity, setOpacity] = useState('0.0');

    const goTo = param => {
        setOpacity('0.0');
        setTimeout(() => {
            setSearchParam(param);
            
            if (param !== 'analytics')
                setOpacity('1.0');
        }, 500);
    };

    const view = (text, component) => (
        <>
            <H2 left>{text}</H2>
            <BackButton small onClick={() => goTo('')}>Go Back</BackButton>
            {component}
        </>
    );

    const select = async metadata => {
        const workspace = await createWorkspace(metadata);
        dispatch({ type: 'CREATE', workspace});
        goTo('analytics');
    }

    const newPlaylist = async () => {
        const workspace = await createWorkspace([]);
        dispatch({ type: 'CREATE', workspace});
        goTo('analytics');
    }

    const presentComponent = () => {
        switch (searchParam) {
            case 'album':
                return view('Search by... Albums', <AlbumSearch handleSelect={res => select(res)} />);

            case 'playlist':
                return view('Search by... Playlists', <PlaylistSearch handleSelect={res => select(res)} />);
    
            case 'userplaylist':
                return view('Search Your Playlists', <OwnSearch handleSelect={res => select(res)} />);

            case 'analytics':
                return <Redirect to='/dashboard/analytics' />
        
            default:
                return (
                    <>
                        <H2>How do you want to set up your environment?</H2>
                        <SearchButton primary onClick={() => goTo('album')}>Search Albums</SearchButton>
                        <SearchButton primary onClick={() => goTo('playlist')}>Search Playlists</SearchButton>
                        <SearchButton primary onClick={() => goTo('userplaylist')}>Search My Saved</SearchButton>
                        <H2>or</H2>
                        <SearchButton primary onClick={newPlaylist}>Create A New Playlist</SearchButton>
                    </>
                );
        }
    }

    useEffect(() => {
        setOpacity('1.0');
    }, []);

    return (
        <Container style={{ opacity }}>
            {presentComponent()}
        </Container>
    );
};

export default Search;