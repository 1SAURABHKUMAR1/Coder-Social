import React from 'react';

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
    id: string | undefined;
}

export interface AuthActionType {
    type: 'LOGIN' | 'LOGOUT';
    payload?: {
        user_id: string;
        name: string;
        username: string;
        email: string;
        photo: string;
        id: string;
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
    following: number;
    followers: number;
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
    postId: string;
}

export interface PostTag {
    name: string;
    _id: string;
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
    tagsArray: Array<PostTag>;
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
    postArray: Array<Post>;
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

export interface SingleTag {
    text: string;
    id: string;
}

export interface TagProp extends Array<SingleTag> {}

export interface TagInputProp {
    htmlFor: string;
    labelTitle: string;
    inputPlaceHolder: string;
    inputId: string;
    tags: TagProp;
    setTags: React.Dispatch<React.SetStateAction<TagProp>>;
}

export interface EditPostFieldProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    tagArray: TagProp;
    setTagArray: React.Dispatch<React.SetStateAction<TagProp>>;
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export interface Post {
    image: {
        id: string;
        secure_url: string;
    };
    _id: string;
    title: string;
    description: string;
    tags: [];
    comments: [];
    likes: [];
    author: {
        profile_photo: {
            id: string;
            secure_url: string;
        };
        name: string;
        username: string;
    };
    post_id: string;
    createdAt: string;
}

export interface PostProfileProps {
    image_secure_url: string;
    user_id: string;
    bio: string;
    location: string;
    education: string;
    work: string;
    joinedDate: string;
    name: string;
    username: string;
}

export interface PostSectionProps {
    image: string;
    heading: string;
    authorImage: string;
    authorName: string;
    authorUserId: string;
    postDate: string;
    postId: string;
    authorUsername: string;
    postDescription: string;
    tagsArray: [
        {
            name: string;
            _id: string;
            tag_id: string;
        },
    ];
    children: React.ReactNode;
}

export interface PostReactionProps {
    likes: Array<string>;
    unicorns: Array<string>;
    bookmarks: Array<string>;
    setPostData: React.Dispatch<React.SetStateAction<PostData>>;
}

// TODO: remove ?
export interface PostCommentsProps {
    noOfComments?: number;
    commentArray?: [];
}

export interface PostData {
    author: {
        name: string;
        profile_photo: {
            id: string;
            secure_url: string;
        };
        username: string;
        _id: string;
        bio: string;
        education: string;
        createdAt: string;
        location: string;
        user_id: string;
        work: string;
    };
    bookmarks: [];
    comments: [];
    createdAt: string;
    description: string;
    image: {
        id: string;
        secure_url: string;
    };
    likes: Array<string>;
    post_id: string;
    tags: [
        {
            name: string;
            tag_id: string;
            _id: string;
        },
    ];
    title: string;
    unicorns: [];
    _id: string;
}
export interface showModalProps {
    showModal: boolean;
    handleModal: () => void;
    postId: string;
}

export interface postEditProps {
    postId: string;
}
