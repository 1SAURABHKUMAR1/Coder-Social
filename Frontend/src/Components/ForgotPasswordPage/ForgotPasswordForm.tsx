import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '../Shared/InputField/TextField';
import LoaderButton from '../Shared/Loader/LoaderButton';

import Axios from '../../http/axios';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            setLoading(true);

            await Axios.post('/forgotpassword', {
                email,
            });

            setEmail('');
            SuccessToast('Email Sent Successfull');
            setLoading(false);
            navigate('/');
        } catch (error) {
            if (error.response as Error) {
                error.response.status === 401 &&
                    ErrorToast(error.response.data.message);
            } else {
                ErrorToast('Email Sent Failed');
            }
            setEmail('');
            setLoading(false);
            console.log(error);
        }
    };

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        email !== '' ? handleForgotPassword() : ErrorToast('Fill Your Email');
    };

    return (
        <>
            <div className="auth-form-component">
                <div className=" forgot-header auth-form-header">
                    Forgot Password?
                </div>
                <form className="auth-form-fields">
                    <TextField
                        htmlFor="email"
                        inputId="email"
                        inputPlaceHolder="Enter your email..."
                        labelTitle="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    {loading ? (
                        <LoaderButton />
                    ) : (
                        <button
                            className="button-primary"
                            onClick={handleSubmit}
                        >
                            Continue
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default ForgotPasswordForm;
