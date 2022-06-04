import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { searchPost as searchPostRequest } from '../../Services/index';

import {
    SearchAction,
    SearchRequestProp,
    SearchSliceInital,
    setStateNameSearchProps,
} from '../../Types/index';

const initialState: SearchSliceInital = {
    searchPosts: [],
    searchPostState: 'IDLE',
};

export const searchPost = createAsyncThunk(
    'search/User',
    async (
        { controller, unMounted, searchParams }: SearchRequestProp,
        { rejectWithValue },
    ) => {
        try {
            const { data } = await searchPostRequest(controller, searchParams);

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

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setStateName: (
            state: SearchSliceInital,
            action: PayloadAction<setStateNameSearchProps>,
        ) => {
            return {
                ...state,
                [action.payload.stateName]: action.payload.stateValue,
            };
        },

        logoutUser: (state: SearchSliceInital) => {
            state.searchPosts = [];
            state.searchPostState = 'IDLE';
        },
    },
    extraReducers: (builders) => {
        builders.addCase(searchPost.pending, (state: SearchSliceInital) => {
            return {
                ...state,
                searchPostState: 'PENDING',
            };
        });

        builders.addCase(
            searchPost.fulfilled,
            (state: SearchSliceInital, action: PayloadAction<SearchAction>) => {
                return {
                    ...state,
                    searchPostState: 'FULFILLED',
                    searchPosts: action.payload.posts,
                };
            },
        );

        builders.addCase(searchPost.rejected, (state: SearchSliceInital) => {
            return {
                ...state,
                searchPostState: 'REJECTED',
            };
        });
    },
});

export const searchReducer = searchSlice.reducer;
export const {
    setStateName: setStateNameSearch,
    logoutUser: logoutUserSearch,
} = searchSlice.actions;
