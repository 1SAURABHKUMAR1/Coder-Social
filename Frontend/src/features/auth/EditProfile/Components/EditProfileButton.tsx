import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import LoaderButton from '../../../../Components/Loader/LoaderButton';
import DeleteAccountModal from './DeleteAccountModal';

import { updateProfile as updateProfileType } from '../../../../Types';

import { setStateName, updateProfile } from '../../authSlice';

import ErrorToast from '../../../../Toast/Error';

const EditProfileButton = ({
    name,
    email,
    bio,
    education,
    githubUrl,
    location,
    photo,
    work,
    portfolio_link,
    skills,
    twitterUrl,
    user_ID,
    username,
}: updateProfileType) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dispatch = useAppDispatch();
    const {
        editProfileState,
        userId,
        username: stateUsername,
        photo: ProfilePhoto,
    } = useAppSelector((state) => state.authenticate);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        name !== '' && email !== '' && username !== ''
            ? dispatch(
                  updateProfile({
                      name: name,
                      email: email,
                      user_ID: userId,
                      username: username,
                      photo: photo !== ProfilePhoto ? photo : undefined,
                      bio: bio !== '' ? bio : undefined,
                      portfolio_link:
                          portfolio_link !== '' ? portfolio_link : undefined,
                      work: work !== '' ? work : undefined,
                      skills: skills !== '' ? skills : undefined,
                      education: education !== '' ? education : undefined,
                      location: location !== '' ? location : undefined,
                      githubUrl: githubUrl !== '' ? githubUrl : undefined,
                      twitterUrl: twitterUrl !== '' ? twitterUrl : undefined,
                  }),
              )
            : ErrorToast('Fill All Details');
    };

    useEffect(() => {
        if (editProfileState === 'FULFILLED') {
            dispatch(
                setStateName({
                    stateName: 'editProfileState',
                    stateValue: 'IDLE',
                }),
            );

            setTimeout(() => {
                navigate(`/user/profile/${stateUsername}`);
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editProfileState, stateUsername]);

    const handleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    return (
        <>
            <div className="button-secondary button-profile-show-more profile-sub-component button-width-full button-profile-subcomponent">
                {editProfileState === 'PENDING' ? (
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
                                data-testid="edit-profile-save-changes"
                            >
                                Save Changes
                            </button>
                            <button
                                className="button-primary delete-button profile-button"
                                data-testid="edit-profile-delete-account"
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
