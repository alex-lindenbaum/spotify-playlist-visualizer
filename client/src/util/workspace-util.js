import React from 'react';

import SpotifyApi from './spotify-api';

const FEATURE_KEYS = [
    'acousticness',
    'danceability',
    'duration_ms',
    'energy',
    'instrumentalness',
    'key',
    'liveness',
    'loudness',
    'mode',
    'speechiness',
    'tempo',
    'time_signature',
    'valence'
];

export const createWorkspace = async metadata => {
    let audioFeatures = {};

    if (metadata.length === 0) {
        FEATURE_KEYS.forEach(key => audioFeatures[key] = []);
        return { metadata, tracks: [], audioFeatures };
    }

    const tracks = await SpotifyApi.getTracks(metadata);
    const trackIds = tracks.map(track => track.id);
    const trackFeaturesArray = await SpotifyApi.getAudioFeatures(trackIds);

    FEATURE_KEYS.forEach(key => {
        audioFeatures[key] = trackFeaturesArray.map(trackFeatures => trackFeatures[key]);
    });

    localStorage.setItem('workspaceMetadata', JSON.stringify(metadata));

    return { metadata, tracks, audioFeatures };
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE':
            return action.workspace;
        
        default:
            throw new Error('Unexpected use of workspace reducer');
    }
};

export const WorkspaceContext = React.createContext();