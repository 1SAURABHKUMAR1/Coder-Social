import './App.css';

import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';

import Home from './Pages/HomePage/Home';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/SignupPage/Signup';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Profile from './Pages/ProfilePage/Profile';
import EditProfile from './Pages/EditProfile/EditProfile';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import CreatePost from './Pages/CreatePost/CreatePost';
import Post from './Pages/PostPage/Post';
import EditPost from './Pages/EditPost/EditPost';

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
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </>
        </div>
    );
};

export default App;
