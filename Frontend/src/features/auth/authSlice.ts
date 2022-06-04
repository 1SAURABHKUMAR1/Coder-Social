import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    signupUser as signupUserRequest,
    loginUser as loginUserRequest,
    forgotPassword as forgotPasswordRequest,
    changePassword as changePasswordRequest,
    updateProfile as updateProfileRequest,
    deleteProfile as deleteProfileRequest,
} from '../../Services';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import {
    AuthState,
    ChangePassword as ChangePasswordProps,
    Login,
    setStateName as setStateNameAction,
    Signup,
    updateProfile as updateProfileProps,
    UserSliceaction,
} from '../../Types/index';

const initialState: AuthState = {
    login: false,
    userId: '',
    username: '',
    name: '',
    email: '',
    photo: '',
    id: '',
    authState: 'IDLE',
    editProfileState: 'IDLE',
    deleteProfileState: 'IDLE',
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: Login, { rejectWithValue }) => {
        try {
            const { data } = await loginUserRequest({
                email,
                password,
            });

            if (data.success) {
                SuccessToast('Login Success');
                return data;
            } else {
                ErrorToast('Login Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast('Login Failed');

            return rejectWithValue(error.message ?? { message: 'Failed' });
        }
    },
);

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ email, password, name, photo }: Signup, { rejectWithValue }) => {
        try {
            const formData = {
                email,
                password,
                name,
                photo,
            };

            const { data } = await signupUserRequest(formData);

            if (data.success) {
                SuccessToast('Signup Success');
                return data;
            } else {
                ErrorToast('Signup Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast('Signup Failed');

            return rejectWithValue(error.message ?? { message: 'Failed' });
        }
    },
);

export const forgotPassword = createAsyncThunk(
    '/auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const { data } = await forgotPasswordRequest(email);

            if (data.success) {
                SuccessToast('Email Sent Successfully!');
                return data;
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast(error?.response?.data?.message ?? 'Email Sent Failed');

            return rejectWithValue(
                error?.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const updatePassword = createAsyncThunk(
    '/auth/updatePassword',
    async (
        { oldPassword, newPassword }: ChangePasswordProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await changePasswordRequest({
                oldPassword,
                newPassword,
            });

            if (data.success) {
                SuccessToast('Password Changed!');
                return data;
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast(error?.response?.data?.message ?? 'Signup Failed');

            return rejectWithValue(error.message ?? { message: 'Failed' });
        }
    },
);

export const updateProfile = createAsyncThunk(
    '/user/updateProfile',
    async (userData: updateProfileProps, { rejectWithValue }) => {
        try {
            const { data } = await updateProfileRequest(userData);

            if (data.success) {
                SuccessToast('Updated');
                return data;
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast(error?.response?.data?.message ?? 'Failed');

            return rejectWithValue(error.message ?? { message: 'Failed' });
        }
    },
);

export const deleteProfile = createAsyncThunk(
    'auth/deleteUser',
    async (type: string, { rejectWithValue }) => {
        try {
            const { data } = await deleteProfileRequest();

            if (data.success) {
                SuccessToast('Account Deleted');
                return data;
            } else {
                ErrorToast('Failed');
                return rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);

            ErrorToast(error?.response?.data?.message ?? 'Failed');

            return rejectWithValue(error.message ?? { message: 'Failed' });
        }
    },
);

const authenticationSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        refreshToken: (
            state: AuthState,
            action: PayloadAction<UserSliceaction>,
        ) => {
            state.authState = 'IDLE';
            state.login = true;
            state.userId = action.payload.user.user_id;
            state.username = action.payload.user.username;
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.photo = action.payload.user.profile_photo.secure_url;
            state.id = action.payload.user._id;
        },

        logoutUser: (state: AuthState) => {
            state.authState = 'IDLE';
            state.login = false;
            state.userId = '';
            state.username = '';
            state.name = '';
            state.email = '';
            state.photo = '';
            state.id = '';
        },

        setStateName: (
            state: AuthState,
            action: PayloadAction<setStateNameAction>,
        ) => {
            return {
                ...state,
                [action.payload.stateName]: action.payload.stateValue,
            };
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state: AuthState) => {
            return { ...state, login: false, authState: 'PENDING' };
        });

        builder.addCase(
            loginUser.fulfilled,
            (state: AuthState, action: PayloadAction<UserSliceaction>) => {
                return {
                    ...state,
                    authState: 'FULFILLED',
                    login: true,
                    userId: action.payload.user.user_id,
                    username: action.payload.user.username,
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    photo: action.payload.user.profile_photo.secure_url,
                    id: action.payload.user._id,
                };
            },
        );

        builder.addCase(loginUser.rejected, (state: AuthState) => {
            return {
                ...state,
                authState: 'REJECTED',
                login: false,
            };
        });

        builder.addCase(signupUser.pending, (state: AuthState) => {
            return {
                ...state,
                authState: 'PENDING',
            };
        });

        builder.addCase(
            signupUser.fulfilled,
            (state: AuthState, action: PayloadAction<UserSliceaction>) => {
                return {
                    ...state,
                    authState: 'FULFILLED',
                    login: true,
                    userId: action.payload.user.user_id,
                    username: action.payload.user.username,
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    photo: action.payload.user.profile_photo.secure_url,
                    id: action.payload.user._id,
                };
            },
        );

        builder.addCase(signupUser.rejected, (state: AuthState) => {
            return {
                ...state,
                authState: 'REJECTED',
                login: false,
            };
        });

        builder.addCase(forgotPassword.pending, (state: AuthState) => {
            return {
                ...state,
                authState: 'PENDING',
            };
        });

        builder.addCase(forgotPassword.fulfilled, (state: AuthState) => {
            return {
                ...state,
                authState: 'FULFILLED',
                login: false,
            };
        });

        builder.addCase(forgotPassword.rejected, (state: AuthState) => {
            return {
                ...state,
                authState: 'REJECTED',
                login: false,
            };
        });

        builder.addCase(updatePassword.pending, (state: AuthState) => {
            return {
                ...state,
                authState: 'PENDING',
            };
        });

        builder.addCase(updatePassword.fulfilled, (state: AuthState) => {
            return {
                ...state,
                authState: 'FULFILLED',
            };
        });

        builder.addCase(updatePassword.rejected, (state: AuthState) => {
            return {
                ...state,
                authState: 'REJECTED',
            };
        });

        builder.addCase(updateProfile.pending, (state: AuthState) => {
            return {
                ...state,
                editProfileState: 'PENDING',
            };
        });

        builder.addCase(
            updateProfile.fulfilled,
            (state: AuthState, action: PayloadAction<UserSliceaction>) => {
                return {
                    ...state,
                    editProfileState: 'FULFILLED',
                    login: true,
                    userId: action.payload.user.user_id,
                    username: action.payload.user.username,
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    photo: action.payload.user.profile_photo.secure_url,
                    id: action.payload.user._id,
                };
            },
        );

        builder.addCase(updateProfile.rejected, (state: AuthState) => {
            return {
                ...state,
                editProfileState: 'REJECTED',
            };
        });

        builder.addCase(deleteProfile.pending, (state: AuthState) => {
            return {
                ...state,
                deleteProfileState: 'PENDING',
            };
        });

        builder.addCase(deleteProfile.fulfilled, (state: AuthState) => {
            return {
                ...state,
                deleteProfileState: 'FULFILLED',
                authState: 'IDLE',
                login: false,
                userId: '',
                username: '',
                name: '',
                email: '',
                photo: '',
                id: '',
            };
        });

        builder.addCase(deleteProfile.rejected, (state: AuthState) => {
            return {
                ...state,
                deleteProfileState: 'REJECTED',
            };
        });
    },
});

export const authReducer = authenticationSlice.reducer;
export const { logoutUser, refreshToken, setStateName } =
    authenticationSlice.actions;
