import React from 'react';

import SignupHeader from '../../Components/SignupPage/SignupHeader';
import OauthForm from '../../Components/Oauth/OauthForm';
import SignupForm from '../../Components/SignupPage/SignupForm';
import useScrollToTop from '../../Hooks/useScrollToTop';

const Signup = () => {
    useScrollToTop();

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
