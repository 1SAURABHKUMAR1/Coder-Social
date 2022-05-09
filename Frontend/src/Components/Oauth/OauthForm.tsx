import './OauthForm.css';

import GoogleOauth from './GoogleOauth/GoogleOauth';
import GithubOauth from './GithubOauth/GithubOauth';
import TwitterOauth from './TwitterOauth/TwitterOauth';

const OauthForm = () => {
    return (
        <>
            <div className="oauth-form">
                <GoogleOauth />
                <GithubOauth />
                <TwitterOauth />
            </div>
        </>
    );
};

export default OauthForm;
