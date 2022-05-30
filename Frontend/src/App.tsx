import './App.css';

import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';

import {
    Login,
    Signup,
    PageNotFound,
    ForgotPassword,
    ChangePassword,
    Profile,
    ReadingList,
    EditProfile,
    Home,
    EditPost,
    CreatePost,
    Post,
} from './features/index';

import PrivateRoute from './Hooks/PrivateRoute';

import useSetAuthWithRefresh from './Hooks/useSetAuthWithRefresh';

const App = () => {
    useSetAuthWithRefresh();

    return (
        <div className="app">
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/user/profile/:username"
                        element={<Profile />}
                    />
                    <Route
                        path="/user/profile/edit"
                        element={<PrivateRoute element={<EditProfile />} />}
                    />
                    <Route
                        path="/user/profile/password"
                        element={<PrivateRoute element={<ChangePassword />} />}
                    />
                    <Route
                        path="/post/new"
                        element={<PrivateRoute element={<CreatePost />} />}
                    />
                    <Route path="/post/:postId" element={<Post />} />
                    <Route
                        path="/post/:postId/edit"
                        element={<PrivateRoute element={<EditPost />} />}
                    />
                    <Route
                        path="/user/readinglist"
                        element={<PrivateRoute element={<ReadingList />} />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </>
        </div>
    );
};

export default App;
