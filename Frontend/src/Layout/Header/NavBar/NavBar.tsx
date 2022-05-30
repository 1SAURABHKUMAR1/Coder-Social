import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { NavLink, useLocation } from 'react-router-dom';

import SideInfoDesktop from '../SideInfo/SideInfoDesktop';

import { FiBell, FiSearch } from 'react-icons/fi';

import { NavBarProps } from '../../../Types';

const NavBar = ({
    searchMobile,
    setSearchMobile,
    showMobile,
    setShowMobile,
}: NavBarProps) => {
    const [navBarOpen, setNavbarOpen] = useState(false);

    const [profilePhoto, setProfilePhoto] = useState('');
    const location = useLocation();
    const { photo, login } = useAppSelector((state) => state.authenticate);

    const toggleSearchMobile = () => {
        setSearchMobile(!searchMobile);
    };

    const handleShowMobile = () => {
        setShowMobile(!showMobile);
    };

    useEffect(() => {
        setProfilePhoto(photo ?? '');
    }, [photo]);

    return (
        <>
            <nav className="header-login-signup">
                <div className="search-icon" onClick={toggleSearchMobile}>
                    <FiSearch size={'1.7rem'} style={{ cursor: 'pointer' }} />
                </div>

                {photo && (
                    <NavLink
                        to="/post/new"
                        className="header-signup-link header-post-link"
                    >
                        Create Post
                    </NavLink>
                )}

                {login && (
                    <NavLink
                        to="/user/notification"
                        className="notification-icon"
                    >
                        <FiBell size={'1.7rem'} style={{ cursor: 'pointer' }} />
                    </NavLink>
                )}

                {/* mobile icon  */}
                {photo && (
                    <div className="sidenav-mobile-wrapper">
                        <button
                            onClick={handleShowMobile}
                            type="button"
                            className="sidenav-button"
                        >
                            <img
                                src={profilePhoto}
                                alt="avatar"
                                className="image"
                                loading="lazy"
                            />
                        </button>
                        <button
                            tabIndex={-1}
                            className=".sidenav-handler"
                            onClick={handleShowMobile}
                        ></button>
                    </div>
                )}

                {/* desktop icon and settings  */}
                {photo && (
                    <SideInfoDesktop
                        navbarOpen={navBarOpen}
                        setNavbarOpen={setNavbarOpen}
                    />
                )}

                {!photo && (
                    <>
                        <NavLink
                            to="/login"
                            state={{ from: location.pathname }}
                            className="header-login-link"
                        >
                            Log in
                        </NavLink>
                        <NavLink
                            to="/signup"
                            state={{ from: location.pathname }}
                            className="header-signup-link"
                        >
                            Create Account
                        </NavLink>
                    </>
                )}
            </nav>
        </>
    );
};

export default NavBar;
