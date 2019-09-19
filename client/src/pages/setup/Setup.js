import React, { useEffect } from 'react';
import qs from 'qs';

import SpotifyApi from '../../util/spotify-api';

const Setup = () => {
    useEffect(() => {
        const setupLocalStorage = async () => {
            const querystring = window.location.search.substr(1);
            const query = qs.parse(querystring);

            localStorage.setItem('accessToken', query.access_token);
            localStorage.setItem('refreshToken', query.refresh_token);
            localStorage.setItem('refreshTime', Date.now());

            const user = await SpotifyApi.getUserProfile();
            localStorage.setItem('displayName', user.display_name);
            localStorage.setItem('userId', user.id);

            window.location.replace('http://localhost:3000/dashboard/search');
        };

        setupLocalStorage();
    }, []);

    return (
        <div></div>
    );
};

export default Setup;