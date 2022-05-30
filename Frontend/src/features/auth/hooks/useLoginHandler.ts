import { useReducer } from 'react';

import { Login } from '../../../Types';

export interface loginAction {
    type: 'INPUT_EMAIL' | 'INPUT_PASSWORD';
    payload: string;
}

const useLoginHandler = () => {
    const initalData: Login = {
        email: '',
        password: '',
    };

    const loginReducer = (state: Login, action: loginAction): Login => {
        switch (action.type) {
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

            default:
                return state;
        }
    };

    const [loginData, loginDispatch] = useReducer(loginReducer, initalData);

    return { loginData, loginDispatch };
};

export default useLoginHandler;
