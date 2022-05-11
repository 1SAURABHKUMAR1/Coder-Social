import { AiFillGithub } from 'react-icons/ai';

import SuccessToast from '../../../Toast/Success';

const GithubOauth = () => {
    const handleSubmit = () => {
        SuccessToast('Coming Soon');
    };

    return (
        <>
            <button className="oauth-btn oauth-github" onClick={handleSubmit}>
                <AiFillGithub className="oauth-icon" />
                <span>Continue with Github</span>
            </button>
        </>
    );
};

export default GithubOauth;
