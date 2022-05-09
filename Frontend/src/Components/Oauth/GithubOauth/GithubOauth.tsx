import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

import ErrorToast from '../../../Toast/Error';
import { AiFillGithub } from 'react-icons/ai';

const GithubOauth = () => {
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
                className="oauth-btn oauth-github"
                style={{ cursor: `${clicked} ? not-allowed : 'pointer'` }}
                onClick={handleSubmit}
            >
                <AiFillGithub className="oauth-icon" />
                <span>Continue with Github</span>
            </button>
        </>
    );
};

export default GithubOauth;
