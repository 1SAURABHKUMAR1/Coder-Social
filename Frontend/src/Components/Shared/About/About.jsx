import './About.css';

import { Link } from 'react-router-dom';

const About = () => {
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
                <div className="about-login-signup">
                    <Link to="/signup" className="about-signup">
                        Create Account
                    </Link>
                    <Link to="login" className="about-login">
                        Log in
                    </Link>
                </div>
            </div>
        </>
    );
};

export default About;
