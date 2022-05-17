import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import PasswordField from '../../Components/Shared/InputField/PasswordField';
import LoaderButton from '../../Components/Shared/Loader/LoaderButton';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import Axios from '../../http/axios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            setLoading(true);
            const { data } = await Axios.post('/password/update', {
                oldPassword,
                newPassword,
            });

            setLoading(false);
            data.success && SuccessToast('Password Changed !');
            data.success &&
                setTimeout(() => {
                    navigate(`/`);
                }, 1000);
        } catch (error) {
            ErrorToast('Failed!');

            setLoading(false);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        newPassword !== ''
            ? oldPassword !== '' && handleChangePassword()
            : ErrorToast('Fill All Details!');
    };

    return (
        <>
            <main className="component component-center component-justify">
                <form className="auth-component">
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
                        {loading ? (
                            <LoaderButton />
                        ) : (
                            <button
                                className="button-primary"
                                onClick={handleSubmit}
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
