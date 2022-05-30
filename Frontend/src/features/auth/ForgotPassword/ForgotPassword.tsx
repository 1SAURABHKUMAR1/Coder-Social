import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { useLocation, useNavigate } from 'react-router-dom';

import FormHeader from '../../../Components/FormHeader/FormHeader';

import TextField from '../../../Components/InputField/TextField';
import LoaderButton from '../../../Components/Loader/LoaderButton';

import { forgotPassword } from '../authSlice';

import useScrollToTop from '../../../Hooks/useScrollToTop';

import ErrorToast from '../../../Toast/Error';

import { FormState } from '../../../Types';

const ForgotPassword = () => {
    const { login, authState } = useAppSelector((state) => state.authenticate);

    const [email, setEmail] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectedFrom = (location.state as FormState)?.from ?? '/';

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        email !== ''
            ? dispatch(forgotPassword(email))
            : ErrorToast('Fill Email');
    };

    useScrollToTop();

    useEffect(() => {
        if (login) {
            navigate(redirectedFrom);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);

    return (
        <>
            <div className="component component-center component-justify">
                <div className="auth-component">
                    <FormHeader />
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
                                required={true}
                                key="email"
                            />
                            {authState === 'PENDING' ? (
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
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
