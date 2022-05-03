import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';

import Home from './Pages/HomePage/Home';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/SignupPage/Signup';
import PageNotFound from './Pages/PageNotFound/PageNotFound';

function App() {
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
