import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Search from '../search';
import Analytics from '../analytics';
import ToggleAuth from '../../components/toggle-auth/ToggleAuth';

import { reducer, WorkspaceContext } from '../../util/workspace-util';

const Dashboard = () => {
    const [workspace, dispatch] = useReducer(reducer, null);

    useEffect(() => {
        if (!localStorage.accessToken)
            window.location.replace('http://localhost:3000');
    }, []);

    const signOut = () => {
        const leave = window.confirm('Are you sure that you want to sign out?');

        if (leave) {
            localStorage.clear();
            window.location.replace('http://localhost:3000');
        }
    };

    return (
        <WorkspaceContext.Provider value={dispatch}>
            <ToggleAuth text='Sign Out' handleClick={signOut} />

            <Router>
                <Route 
                    path='/dashboard/search' 
                    render={props => <Search {...props} />}    
                />

                <Route
                    path='/dashboard/analytics'
                    render={props => <Analytics {...props} workspace={workspace} />}
                />
            </Router>
        </WorkspaceContext.Provider>
    );
};

export default Dashboard;