import { createContext, useContext, useReducer } from 'react';

import { AuthContextType, AuthStateType, Children } from '../../Types';

import AuthReducer from './AuthReducer';

const initalState: AuthStateType = {
    login: false,
    userId: '',
    name: '',
    email: '',
    photo: '',
};

const AuthContext = createContext<AuthContextType>({
    userAuthState: initalState,
    userAuthDispatch: () => {},
});

const AuthProvider = ({ children }: Children) => {
    const [userAuthState, userAuthDispatch] = useReducer(
        AuthReducer,
        initalState,
    );

    return (
        <AuthContext.Provider value={{ userAuthState, userAuthDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthProvider = () => useContext(AuthContext);

export { AuthProvider, useAuthProvider };
