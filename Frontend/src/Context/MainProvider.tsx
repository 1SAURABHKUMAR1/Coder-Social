import { BrowserRouter as Router } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import { Children } from '../Types';
import { AuthProvider } from './Auth/AuthProvider';

const MainProvider = ({ children }: Children) => {
    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <AuthProvider>{children}</AuthProvider>
        </Router>
    );
};

export default MainProvider;
