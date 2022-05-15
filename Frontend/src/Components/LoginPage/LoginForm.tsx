import { useState } from 'react';
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

    const { userAuthDispatch } = useAuthProvider();

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

            userAuthDispatch({
                type: 'LOGIN',
                payload: {
                    user_id: data?.user.user_id,
                    username: data?.user.username,
                    name: data?.user.name,
                    email: data?.user.email,
                    photo: data?.user.profile_photo.secure_url,
                },
            });

            setTimeout(() => {
                setEmail('');
                setPassword('');
                setLoading(false);
                SuccessToast('Login Success');
            }, 1500);

            navigate(redirectedFrom, { replace: true });
        } catch (error) {
            if (error.response?.data as Error) {
                ErrorToast(error?.response?.data?.message);
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
                    required={true}
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
