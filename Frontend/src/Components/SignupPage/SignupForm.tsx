import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import TextField from '../Shared/InputField/TextField';
import PasswordField from '../Shared/InputField/PasswordField';
import LoaderButton from '../Shared/Loader/LoaderButton';
import SetAvatar from './SetAvatar/SetAvatar';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';

import Axios from '../../http/axios';
import { FormState } from '../../Types';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

const avatar = require('../../Data/images/avatar.jpg');

const SignupForm = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [profilePhoto, setProfilePhoto] = useState(avatar);

    const [loading, setLoading] = useState(false);

    const { userAuthState, userAuthDispatch } = useAuthProvider();

    const navigate = useNavigate();
    const location = useLocation();
    const redirectedFrom = (location.state as FormState)?.from ?? '/';

    const handleSignup = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('name', fullName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('photo', profilePhoto);

            const { data } = await Axios.post('/signup', formData);

            setTimeout(() => {
                userAuthDispatch({
                    type: 'LOGIN',
                    payload: {
                        user_id: data?.user.user_id,
                        name: data?.user.name,
                        email: data?.user.email,
                        photo: data?.user.profile_photo.secure_url,
                    },
                });

                setFullName('');
                setEmail('');
                setPassword('');
                setProfilePhoto(avatar);
                setLoading(false);
                SuccessToast('Login Success');
            }, 1500);

            navigate(redirectedFrom, { replace: true });
        } catch (error) {
            if (error.response as Error) {
                error.response.status === 403 &&
                    ErrorToast(error.response.data.message);
            } else {
                ErrorToast('Signup Failed');
            }

            setLoading(false);
            setProfilePhoto(avatar);
        }
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (
            email !== '' &&
            password !== '' &&
            fullName !== '' &&
            profilePhoto !== avatar
        ) {
            handleSignup();
        } else {
            ErrorToast('Fill All Details');
        }
    };

    useEffect(() => {
        if (userAuthState.login) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="auth-form-component">
                <div className="auth-form-header">Create New Account</div>
                <form className="auth-form-fields">
                    <TextField
                        htmlFor="name"
                        labelTitle="Full Name"
                        inputPlaceHolder="Coder social"
                        inputId="name"
                        value={fullName}
                        setValue={setFullName}
                    />
                    <TextField
                        htmlFor="email"
                        labelTitle="Email"
                        inputPlaceHolder="email@codersocial.dev"
                        inputId="email"
                        value={email}
                        setValue={setEmail}
                    />
                    <SetAvatar
                        image={profilePhoto}
                        setImage={setProfilePhoto}
                    />
                    <PasswordField value={password} setValue={setPassword} />
                    {loading ? (
                        <LoaderButton />
                    ) : (
                        <button
                            className="button-primary"
                            onClick={handleSubmit}
                        >
                            Create Account
                        </button>
                    )}
                    <Link to="/login" className="button-secondary">
                        Log in
                    </Link>
                </form>
            </div>
        </>
    );
};

export default SignupForm;
