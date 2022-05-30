import { ChangePassword, Login, Signup } from '../Types';

import Axios from './http/axios';

const signupUser = (formData: Signup) => Axios.post('/signup', formData);

const loginUser = ({ email, password }: Login) =>
    Axios.post('/login', {
        email,
        password,
    });

const forgotPassword = (email: string) =>
    Axios.post('/forgotpassword', {
        email,
    });

const changePassword = ({ oldPassword, newPassword }: ChangePassword) =>
    Axios.post('/password/update', {
        oldPassword,
        newPassword,
    });

export { loginUser, signupUser, forgotPassword, changePassword };
