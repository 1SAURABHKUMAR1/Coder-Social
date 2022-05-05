import './LeftSideBar.css';

import About from '../../Shared/About/About';

import { Link } from 'react-router-dom';

import { FcHome, FcAbout, FcReading, FcSupport } from 'react-icons/fc';
import { FaGithub, FaLinkedin, FaTags, FaTwitter } from 'react-icons/fa';

const LeftSideBar = () => {
    return (
        <>
            <div className="sidebar-left">
                <About />
                <ul className="home-sidebar-tags">
                    <li className="list-item hover-list-home">
                        <Link to="/">
                            <i>
                                <FcHome />
                            </i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="list-item hover-list-home">
                        <Link to="/user/readinglist">
                            <i>
                                <FcReading />
                            </i>
                            <span>Reading List</span>
                        </Link>
                    </li>
                    <li className="list-item hover-list-home">
                        <Link to="/tags">
                            <i>
                                <FaTags />
                            </i>
                            <span>Tags</span>
                        </Link>
                    </li>
                    <li className="list-item hover-list-home">
                        <Link to="/about">
                            <i>
                                <FcAbout />
                            </i>
                            <span>About</span>
                        </Link>
                    </li>
                    <li className="list-item hover-list-home">
                        <Link to="/support">
                            <i>
                                <FcSupport />
                            </i>
                            <span>Support</span>
                        </Link>
                    </li>
                </ul>
                <div className="home-socials">
                    <a href="/" target="_blank" className="home-socials-single">
                        <FaTwitter className="icons-home" />
                    </a>
                    <a href="/" target="_blank" className="home-socials-single">
                        <FaGithub className="icons-home" />
                    </a>
                    <a href="/" target="_blank" className="home-socials-single">
                        <FaLinkedin className="icons-home" />
                    </a>
                </div>
            </div>
        </>
    );
};

export default LeftSideBar;
