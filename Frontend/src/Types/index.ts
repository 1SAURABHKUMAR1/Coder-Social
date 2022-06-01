import React from 'react';

import { Location } from 'react-router-dom';
import { store } from '../store/store';

export interface SearchBarProps {
    showSearchBox: boolean;
}

export interface TextFieldProps {
    htmlFor: string;
    labelTitle: string;
    inputPlaceHolder: string;
    inputId: string;
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    required: boolean;
    handleFunction?: (name: string, event: React.FormEvent) => void;
}

export interface PasswordFileProps {
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    handleFunction?: (name: string, event: React.FormEvent) => void;
    required: boolean;
    label: string;
    htmlFor?: string;
    id?: string;
    autoFill?: string;
}

export interface Children {
    children: React.ReactNode;
}

export interface AuthState {
    login: boolean;
    userId: string;
    username: string;
    name: string;
    email: string;
    photo: string;
    id: string;
    authState: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    editProfileState: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    deleteProfileState: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
}

export interface FormState {
    from: Location;
}

export interface AvatarProps {
    image: any;
    setImage?: React.Dispatch<React.SetStateAction<any>>;
    handleFunction?: (name: string, event: React.FormEvent) => void;
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
    bookmarkArray: Array<string>;
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
    tagsArray: Array<SingleTag>;
    bookmarkArray: string[];
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

export interface UserData {
    name: string;
    email: string;
    username: string;
    user_id: string;
    social_id: string;
    profile_photo: string;
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
    following: string[];
    followers: string[];
    bookmarks: [];
    posts: [];
    tags: [];
    comments: [];
    createdAt: string;
    _id: string;
    getState: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    getProfile: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    followUserState: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
}

export interface DeleteModalProps {
    showModal: boolean;
    handleDeleteModal: () => void;
}

export interface SingleTag {
    name: string;
    _id: string;
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

export interface PostReactionProps {
    likes: Array<string>;
    unicorns: Array<string>;
    bookmarks: Array<string>;
}

export interface PostCommentsProps {
    commentArray: CommentBody[];
}

export interface CommentBody {
    body: string;
    author: {
        profile_photo: {
            id: string;
            secure_url: string;
        };
        _id: string;
        name: string;
        username: string;
        user_id: string;
    };
    post: string;
    likes: Array<LikeProps>;
    _id: string;
    comment_id: string;
    createdAt: string;
    parent_comment: string;
}

export interface UserRequest {
    name: string;
    email: string;
    username: string;
    user_id: string;
    social_id: string;
    profile_photo: {
        id: string;
        secure_url: string;
    };
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
    comments: [];
    createdAt: string;
    _id: string;
}

export interface UserSliceaction {
    user: UserRequest;
}

export interface PostSliceAction {
    post: PostData;
}

export interface BookmarkSliceAction {
    post: SmallPost[];
}

export interface ReactionAction {
    data: {
        post: SmallPost;
    };
    reactionName: string;
    postId: string;
}

export interface CommentAction {
    comment: CommentBody;
}

export interface likeeditCommentReaction {
    comment_id: string;
    data: {
        comment: CommentBody;
    };
}

export interface deleteCommentAction {
    comment_id: string;
}

export interface showModalProps {
    showModal: boolean;
    handleModal: () => void;
    postId: string;
}

export interface postEditProps {
    postId: string;
}

export interface SingleCommentProps {
    comment_body: string;
    author_avatar: string;
    author_username: string;
    author_user_id: string;
    comment_date: string;
    author_name: string;
    likes_array: Array<LikeProps>;
    comment_id: string;
    replies: CommentBody[];
    comment_array: CommentBody[];
    levels: number;
}

export interface CommentEditProps {
    commentBody: string;
    showCommentEdit: boolean;
    setShowCommentEdit: React.Dispatch<React.SetStateAction<boolean>>;
    comment_id: string;
    setCommentBody: React.Dispatch<React.SetStateAction<string>>;
    oldCommentBody: string;
}

export interface deleteCommentProps {
    showModal: boolean;
    handleModal: () => void;
    commentId: string;
}

export interface CommentBodyProps {
    comment_body: string;
    author_username: string;
    comment_date: string;
    author_name: string;
    commentDescription: string;
    setCommentDescription: React.Dispatch<React.SetStateAction<string>>;
    showCommentEdit: boolean;
}

export interface LikeProps {
    profile_photo: {
        id: string;
        secure_url: string;
    };
    _id: string;
    name: string;
    username: string;
    user_id: string;
}

export interface CommentLikeProps {
    likes_array: Array<LikeProps>;
    comment_id: string;
}

export interface PostActionType {
    type: 'SET_DATA';
    payload: PostData;
}

export interface PostContextType {
    postData: PostData;
    postDispatch: React.Dispatch<PostActionType>;
}

export type AppDispatch = typeof store.dispatch;

export interface Signup {
    email: string;
    password: string;
    name: string;
    photo: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface AxiosRequest {
    controller: AbortController;
    unMounted: boolean;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface getUserData {
    username: string;
    controller: AbortController;
    unMounted?: boolean;
}

export interface getSinglePost {
    postId: string;
    controller: AbortController;
    unMounted?: boolean;
}

export interface PostSliceProps {
    posts: Array<SmallPost>;
    postStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    reactionStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    bookmark: Array<SmallPost>;
    singlePost: PostData;
    getBookmarkStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    editPostStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    createPostStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    createCommentStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
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
    comments: Array<CommentBody>;
    createdAt: string;
    description: string;
    image: {
        id: string;
        secure_url: string;
    };
    likes: Array<string>;
    post_id: string;
    tags: Array<SingleTag>;
    title: string;
    unicorns: [];
    _id: string;
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
    tagsArray: Array<SingleTag>;
    children: React.ReactNode;
}

export interface SmallPost {
    author: {
        profile_photo: {
            id: string;
            secure_url: string;
        };
        _id: string;
        name: string;
        username: string;
    };
    bookmarks: [];
    comments: [];
    createdAt: string;
    description: string;
    image: {
        id: string;
        secure_url: string;
    };
    likes: [];
    post_id: string;
    tags: Array<SingleTag>;
    title: string;
    unicorns: [];
    _id: string;
}

export interface bookmarkPostProp {
    postId: string;
    userId: string;
}

export interface controller {
    controller: AbortController;
    unMounted: boolean;
}

export interface updateProfile {
    name: string;
    email: string;
    user_ID: string;
    username: string;
    photo: string | undefined;
    bio: string | undefined;
    portfolio_link: string | undefined;
    work: string | undefined;
    skills: string | undefined;
    education: string | undefined;
    location: string | undefined;
    githubUrl: string | undefined;
    twitterUrl: string | undefined;
}

export interface editPostProps {
    title: string;
    photo: string | undefined;
    description: string;
    tags: string[];
    postId: string | undefined;
}

export interface createPostProps {
    title: string;
    photo: string | undefined;
    description: string;
    tags: string[];
    userId: string | undefined;
}

export interface postReactionProps {
    postId: string;
    reactionName: string;
    apiName: string;
}

export type ValueOf<T> = T[keyof T];

export interface commentProps {
    post_id: string;
    comment_body: string;
    parent_comment_id?: string;
}

export interface editCommentProps {
    comment_id: string;
    comment_body: string;
}

export interface setStateName {
    stateName: 'authState' | 'editProfileState' | 'deleteProfileState';
    stateValue: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
}

export interface setStateNamePost {
    stateName:
        | 'postStatus'
        | 'reactionStatus'
        | 'getBookmarkStatus'
        | 'editPostStatus'
        | 'createPostStatus'
        | 'createCommentStatus'
        | 'singlePost'
        | 'bookmark';

    stateValue: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED' | {};
}

export interface TagSliceProps {
    tags: Array<AllTagProps>;
    getTagStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    singleTag: SingleTagDescription;
    singleTagStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    followUnfollowStatus: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
    userTags: Array<SingleTagDescription>;
    userTagState: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
}

export interface AllTagProps {
    createdAt: string;
    followers: string[];
    name: string;
    posts: string[];
    tag_id: string;
    _id: string;
}

export interface TagAction {
    tags: Array<AllTagProps>;
}

export interface SingleTagDescription {
    createdAt: string;
    followers: string[];
    name: string;
    posts: Array<SmallPost>;
    tag_id: string;
    _id: string;
}

export interface SingleTagAction {
    tag: SingleTagDescription;
}

export interface SingleTagProps {
    name: string;
    numberOfPost: number;
    tag_id: string;
    followers: string[];
}

export interface getSingleTagProps {
    controller: AbortController;
    unMounted: boolean;
    tagName: string;
}

export interface UserTagAction {
    tag: Array<SingleTagDescription>;
}

export interface SearchSliceInital {
    searchPosts: Array<SmallPost>;
    searchPostState: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
}

export interface SearchRequestProp extends controller {
    searchParams: string;
}

export interface SearchAction {
    posts: Array<SmallPost>;
}

export interface setStateNameSearchProps {
    stateName: 'searchPosts' | 'searchPostState';
    stateValue: 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED' | [];
}
