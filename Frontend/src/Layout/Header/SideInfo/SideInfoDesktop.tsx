import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { NavLink } from 'react-router-dom';

import Axios from '../../../Services/http/axios';

import SuccessToast from '../../../Toast/Success';

import {
    logoutUser as logoutUserData,
    logoutUserPost,
    logoutUserSearch,
    logoutUserSingle,
    logoutUserSocket,
    logoutUserTags,
} from '../../../features';

import { HeaderShortProps } from '../../../Types/index';

const SideInfoDesktop = ({ navbarOpen, setNavbarOpen }: HeaderShortProps) => {
    const { username, photo, login } = useAppSelector(
        (state) => state.authenticate,
    );
    const dispatch = useAppDispatch();

    const [profilePhoto, setProfilePhoto] = useState('');

    const logoutUser = async () => {
        await Axios.get('/logout');

        dispatch(logoutUserData());
        dispatch(logoutUserPost());
        dispatch(logoutUserSearch());
        dispatch(logoutUserSingle());
        dispatch(logoutUserSocket());
        dispatch(logoutUserTags());

        SuccessToast('Logout Success');

        setNavbarOpen?.(false);
    };

    const NavHandle = () => {
        setNavbarOpen?.(!navbarOpen);
    };

    useEffect(() => {
        setProfilePhoto(photo ?? '');
    }, [login, photo]);

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
                        to={`/user/profile/${username}`}
                        onClick={NavHandle}
                        className="sidenav-menu-items username-header"
                    >
                        <span>View Profile</span>
                        <span>@{username}</span>
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
                        to="/user/readinglist"
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
