import { configureStore } from '@reduxjs/toolkit';

import {
    authReducer,
    postReducer,
    singleUserReducer,
    tagReducer,
    searchReducer,
    socketReducer,
} from '../features';

export const store = configureStore({
    reducer: {
        authenticate: authReducer,
        post: postReducer,
        user: singleUserReducer,
        tags: tagReducer,
        search: searchReducer,
        socket: socketReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
