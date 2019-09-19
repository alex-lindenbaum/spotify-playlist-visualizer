import React, { useEffect } from 'react';

import ToggleAuth from '../../components/toggle-auth/ToggleAuth';

const Home = () => {
    const signIn = () => window.location.replace('http://localhost:5000/auth/signin');

    useEffect(() => {
        if (localStorage.accessToken)
            window.location.replace('http://localhost:3000/dashboard/search');
    }, []);

    return (
        <ToggleAuth text='Sign In' handleClick={signIn} />
    );
};

export default Home;