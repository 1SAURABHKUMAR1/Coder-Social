import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { NavLink, useLocation } from 'react-router-dom';

import SideInfoDesktop from '../SideInfo/SideInfoDesktop';

import { FiBell, FiSearch } from 'react-icons/fi';

import { NavBarProps } from '../../../Types';

import {
    addNewNotification,
    getUnreadNotifications,
} from '../../../features/index';

import { socket } from '../../../Services/http/socket';

const NavBar = ({
    searchMobile,
    setSearchMobile,
    setShowMobile,
}: NavBarProps) => {
    const [navBarOpen, setNavbarOpen] = useState(false);

    const [profilePhoto, setProfilePhoto] = useState('');
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { photo, login } = useAppSelector((state) => state.authenticate);
    const { notifications } = useAppSelector((state) => state.socket);

    const toggleSearchMobile = useCallback(() => {
        setSearchMobile(!searchMobile);
    }, [searchMobile, setSearchMobile]);

    const handleShowMobile = useCallback(() => {
        setShowMobile((prev) => !prev);
    }, [setShowMobile]);

    useEffect(() => {
        setProfilePhoto(photo ?? '');
    }, [photo]);

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(getUnreadNotifications({ controller, unMounted }));

        return () => {
            unMounted = true;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on('newNotification', (data) => {
            dispatch(addNewNotification(data));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <nav className="header-login-signup">
                <div className="search-icon" onClick={toggleSearchMobile}>
                    <FiSearch size={'1.7rem'} style={{ cursor: 'pointer' }} />
                </div>

                {login && photo && (
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
                        data-testid="notification-icon"
                    >
                        <FiBell size={'1.7rem'} style={{ cursor: 'pointer' }} />
                        {notifications.length !== 0 && (
                            <span className="bell-navbar">
                                <span className="bell-navbar-text">
                                    {notifications.length}
                                </span>
                            </span>
                        )}
                    </NavLink>
                )}

                {/* mobile icon  */}
                {login && photo && (
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
                            />
                        </button>
                    </div>
                )}

                {/* desktop icon and settings  */}
                {login && photo && (
                    <SideInfoDesktop
                        navbarOpen={navBarOpen}
                        setNavbarOpen={setNavbarOpen}
                    />
                )}

                {!photo && !login && (
                    <>
                        <NavLink
                            to="/login"
                            data-testid="log-in-button-header"
                            state={{ from: location.pathname }}
                            className="header-login-link"
                        >
                            Log in
                        </NavLink>
                        <NavLink
                            to="/signup"
                            data-testid="sign-up-button-header"
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
