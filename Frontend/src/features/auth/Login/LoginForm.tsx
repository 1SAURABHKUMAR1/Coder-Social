import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Link } from 'react-router-dom';

import PasswordField from '../../../Components/InputField/PasswordField';
import TextField from '../../../Components/InputField/TextField';

import LoaderButton from '../../../Components/Loader/LoaderButton';

import { loginUser } from '../../index';

import ErrorToast from '../../../Toast/Error';

import { useLoginHandler } from '../../index';

const LoginForm = () => {
    const { authState } = useAppSelector((state) => state.authenticate);

    const { loginData, loginDispatch } = useLoginHandler();
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        loginData.email !== '' && loginData.password !== ''
            ? dispatch(
                  loginUser({
                      email: loginData.email,
                      password: loginData.password,
                  }),
              )
            : ErrorToast('Fill All Details');
    };

    const handleChange = (name: string, event: React.FormEvent) => {
        loginDispatch({
            // @ts-ignore
            type: `INPUT_${name.toUpperCase()}`,
            payload: (event.target as HTMLButtonElement).value,
        });
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
                    value={loginData.email}
                    handleFunction={handleChange}
                    required={true}
                    key="email"
                />
                <PasswordField
                    value={loginData.password}
                    handleFunction={handleChange}
                    required={true}
                    label="Password"
                />
                {authState === 'PENDING' ? (
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
