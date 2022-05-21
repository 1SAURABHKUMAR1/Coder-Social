import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthProvider } from '../Context/Auth/AuthProvider';

interface PrivateProp {
    element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateProp): JSX.Element => {
    const {
        userAuthState: { login },
    } = useAuthProvider();
    const location = useLocation();

    if (login) {
        return <>{element}</>;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};

export default PrivateRoute;
