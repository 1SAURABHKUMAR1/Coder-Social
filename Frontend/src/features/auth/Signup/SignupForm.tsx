import { useSignupHandler } from '../../index';
import { Link } from 'react-router-dom';

import PasswordField from '../../../Components/InputField/PasswordField';
import SetAvatar from '../../../Components/InputField/SetAvatar/SetAvatar';
import TextField from '../../../Components/InputField/TextField';
import LoaderButton from '../../../Components/Loader/LoaderButton';
import { useAppSelector } from '../../../store/hooks';

const SignupForm = () => {
    const { authData, authDispatch, signupHandler } = useSignupHandler();
    const { authState } = useAppSelector((state) => state.authenticate);

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        signupHandler(event);
    };

    const handleFunction = (name: string, event: React.FormEvent) => {
        name === 'AVATAR_INPUT'
            ? authDispatch({
                  type: `INPUT_${name.toUpperCase()}`,
                  payload: event,
              })
            : authDispatch({
                  type: `INPUT_${name.toUpperCase()}`,
                  payload: (event.target as HTMLButtonElement).value,
              });
    };

    return (
        <>
            <div className="auth-form-component">
                <div className="auth-form-header">Create New Account</div>
                <form className="auth-form-fields" data-testid="signup-form">
                    <TextField
                        htmlFor="name"
                        labelTitle="Full Name"
                        inputPlaceHolder="Coder social"
                        inputId="name"
                        value={authData.name}
                        handleFunction={handleFunction}
                        required={true}
                        key="name"
                    />
                    <TextField
                        htmlFor="email"
                        labelTitle="Email"
                        inputPlaceHolder="email@codersocial.dev"
                        inputId="email"
                        value={authData.email}
                        handleFunction={handleFunction}
                        required={true}
                        key="email"
                    />
                    <SetAvatar
                        image={authData.photo}
                        handleFunction={handleFunction}
                    />
                    <PasswordField
                        value={authData.password}
                        handleFunction={handleFunction}
                        required={true}
                        label="Password"
                    />
                    {authState === 'PENDING' ? (
                        <LoaderButton />
                    ) : (
                        <button
                            className="button-primary"
                            onClick={handleSubmit}
                            data-testid="signup-form-button-submit"
                        >
                            Create Account
                        </button>
                    )}
                    <Link
                        to="/login"
                        className="button-secondary"
                        data-testid="login-button-form"
                    >
                        Log in
                    </Link>
                </form>
            </div>
        </>
    );
};

export default SignupForm;
