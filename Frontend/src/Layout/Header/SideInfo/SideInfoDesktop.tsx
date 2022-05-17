import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuthProvider } from '../../../Context/Auth/AuthProvider';

import Axios from '../../../http/axios';

import SuccessToast from '../../../Toast/Success';

import { HeaderShortProps } from '../../../Types/index';

const SideInfoDesktop = ({ navbarOpen, setNavbarOpen }: HeaderShortProps) => {
    const { userAuthState, userAuthDispatch } = useAuthProvider();
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState('');

    const logoutUser = async () => {
        await Axios.get('/logout');

        userAuthDispatch({
            type: 'LOGOUT',
        });

        SuccessToast('Logout Success');

        setNavbarOpen?.(false);

        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    const NavHandle = () => {
        setNavbarOpen?.(!navbarOpen);
    };

    useEffect(() => {
        setProfilePhoto(userAuthState?.photo ?? '');
    }, [userAuthState]);

    return (
        <>
            <div className="sidenav-wrapper">
                <button
                    onClick={NavHandle}
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
                    className="sidenav-handler"
                    style={{ display: `${navbarOpen ? 'block' : 'none'}` }}
                    onClick={NavHandle}
                ></button>

                <div
                    className="sidenav-menu"
                    style={{ display: `${navbarOpen ? 'block' : 'none'}` }}
                >
                    <NavLink
                        to={`/user/profile/${userAuthState.username}`}
                        onClick={NavHandle}
                        className="sidenav-menu-items username-header"
                    >
                        <span>View Profile</span>
                        <span>@{userAuthState.username}</span>
                    </NavLink>

                    <NavLink
                        to="/user/profile/edit"
                        onClick={NavHandle}
                        className="sidenav-menu-items"
                    >
                        Edit Profile
                    </NavLink>

                    <NavLink
                        to="/user/profile/password"
                        onClick={NavHandle}
                        className="sidenav-menu-items"
                    >
                        Change Password
                    </NavLink>

                    <NavLink
                        to="/user/reading"
                        onClick={NavHandle}
                        className="sidenav-menu-items"
                    >
                        Reading List
                    </NavLink>

                    <NavLink
                        to="/"
                        className="sidenav-menu-items"
                        onClick={logoutUser}
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default SideInfoDesktop;
