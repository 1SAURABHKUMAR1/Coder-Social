import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';

import PasswordField from '../../../Components/InputField/PasswordField';
import LoaderButton from '../../../Components/Loader/LoaderButton';

import ErrorToast from '../../../Toast/Error';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import { setStateName, updatePassword } from '../authSlice';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { authState } = useAppSelector((state) => state.authenticate);

    useScrollToTop();

    const handleChangePassword = () => {
        dispatch(updatePassword({ oldPassword, newPassword }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        newPassword !== ''
            ? oldPassword !== '' && handleChangePassword()
            : ErrorToast('Fill All Details!');
    };

    useEffect(() => {
        if (authState === 'FULFILLED') {
            dispatch(
                setStateName({
                    stateName: 'authState',
                    stateValue: 'IDLE',
                }),
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);

    return (
        <>
            <main className="component component-center component-justify">
                <form
                    className="auth-component"
                    data-testid="change-password-form"
                >
                    <div className="profile-edit-form-header">
                        Change Password
                    </div>
                    <div className="auth-form-fields change-password-password-field">
                        <PasswordField
                            value={oldPassword}
                            setValue={setOldPassword}
                            required={true}
                            label="Old Password"
                            htmlFor="old-password"
                            id="old-password"
                            autoFill={'off'}
                        />
                        <PasswordField
                            value={newPassword}
                            setValue={setNewPassword}
                            required={false}
                            label="New Password"
                            htmlFor="new-password"
                            id="new-password"
                            autoFill={'off'}
                        />
                    </div>
                    <div className="button-margin-2rem">
                        {authState === 'PENDING' ? (
                            <LoaderButton />
                        ) : (
                            <button
                                className="button-primary"
                                onClick={handleSubmit}
                                data-testid="change-password-button"
                            >
                                Change Password
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </>
    );
};

export default ChangePassword;
