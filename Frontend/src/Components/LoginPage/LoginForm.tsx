import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FormState } from '../../Types';

import TextField from '../Shared/InputField/TextField';
import PasswordField from '../Shared/InputField/PasswordField';
import LoaderButton from '../Shared/Loader/LoaderButton';

import { useAuthProvider } from '../../Context/Auth/AuthProvider';
import Axios from '../../http/axios';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { userAuthState, userAuthDispatch } = useAuthProvider();

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const redirectedFrom = (location.state as FormState)?.from ?? '/';

    const handleLogin = async () => {
        try {
            setLoading(true);

            let { data } = await Axios.post('/login', {
                email,
                password,
            });

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
                setEmail('');
                setPassword('');
                setLoading(false);
                SuccessToast('Login Success');
            }, 1500);

            navigate(redirectedFrom, { replace: true });
        } catch (error) {
            if (error.response) {
                error.response.status === 403 &&
                    ErrorToast(error.response.data.message);
            } else {
                ErrorToast('Login Failed');
            }
            setLoading(false);
            console.log(error);
        }
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        email !== '' && password !== ''
            ? handleLogin()
            : ErrorToast('Fill All Details');
    };

    useEffect(() => {
        if (userAuthState.login) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="auth-form-component">
            <div className="auth-form-header">Log in</div>
            <form className="auth-form-fields">
                <TextField
                    htmlFor="email"
                    labelTitle="Email"
                    inputPlaceHolder="email@codersocial.dev"
                    inputId="email"
                    value={email}
                    setValue={setEmail}
                />
                <PasswordField value={password} setValue={setPassword} />
                {loading ? (
                    <LoaderButton />
                ) : (
                    <button className="button-primary" onClick={handleSubmit}>
                        Continue
                    </button>
                )}
                <div className="auth-forgot-password">
                    <Link to="/forgotpassword">Forgot Password</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
