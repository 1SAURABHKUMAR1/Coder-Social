import { useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import TextField from '../Shared/InputField/TextField';
import PasswordField from '../Shared/InputField/PasswordField';
import LoaderButton from '../Shared/Loader/LoaderButton';
import SetAvatar from '../Shared/InputField/SetAvatar/SetAvatar';

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

    const { userAuthDispatch } = useAuthProvider();

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

            userAuthDispatch({
                type: 'LOGIN',
                payload: {
                    user_id: data?.user.user_id,
                    username: data?.user.username,
                    name: data?.user.name,
                    email: data?.user.email,
                    photo: data?.user.profile_photo.secure_url,
                    id: data?.user._id,
                },
            });

            setTimeout(() => {
                setFullName('');
                setEmail('');
                setPassword('');
                setProfilePhoto(avatar);
                setLoading(false);
                SuccessToast('Login Success');
            }, 1500);

            navigate(redirectedFrom, { replace: true });
        } catch (error) {
            if (error.response?.data as Error) {
                ErrorToast(error?.response?.data?.message);
            } else {
                ErrorToast('Signup Failed');
            }

            setLoading(false);
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
                        required={true}
                        key="name"
                    />
                    <TextField
                        htmlFor="email"
                        labelTitle="Email"
                        inputPlaceHolder="email@codersocial.dev"
                        inputId="email"
                        value={email}
                        setValue={setEmail}
                        required={true}
                        key="email"
                    />
                    <SetAvatar
                        image={profilePhoto}
                        setImage={setProfilePhoto}
                    />
                    <PasswordField
                        value={password}
                        setValue={setPassword}
                        required={true}
                        label="Password"
                    />
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
