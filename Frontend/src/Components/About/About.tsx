import './About.css';

import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

const About = () => {
    const { login } = useAppSelector((state) => state.authenticate);

    const location = useLocation();

    return (
        <>
            <div className="home-sidebar-about" data-testid="home-about">
                <div className="about-bold">
                    <span className="about-bold-highlight">Coder Social </span>
                    is community of amazing developers.
                </div>
                <p>
                    We're place where coders share their knowledge and stay up
                    to date and grow
                </p>
                {!login && (
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
