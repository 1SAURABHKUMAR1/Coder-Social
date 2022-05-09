import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

import ErrorToast from '../../../Toast/Error';

import { FcGoogle } from 'react-icons/fc';

const GoogleOauth = () => {
    const [clicked, setClicked] = useState(false);
    const { userAuthState, userAuthDispatch } = useAuthProvider();

    const navigate = useNavigate();

    useEffect(() => {
        if (userAuthState.login) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        ErrorToast('Coming Soon');
    };

    return (
        <>
            <button
                className="oauth-btn oauth-google"
                style={{ cursor: `${clicked} ? not-allowed : 'pointer'` }}
                onClick={handleSubmit}
            >
                <FcGoogle className="oauth-icon" />
                <span>Continue with Google</span>
            </button>
        </>
    );
};

export default GoogleOauth;
