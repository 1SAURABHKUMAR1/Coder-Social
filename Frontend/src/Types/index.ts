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
    required: boolean;
    handleFunction?: (name: string, event: React.FormEvent) => void;
}

export interface PasswordFileProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    required: boolean;
    label: string;
    htmlFor?: string;
    id?: string;
    autoFill?: string;
}

export interface Children {
    children: React.ReactNode;
}

export interface AuthStateType {
    login: boolean;
    userId: string | undefined;
    username: string | undefined;
    name: string | undefined;
    email: string | undefined;
    photo: string | undefined;
}

export interface AuthActionType {
    type: 'LOGIN' | 'LOGOUT';
    payload?: {
        user_id: string;
        name: string;
        username: string;
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
    extraClass?: string;
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

export interface UserInfoProps {
    education: string;
    work: string;
}

export interface PostAuthorProps {
    authorImage: string;
    authorName: string;
    postDate: string;
    authorUsername: string;
}

export interface PostActionsProps {
    numberOfLikes: number;
    numberOfComments: number;
    timeToRead: number;
}

export interface PostProps {
    image: string;
    heading: string;
    id: string;
    authorImage: string;
    authorName: string;
    postDate: string;
    numberOfComments: number;
    numberOfLikes: number;
    authorUsername: string;
    postDescription: string;
}

export interface ProfileNameProps {
    name: string;
    bio: string;
    location: string;
    joinedDate: string;
    portfolio_link: string;
    twitterUrl: string;
    githubUrl: string;
}

export interface SideBarPortfolioProps {
    works: string;
    skills: string;
    numberOfPosts: number;
    numberOfComments: number;
    numberOftags: number;
}

export interface PostContainerProps {
    postArray: Array<any>;
}

export interface UserData {
    name: string;
    email: string;
    username: string;
    user_id: string;
    social_id: string;
    profile_photo: { id: string; secure_url: string };
    role: string;
    bio: string;
    portfolio_link: string;
    work: string;
    skills: string;
    education: string;
    location: string;
    githubUrl: string;
    twitterUrl: string;
    total_followers: number;
    total_following: number;
    following: [];
    followers: [];
    bookmarks: [];
    posts: [];
    tags: [];
    commments: [];
    createdAt: string;
    __v: number;
    _id: string;
}

export interface EditProfileInitalData {
    userIntialData: {
        name: string;
        email: string;
        username: string;
        photo: string;
        bio: string;
        portfolio_link: string;
        work: string;
        skills: string;
        education: string;
        location: string;
        githubUrl: string;
        twitterUrl: string;
    };
    profilePhoto?: string;
}

export interface DeleteModalProps {
    showModal: boolean;
    handleDeleteModal: () => void;
}
