import { Link } from 'react-router-dom';

import About from '../../../Components/Shared/About/About';

import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

import { FaGithub, FaLinkedin, FaTags, FaTwitter } from 'react-icons/fa';
import { FcAbout, FcHome, FcReading, FcSupport } from 'react-icons/fc';
import { GrClose } from 'react-icons/gr';

import { AsideProps } from '../../../Types';

const MobileAside = ({ showAside, handleToggleAside }: AsideProps) => {
    const {
        userAuthState: { login },
    } = useAuthProvider();

    return (
        <>
            <aside
                className="mobile-side-drawer"
                style={{ display: `${showAside ? 'block' : 'none'}` }}
            >
                <div className="mobile-side-drawer-content">
                    <div className="mobile-side-drawer-top">
                        <h3>Coder Social</h3>
                        <i>
                            <GrClose onClick={handleToggleAside} />
                        </i>
                    </div>
                    <div className="mobile-side-drawer-left">
                        <About />
                        <ul className="home-sidebar-tags mobile-side-drawer-list">
                            <li className="list-item hover-list-home">
                                <Link to="/" onClick={handleToggleAside}>
                                    <i>
                                        <FcHome />
                                    </i>
                                    <span>Home</span>
                                </Link>
                            </li>
                            {login && (
                                <li className="list-item hover-list-home">
                                    <Link
                                        to="/user/readinglist"
                                        onClick={handleToggleAside}
                                    >
                                        <i>
                                            <FcReading />
                                        </i>
                                        <span>Reading List</span>
                                    </Link>
                                </li>
                            )}
                            <li className="list-item hover-list-home">
                                <Link to="/tags" onClick={handleToggleAside}>
                                    <i>
                                        <FaTags />
                                    </i>
                                    <span>Tags</span>
                                </Link>
                            </li>
                            <li className="list-item hover-list-home">
                                <Link to="/about" onClick={handleToggleAside}>
                                    <i>
                                        <FcAbout />
                                    </i>
                                    <span>About</span>
                                </Link>
                            </li>
                            <li className="list-item hover-list-home">
                                <Link to="/support" onClick={handleToggleAside}>
                                    <i>
                                        <FcSupport />
                                    </i>
                                    <span>Support</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="home-socials mobile-side-drawer-socials">
                            <a
                                href="/"
                                target="_blank"
                                className="home-socials-single"
                            >
                                <FaTwitter className="icons-home" />
                            </a>
                            <a
                                href="/"
                                target="_blank"
                                className="home-socials-single"
                            >
                                <FaGithub className="icons-home" />
                            </a>
                            <a
                                href="/"
                                target="_blank"
                                className="home-socials-single"
                            >
                                <FaLinkedin className="icons-home" />
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default MobileAside;
