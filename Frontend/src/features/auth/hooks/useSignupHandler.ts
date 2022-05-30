import React, { useReducer } from 'react';
import { useAppDispatch } from '../../../store/hooks';

import { Signup } from '../../../Types';

import { signupUser } from '../authSlice';

const avatar = require('../../../Data/images/avatar.jpg');

const useSignupHandler = () => {
    const dispatch = useAppDispatch();

    const initalData: Signup = {
        name: '',
        email: '',
        password: '',
        photo: avatar,
    };

    const authReducer = (state: any, action: any) => {
        switch (action.type) {
            case 'INPUT_NAME':
                return {
                    ...state,
                    name: action.payload,
                };

            case 'INPUT_EMAIL':
                return {
                    ...state,
                    email: action.payload,
                };

            case 'INPUT_PASSWORD':
                return {
                    ...state,
                    password: action.payload,
                };

            case 'INPUT_AVATAR_INPUT':
                return {
                    ...state,
                    photo: action.payload,
                };
        }
    };

    const [authData, authDispatch] = useReducer(authReducer, initalData);

    const signupHandler = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        authData.name !== '' &&
            authData.email !== '' &&
            authData.password !== '' &&
            authData.photo !== avatar &&
            dispatch(
                signupUser({
                    name: authData.name,
                    email: authData.email,
                    password: authData.password,
                    photo: authData.photo,
                }),
            );
    };

    return { authData, authDispatch, signupHandler };
};

export default useSignupHandler;
