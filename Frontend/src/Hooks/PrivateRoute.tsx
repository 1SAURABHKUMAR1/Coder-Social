import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';

interface PrivateProp {
    element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateProp): JSX.Element => {
    const { login } = useAppSelector((state) => state.authenticate);
    const location = useLocation();

    if (login) {
        return <>{element}</>;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};

export default PrivateRoute;
