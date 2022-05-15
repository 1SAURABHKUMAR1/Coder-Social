import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoaderButton from '../Shared/Loader/LoaderButton';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import Axios from '../../http/axios';

import { EditProfileInitalData } from '../../Types';
import DeleteAccountModal from './DeleteAccountModal';

const EditProfileButton = ({
    userIntialData,
    profilePhoto,
}: EditProfileInitalData) => {
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { userAuthState, userAuthDispatch } = useAuthProvider();
    const navigate = useNavigate();

    const handleEditProfile = async () => {
        try {
            setLoading(true);
            // extra -> bio , portfolio_link , work , skills , education , location , githubUrl, twitterUrl

            const { data } = await Axios.post('/profile/update', {
                name: userIntialData.name,
                email: userIntialData.email,
                user_ID: userAuthState.userId,
                username: userIntialData.username,
                photo:
                    profilePhoto !== userIntialData.photo
                        ? userIntialData.photo
                        : null,
                bio: userIntialData.bio !== '' ? userIntialData.bio : null,
                portfolio_link:
                    userIntialData.portfolio_link !== ''
                        ? userIntialData.portfolio_link
                        : null,
                work: userIntialData.work !== '' ? userIntialData.work : null,
                skills:
                    userIntialData.skills !== '' ? userIntialData.skills : null,
                education:
                    userIntialData.education !== ''
                        ? userIntialData.education
                        : null,
                location:
                    userIntialData.location !== ''
                        ? userIntialData.location
                        : null,
                githubUrl:
                    userIntialData.githubUrl !== ''
                        ? userIntialData.githubUrl
                        : null,
                twitterUrl:
                    userIntialData.twitterUrl !== ''
                        ? userIntialData.twitterUrl
                        : null,
            });

            userIntialData.photo !== profilePhoto &&
                data.success &&
                userAuthDispatch({
                    type: 'LOGIN',
                    payload: {
                        user_id: data.user.user_id,
                        name: data.user.name,
                        username: data.user.username,
                        email: data.user.email,
                        photo: data.user.profile_photo.secure_url,
                    },
                });

            setLoading(false);
            !data.success && ErrorToast(data.message);
            data.success && SuccessToast('Profile Updated');

            data.success &&
                setTimeout(() => {
                    navigate(`/user/profile/${data.user.username}`);
                }, 1000);
        } catch (error) {
            if (error.response?.data?.message as Error) {
                ErrorToast(error?.response?.data?.message);
            } else {
                ErrorToast('Profile Update Failed');
            }
            setLoading(false);
            console.log(error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        handleEditProfile();
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    return (
        <>
            <div className="button-secondary button-profile-show-more profile-sub-component button-width-full button-profile-subcomponent">
                {loading ? (
                    <LoaderButton />
                ) : (
                    <>
                        <DeleteAccountModal
                            showModal={showDeleteModal}
                            handleDeleteModal={handleShowDeleteModal}
                        />
                        <div className="button-filled-profile">
                            <button
                                className="button-primary profile-button"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                            <button
                                className="button-primary delete-button profile-button"
                                onClick={handleShowDeleteModal}
                            >
                                Delete Account
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default EditProfileButton;
