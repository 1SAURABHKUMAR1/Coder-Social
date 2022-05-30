import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {} from '../../Services';

import ErrorToast from '../../Toast/Error';
import SuccessToast from '../../Toast/Success';

import {} from '../../Types/index';

const initialState = {
    tag: [],
};

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        //
    },
});

export const tagReducer = tagSlice.reducer;

export const {} = tagSlice.actions;
