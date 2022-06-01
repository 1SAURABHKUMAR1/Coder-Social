import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    getUserData as getUserDataRequest,
    getUserProfile as getUserProfileRequest,
    followUnfollowUser as followUnfollowUserRequest,
} from '../../Services';

import {
    controller,
    getUserData as getUserDataProps,
    UserData,
    UserSliceaction,
} from '../../Types';

const initialState: UserData = {
    name: '',
    email: '',
    username: '',
    user_id: '',
    social_id: '',
    profile_photo: '',
    role: '',
    bio: '',
    portfolio_link: '',
    work: '',
    skills: '',
    education: '',
    location: '',
    githubUrl: '',
    twitterUrl: '',
    total_followers: 0,
    total_following: 0,
    following: [],
    followers: [],
    bookmarks: [],
    posts: [],
    tags: [],
    comments: [],
    createdAt: '',
    _id: '',
    getState: 'IDLE',
    getProfile: 'IDLE',
    followUserState: 'IDLE',
};

export const getUserData = createAsyncThunk(
    'user/singleUser',
    async (
        { username, controller, unMounted }: getUserDataProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await getUserDataRequest({ controller, username });

            if (data.success && !unMounted) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const getProfile = createAsyncThunk(
    '/user/profile',
    async ({ controller, unMounted }: controller, { rejectWithValue }) => {
        try {
            const { data } = await getUserProfileRequest(controller);

            if (data.success && !unMounted) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const followUnfollowUser = createAsyncThunk(
    'user/followUnfollowUserProfile',
    async (userId: string, { rejectWithValue }) => {
        try {
            const { data } = await followUnfollowUserRequest(userId);

            if (data.success) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

const singleUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state: UserData) => {
            return { ...state, getState: 'PENDING' };
        });

        builder.addCase(
            getUserData.fulfilled,
            (state: UserData, action: PayloadAction<UserSliceaction>) => {
                return {
                    ...state,
                    getState: 'FULFILLED',
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    username: action.payload.user.username,
                    user_id: action.payload.user.user_id,
                    social_id: action.payload.user.social_id,
                    profile_photo: action.payload.user.profile_photo.secure_url,
                    role: action.payload.user.role,
                    bio: action.payload.user.bio,
                    portfolio_link: action.payload.user.portfolio_link,
                    work: action.payload.user.work,
                    skills: action.payload.user.skills,
                    education: action.payload.user.education,
                    location: action.payload.user.location,
                    githubUrl: action.payload.user.githubUrl,
                    twitterUrl: action.payload.user.twitterUrl,
                    total_followers: action.payload.user.total_followers,
                    total_following: action.payload.user.total_following,
                    following: action.payload.user.following,
                    followers: action.payload.user.followers,
                    bookmarks: action.payload.user.bookmarks,
                    posts: action.payload.user.posts,
                    tags: action.payload.user.tags,
                    comments: action.payload.user.comments,
                    createdAt: action.payload.user.createdAt,
                    _id: action.payload.user._id,
                };
            },
        );

        builder.addCase(getUserData.rejected, (state: UserData) => {
            return { ...state, getState: 'REJECTED' };
        });

        builder.addCase(getProfile.pending, (state: UserData) => {
            return { ...state, getProfile: 'PENDING' };
        });

        builder.addCase(
            getProfile.fulfilled,
            (state: UserData, action: PayloadAction<UserSliceaction>) => {
                return {
                    ...state,
                    getProfile: 'FULFILLED',
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    username: action.payload.user.username,
                    profile_photo: action.payload.user.profile_photo.secure_url,
                    bio: action.payload.user.bio,
                    portfolio_link: action.payload.user.portfolio_link,
                    work: action.payload.user.work,
                    skills: action.payload.user.skills,
                    education: action.payload.user.education,
                    location: action.payload.user.location,
                    githubUrl: action.payload.user.githubUrl,
                    twitterUrl: action.payload.user.twitterUrl,
                };
            },
        );

        builder.addCase(getProfile.rejected, (state: UserData) => {
            return { ...state, getProfile: 'REJECTED' };
        });

        builder.addCase(followUnfollowUser.pending, (state: UserData) => {
            return {
                ...state,
                followUserState: 'PENDING',
            };
        });

        builder.addCase(
            followUnfollowUser.fulfilled,
            (state: UserData, action: PayloadAction<UserSliceaction>) => {
                return {
                    ...state,
                    followUserState: 'FULFILLED',
                    total_followers: action.payload.user.total_followers,
                    followers: action.payload.user.followers,
                };
            },
        );

        builder.addCase(followUnfollowUser.rejected, (state: UserData) => {
            return {
                ...state,
                followUserState: 'REJECTED',
            };
        });
    },
});

export const singleUserReducer = singleUserSlice.reducer;
// export const {} = singleUserSlice.actions;
