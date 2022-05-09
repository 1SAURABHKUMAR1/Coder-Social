import React, { SetStateAction } from 'react';

import { Location } from 'react-router-dom';

export interface SearchBarProps {
    showSearchBox: boolean;
}

export interface TextFieldProps {
    htmlFor: string;
    labelTitle: string;
    inputPlaceHolder: string;
    inputId: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface PasswordFileProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface Children {
    children: React.ReactNode;
}

export interface AuthStateType {
    login: boolean;
    userId: string | undefined;
    name: string | undefined;
    email: string | undefined;
    photo: string | undefined;
}

export interface AuthActionType {
    type: 'LOGIN' | 'LOGOUT';
    payload?: {
        user_id: string;
        name: string;
        email: string;
        photo: string;
    };
}

export interface AuthContextType {
    userAuthState: AuthStateType;
    userAuthDispatch: React.Dispatch<AuthActionType>;
}

export interface FormState {
    from: Location;
}

export interface AvatarProps {
    image: any;
    setImage: React.Dispatch<React.SetStateAction<any>>;
}

export interface NavBarProps {
    searchMobile: boolean;
    setSearchMobile: React.Dispatch<React.SetStateAction<boolean>>;
    showMobile: boolean;
    setShowMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HeaderShortProps {
    navbarOpen: boolean;
    setNavbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    handleShowMenu?: () => void;
}

export interface AsideProps {
    showAside: boolean;
    handleToggleAside: () => void;
}
