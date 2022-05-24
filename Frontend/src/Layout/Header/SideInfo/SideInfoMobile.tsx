import { NavLink } from 'react-router-dom';

import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

import Axios from '../../../http/axios';

import SuccessToast from '../../../Toast/Success';

import { HeaderShortProps } from '../../../Types';

const SideInfoMobile = ({ navbarOpen, handleShowMenu }: HeaderShortProps) => {
    const { userAuthState, userAuthDispatch } = useAuthProvider();

    const logoutUser = async () => {
        await Axios.get('/logout');

        userAuthDispatch({
            type: 'LOGOUT',
        });

        handleShowMenu?.();

        SuccessToast('Logout Success');
    };

    return (
        <>
            {navbarOpen && (
                <div className="sidenav-mobile-wrapper">
                    <div className="sidenav-mobile-menu">
                        <div
                            className="sidenav--mobile-menu"
                            style={{
                                display: `${navbarOpen ? 'block' : 'none'}`,
                            }}
                        >
                            <NavLink
                                to={`/user/profile/${userAuthState.username}`}
                                onClick={handleShowMenu}
                                className="sidenav-mobile-menu-items username-header"
                            >
                                <span>View Profile</span>
                                <span>@{userAuthState.username}</span>
                            </NavLink>

                            <NavLink
                                to="/user/profile/edit"
                                onClick={handleShowMenu}
                                className="sidenav-mobile-menu-items"
                            >
                                Edit Profile
                            </NavLink>

                            <NavLink
                                to="/user/profile/password"
                                onClick={handleShowMenu}
                                className="sidenav-menu-items"
                            >
                                Change Password
                            </NavLink>

                            <NavLink
                                to="/post/new"
                                onClick={handleShowMenu}
                                className="sidenav-mobile-menu-items"
                            >
                                Create new Post
                            </NavLink>

                            <NavLink
                                to="/user/readinglist"
                                onClick={handleShowMenu}
                                className="sidenav-mobile-menu-items"
                            >
                                Reading List
                            </NavLink>

                            <NavLink
                                to="/"
                                className="sidenav-mobile-menu-items"
                                onClick={logoutUser}
                            >
                                Logout
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SideInfoMobile;
