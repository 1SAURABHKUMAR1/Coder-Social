import { useEffect } from 'react';
import { useAppSelector } from '../../../store/hooks';

import { useLocation, useNavigate } from 'react-router-dom';

import OauthForm from '../../../Components/Oauth/OauthForm';
import FormHeader from '../../../Components/FormHeader/FormHeader';

import LoginForm from './LoginForm';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import { FormState } from '../../../Types';

const Login = () => {
    useScrollToTop();

    const { login } = useAppSelector((state) => state.authenticate);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectedFrom = (location.state as FormState)?.from ?? '/';

    useEffect(() => {
        if (login) {
            navigate(redirectedFrom, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);

    return (
        <div className="component component-center">
            <div className="auth-component">
                <FormHeader />
                <OauthForm />
                <div className="form-seperation">Or</div>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
