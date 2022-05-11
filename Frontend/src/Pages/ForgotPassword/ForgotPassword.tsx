import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ForgotPasswordForm from '../../Components/ForgotPasswordPage/ForgotPasswordForm';
import LoginHeader from '../../Components/LoginPage/LoginHeader';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import useScrollToTop from '../../Hooks/useScrollToTop';
import { FormState } from '../../Types';

const ForgotPassword = () => {
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
        <>
            <div className="component component-center component-justify">
                <div className="auth-component">
                    <LoginHeader />
                    <ForgotPasswordForm />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
