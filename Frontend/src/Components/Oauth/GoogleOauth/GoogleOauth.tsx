import { FcGoogle } from 'react-icons/fc';

const GoogleOauth = () => {
    const handleSubmit = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
    };

    return (
        <>
            <button className="oauth-btn oauth-google" onClick={handleSubmit}>
                <FcGoogle className="oauth-icon" />
                <span>Continue with Google</span>
            </button>
        </>
    );
};

export default GoogleOauth;
