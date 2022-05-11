import { AiOutlineTwitter } from 'react-icons/ai';
import ErrorToast from '../../../Toast/Error';

const TwitterOauth = () => {
    const handleSubmit = () => {
        // window.open(`${process.env.REACT_APP_API_URL}/auth/twitter`, '_self');
        ErrorToast('Coming Soon');
    };

    return (
        <>
            <button className="oauth-btn oauth-twitter" onClick={handleSubmit}>
                <AiOutlineTwitter className="oauth-icon" />
                <span>Continue with Twitter</span>
            </button>
        </>
    );
};

export default TwitterOauth;
