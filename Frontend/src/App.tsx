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
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </>
        </div>
    );
};

export default App;
