import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    current,
} from '@reduxjs/toolkit';

import {
    getTags as getTagsRequest,
    getSingleTag as getSingleTagRequest,
    followUnfollowTag as followUnfollowTagRequest,
    getUserTag as getUserTagsRequest,
} from '../../Services';

import ErrorToast from '../../Toast/Error';

import {
    controller,
    TagAction,
    TagSliceProps,
    getSingleTagProps,
    SingleTagAction,
    UserTagAction,
} from '../../Types/index';

const initialState: TagSliceProps = {
    tags: [],
    getTagStatus: 'IDLE',
    singleTag: {
        _id: '',
        createdAt: '',
        followers: [],
        name: '',
        tag_id: '',
        posts: [],
    },
    singleTagStatus: 'IDLE',
    followUnfollowStatus: 'IDLE',
    userTags: [],
    userTagState: 'IDLE',
};

export const getAllTags = createAsyncThunk(
    '/tags/getAllTags',
    async ({ controller, unMounted }: controller, { rejectWithValue }) => {
        try {
            const { data } = await getTagsRequest(controller);

            if (data.success && !unMounted) {
                return data;
            }
            return rejectWithValue(data);
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const getSingleTag = createAsyncThunk(
    'tag/getSingleTag',
    async (
        { controller, unMounted, tagName }: getSingleTagProps,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await getSingleTagRequest(controller, tagName);

            if (data.success && !unMounted) {
                return data;
            }
            return rejectWithValue(data);
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const followUnfollowTag = createAsyncThunk(
    'tag/followunfollow',
    async (tag_id: string, { rejectWithValue }) => {
        try {
            const { data } = await followUnfollowTagRequest(tag_id);

            if (data.success) {
                return data;
            }

            return rejectWithValue(data);
        } catch (error) {
            console.log(error);

            ErrorToast('Failed');
            return rejectWithValue(
                error.response?.data ?? { message: 'Failed' },
            );
        }
    },
);

export const getUserTags = createAsyncThunk(
    'user/getTags',
    async ({ controller, unMounted }: controller, { rejectWithValue }) => {
        try {
            const { data } = await getUserTagsRequest(controller);

            if (data.success && !unMounted) {
                return data;
            }
            return rejectWithValue(data);
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error.response?.message ?? { message: 'Failed' },
            );
        }
    },
);

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTags.pending, (state: TagSliceProps) => {
            return {
                ...state,
                getTagStatus: 'PENDING',
            };
        });

        builder.addCase(
            getAllTags.fulfilled,
            (state: TagSliceProps, action: PayloadAction<TagAction>) => {
                return {
                    ...state,
                    getTagStatus: 'FULFILLED',
                    tags: action.payload.tags,
                };
            },
        );

        builder.addCase(getAllTags.rejected, (state: TagSliceProps) => {
            return {
                ...state,
                getTagStatus: 'REJECTED',
            };
        });

        builder.addCase(getSingleTag.pending, (state: TagSliceProps) => {
            return {
                ...state,
                singleTagStatus: 'PENDING',
            };
        });

        builder.addCase(
            getSingleTag.fulfilled,
            (state: TagSliceProps, action: PayloadAction<SingleTagAction>) => {
                return {
                    ...state,
                    singleTagStatus: 'FULFILLED',
                    singleTag: action.payload.tag,
                };
            },
        );

        builder.addCase(getSingleTag.rejected, (state: TagSliceProps) => {
            return {
                ...state,
                singleTagStatus: 'REJECTED',
                singleTag: {
                    _id: '',
                    createdAt: '',
                    followers: [],
                    name: '',
                    tag_id: '',
                    posts: [],
                },
            };
        });

        builder.addCase(followUnfollowTag.pending, (state: TagSliceProps) => {
            return {
                ...state,
                followUnfollowStatus: 'PENDING',
            };
        });

        builder.addCase(
            followUnfollowTag.fulfilled,
            (state: TagSliceProps, action: PayloadAction<SingleTagAction>) => {
                const tagIndex: number = current(state.tags).findIndex(
                    (tag) => tag._id === action.payload.tag._id,
                );

                state.followUnfollowStatus = 'FULFILLED';
                state.singleTag = {
                    ...state.singleTag,
                    followers: action.payload.tag.followers,
                };
                state.tags[tagIndex].followers = action.payload.tag.followers;
            },
        );

        builder.addCase(followUnfollowTag.rejected, (state: TagSliceProps) => {
            return {
                ...state,
                followUnfollowStatus: 'REJECTED',
            };
        });

        builder.addCase(getUserTags.pending, (state: TagSliceProps) => {
            return {
                ...state,
                userTagState: 'IDLE',
            };
        });

        builder.addCase(
            getUserTags.fulfilled,
            (state: TagSliceProps, action: PayloadAction<UserTagAction>) => {
                return {
                    ...state,
                    userTagState: 'FULFILLED',
                    userTags: action.payload.tag,
                };
            },
        );

        builder.addCase(getUserTags.rejected, (state: TagSliceProps) => {
            return {
                ...state,
                userTagState: 'REJECTED',
            };
        });
    },
});

export const tagReducer = tagSlice.reducer;

// export const {} = tagSlice.actions;
