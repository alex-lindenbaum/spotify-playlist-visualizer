import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Home, Setup, Dashboard } from  '../../pages';

const THEME = {
    primaryColor: '#c8134f',
    secondaryColor: '#333',
    textColor: '#ddd'
};

const App = () => {
    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <Route path='/' exact component={Home} />
                <Route path='/setup' component={Setup} />
                <Route path='/dashboard' component={Dashboard} />
            </Router>
        </ThemeProvider>
    );
};

export default App;