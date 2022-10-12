import './Header.css';

import { useState } from 'react';

import SearchBar from './SearchBar/SearchBar';
import NavBar from './NavBar/NavBar';

import { NavLink } from 'react-router-dom';

import SideInfoMobile from './SideInfo/SideInfoMobile';
import MobileAside from './MobileAside/MobileAside';

const logo = require('../../Data/images/logo.svg');

const Header = () => {
    const [searchMobile, setSearchMobile] = useState<boolean>(false);
    const [showMobile, setShowMobile] = useState<boolean>(false);
    const [showAside, setShowAside] = useState<boolean>(false);

    const handleShowMobileMenu = () => {
        setShowMobile(!showMobile);
    };

    const handleShowAside = () => {
        setShowAside(!showAside);
    };

    return (
        <header className="sticky-header" data-testid="header">
            <div className="container container-navbar">
                {/* hamburgr  */}
                <div
                    className="header-hamburger-menu"
                    onClick={handleShowAside}
                ></div>
                <MobileAside
                    showAside={showAside}
                    handleToggleAside={handleShowAside}
                />

                {/* logo and searhc bar  */}
                <div className="header-logo-search">
                    <NavLink to="/" className="header-logo">
                        <img
                            src={logo.default}
                            alt=""
                            className="image logo"
                            data-testid="home-logo"
                        />
                    </NavLink>
                    <SearchBar showSearchBox={true} viewPort={'desktop'} />
                </div>

                {/* signup and search and user info icons  */}
                <NavBar
                    searchMobile={searchMobile}
                    setSearchMobile={setSearchMobile}
                    setShowMobile={setShowMobile}
                />
            </div>

            <div className="search-mobile-container">
                <SearchBar showSearchBox={searchMobile} viewPort="mobile" />
            </div>

            <SideInfoMobile
                navbarOpen={showMobile}
                handleShowMenu={handleShowMobileMenu}
            />
        </header>
    );
};

export default Header;
