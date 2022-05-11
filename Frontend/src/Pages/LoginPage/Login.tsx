import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import LoginHeader from '../../Components/LoginPage/LoginHeader';
import OauthForm from '../../Components/Oauth/OauthForm';
import LoginForm from '../../Components/LoginPage/LoginForm';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import useScrollToTop from '../../Hooks/useScrollToTop';

import { FormState } from '../../Types';

const Login = () => {
    const { userAuthState } = useAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectedFrom = (location.state as FormState)?.from ?? '/';

    useScrollToTop();

    useEffect(() => {
        if (userAuthState.login) {
            navigate(redirectedFrom);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAuthState]);

    return (
        <div className="component component-center">
            <div className="auth-component">
                <LoginHeader />
                <OauthForm />
                <div className="form-seperation">Or</div>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
