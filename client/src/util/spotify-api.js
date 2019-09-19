import qs from 'qs';

const BASE_URL = 'https://api.spotify.com/v1';

const refreshTokenIfNecessary = async () => {
    const elapsedTime = (Date.now() - localStorage.refreshTime) / 1000 / 60;

    if (elapsedTime > 50) {
        const res = await fetch('http://localhost:5000/auth/refresh?refreshToken=' + localStorage.refreshToken);
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshTime', Date.now());
    }
};

export default {
    getUserProfile: async () => {
        const res = await fetch(BASE_URL + '/me', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken
            }
        });
        const data = await res.json();
    
        return data;
    },
    
    searchAlbumsPlaylists: async search => {
        if (search) {
            await refreshTokenIfNecessary();
        
            const querystring = qs.stringify({ q: search, type: 'album,playlist', limit: 6 });
            const res = await fetch(BASE_URL + '/search?' + querystring, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.accessToken
                }
            });
            const data = await res.json();
        
            return [data.albums.items, data.playlists.items];
        }

        return [[], []];
    },

    searchTracks: async search => {
        await refreshTokenIfNecessary();
    
        const querystring = qs.stringify({ q: search, type: 'track', limit: 6 });
        const res = await fetch(BASE_URL + '/search?' + querystring, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken
            }
        });
        const data = await res.json();
    
        return data.tracks.items;
    },
    
    getUserPlaylists: async () => {
        await refreshTokenIfNecessary();
    
        const res = await fetch(BASE_URL + '/me/playlists', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken
            }
        });
        const data = await res.json();
    
        return data.items;
    },
    
    getTracks: async ({ type, id }) => {
        await refreshTokenIfNecessary();

        const isAlbum = type === 'album';
        const limit = isAlbum ? '50' : '100';
    
        const res = await fetch(BASE_URL + '/' + type + 's/' + id + '/tracks?limit=' + limit, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken
            }
        });
        const data = await res.json();
        
        return isAlbum ? data.items : data.items.map(item => item.track);
    },
    
    getAudioFeatures: async idArray => {
        await refreshTokenIfNecessary();
    
        const ids = idArray.join();
        const res = await fetch(BASE_URL + '/audio-features?ids=' + ids, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken
            }
        });
        const data = await res.json();
    
        return data.audio_features;
    },
    
    createNewPlaylist: async (name, description) => {
        await refreshTokenIfNecessary();
    
        const res = await fetch(BASE_URL + '/users/' + localStorage.userId + '/playlists', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });
        
        return await res.json();
    },
    
    updatePlaylist: async (playlistId, uris) => {
        await refreshTokenIfNecessary();
    
        const res = await fetch(BASE_URL + '/playlists/' + playlistId + '/tracks', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + localStorage.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris })
        });
    
        return res.status;
    }
};