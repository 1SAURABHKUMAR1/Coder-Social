import Axios from './http/axios';

import {
    getUserData as getUserDataProps,
    updateProfile as updateProfileProps,
} from '../Types';

const getUserData = ({ username, controller }: getUserDataProps) =>
    Axios.get(`/profile/${username}`, {
        signal: controller.signal,
    });

const getBookmark = (controller: AbortController) =>
    Axios.get('/user/readinglist', {
        signal: controller.signal,
    });

const getUserProfile = (controller: AbortController) =>
    Axios.get('/user/profile', {
        signal: controller.signal,
    });

const updateProfile = (userData: updateProfileProps) =>
    Axios.post('/profile/update', userData);

const deleteProfile = () => Axios.delete('/profile/delete');

const followUnfollowUser = (userId: string) => Axios.put(`/follow/${userId}`);

const getUserTag = (controller: AbortController) =>
    Axios.get(`/user/tag`, { signal: controller.signal });

const getUnreadNotifications = (controller: AbortController) =>
    Axios.get('/notification/unread', { signal: controller.signal });

const getAllNotifications = (controller: AbortController) =>
    Axios.get('/notification', { signal: controller.signal });

export {
    getUserData,
    getBookmark,
    getUserProfile,
    updateProfile,
    deleteProfile,
    followUnfollowUser,
    getUserTag,
    getUnreadNotifications,
    getAllNotifications,
};
