import { BrowserRouter as Router } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './Auth/AuthProvider';

import { Children } from '../Types';

const MainProvider = ({ children }: Children) => {
    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <AuthProvider>{children}</AuthProvider>
        </Router>
    );
};

export default MainProvider;
