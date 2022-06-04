import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    commentSocket,
    controller,
    followSocket,
    likeSocket,
    setStateNameSocket as setStateNameSocketProps,
    socketAction,
    socketActionGetAll,
    socketInitalState,
} from '../../Types/index';

import {
    getUnreadNotifications as getUnreadNotificationsRequest,
    getAllNotifications as getAllNotificationRequest,
} from '../../Services/index';

const initialState: socketInitalState = {
    socketConnectedState: 'DISCONNECTED',
    notifications: [],
    allNotifications: [],
    notificationStatus: 'IDLE',
};

export const getUnreadNotifications = createAsyncThunk(
    '/notification/getUnread',
    async ({ controller, unMounted }: controller, { rejectWithValue }) => {
        try {
            const { data } = await getUnreadNotificationsRequest(controller);

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

export const getAllNotification = createAsyncThunk(
    'notification/getAll',
    async ({ controller, unMounted }: controller, { rejectWithValue }) => {
        try {
            const { data } = await getAllNotificationRequest(controller);

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

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setStateNameSocket: (
            state: socketInitalState,
            action: PayloadAction<setStateNameSocketProps>,
        ) => {
            return {
                ...state,
                [action.payload.stateName]: action.payload.stateValue,
            };
        },

        // @ts-ignore
        addNewNotification: (
            state: socketInitalState,
            action: PayloadAction<likeSocket | commentSocket | followSocket>,
        ) => {
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        },

        logoutUser: (state: socketInitalState) => {
            state.socketConnectedState = 'DISCONNECTED';
            state.notifications = [];
            state.allNotifications = [];
            state.notificationStatus = 'IDLE';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUnreadNotifications.fulfilled,
            (state: socketInitalState, action: PayloadAction<socketAction>) => {
                return {
                    ...state,
                    notifications: action.payload.notification,
                };
            },
        );

        builder.addCase(
            getAllNotification.pending,
            (state: socketInitalState) => {
                return {
                    ...state,
                    notificationStatus: 'PENDING',
                };
            },
        );

        builder.addCase(
            getAllNotification.fulfilled,
            (
                state: socketInitalState,
                action: PayloadAction<socketActionGetAll>,
            ) => {
                return {
                    ...state,
                    notificationStatus: 'FULFILLED',
                    allNotifications: action.payload.notification,
                    notifications: [],
                };
            },
        );

        builder.addCase(
            getAllNotification.rejected,
            (state: socketInitalState, action: PayloadAction<any>) => {
                if (action.payload.message === 'Failed') {
                    return { ...state, notificationStatus: 'PENDING' };
                }

                return {
                    ...state,
                    notificationStatus: 'REJECTED',
                };
            },
        );
    },
});

export const socketReducer = socketSlice.reducer;

export const {
    setStateNameSocket,
    addNewNotification,
    logoutUser: logoutUserSocket,
} = socketSlice.actions;
