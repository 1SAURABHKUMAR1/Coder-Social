import './About.css';

import { Link, useLocation } from 'react-router-dom';

import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

const About = () => {
    const { userAuthState } = useAuthProvider();
    const location = useLocation();

    return (
        <>
            <div className="home-sidebar-about">
                <div className="about-bold">
                    <span className="about-bold-highlight">Dev Social </span>
                    is community of amazing developers.
                </div>
                <p>
                    We're place where coders share their knowledge and stay up
                    to date and grow
                </p>
                {!userAuthState.login && (
                    <div className="about-login-signup">
                        <Link
                            to="/signup"
                            state={{ from: location.pathname }}
                            className="about-signup"
                        >
                            Create Account
                        </Link>
                        <Link
                            to="/login"
                            state={{ from: location.pathname }}
                            className="about-login"
                        >
                            Log in
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default About;
