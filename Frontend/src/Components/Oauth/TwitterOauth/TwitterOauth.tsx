import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

import ErrorToast from '../../../Toast/Error';

import { AiOutlineTwitter } from 'react-icons/ai';

const TwitterOauth = () => {
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
                className="oauth-btn oauth-twitter"
                style={{ cursor: `${clicked} ? not-allowed : 'pointer'` }}
                onClick={handleSubmit}
            >
                <AiOutlineTwitter className="oauth-icon" />
                <span>Continue with Twitter</span>
            </button>
        </>
    );
};

export default TwitterOauth;
