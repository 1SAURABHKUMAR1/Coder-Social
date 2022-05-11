import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import SignupHeader from '../../Components/SignupPage/SignupHeader';
import OauthForm from '../../Components/Oauth/OauthForm';
import SignupForm from '../../Components/SignupPage/SignupForm';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import useScrollToTop from '../../Hooks/useScrollToTop';
import { FormState } from '../../Types';

const Signup = () => {
    useScrollToTop();

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
        <div className="component-center component">
            <div className=" auth-component">
                <SignupHeader />
                <OauthForm />
                <div className="form-seperation">Or</div>
                <SignupForm />
            </div>
        </div>
    );
};

export default Signup;
