import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

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
    const { userAuthState } = useAuthProvider();

    const toggleSearchMobile = () => {
        setSearchMobile(!searchMobile);
    };

    const handleShowMobile = () => {
        setShowMobile(!showMobile);
    };

    useEffect(() => {
        setProfilePhoto(userAuthState?.photo ?? '');
    }, [userAuthState]);

    return (
        <>
            <nav className="header-login-signup">
                <div className="search-icon" onClick={toggleSearchMobile}>
                    <FiSearch size={'1.7rem'} style={{ cursor: 'pointer' }} />
                </div>

                {userAuthState.login && (
                    <NavLink
                        to="/user/post/new"
                        className="header-signup-link header-post-link"
                    >
                        Create Post
                    </NavLink>
                )}

                {userAuthState.login && (
                    <NavLink
                        to="/user/notification"
                        className="notification-icon"
                    >
                        <FiBell size={'1.7rem'} style={{ cursor: 'pointer' }} />
                    </NavLink>
                )}

                {/* mobile icon  */}
                {userAuthState.login && (
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
                {userAuthState.login && (
                    <SideInfoDesktop
                        navbarOpen={navBarOpen}
                        setNavbarOpen={setNavbarOpen}
                    />
                )}

                {!userAuthState.login && (
                    <>
                        <NavLink to="/login" className="header-login-link">
                            Log in
                        </NavLink>
                        <NavLink to="/signup" className="header-signup-link">
                            Create Account
                        </NavLink>
                    </>
                )}
            </nav>
        </>
    );
};

export default NavBar;
