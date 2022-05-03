import './Header.css';

import { useState } from 'react';

import SearchBar from './SearchBar/SearchBar';
import NavBar from './NavBar/NavBar';

const Header = () => {
    const [searchMobile, setSearchMobile] = useState(false);

    const toggleSearchMobile = () => {
        setSearchMobile(!searchMobile);
    };

    return (
        <header>
            <div className="container container-navbar">
                <NavBar searchMobileIconHandler={toggleSearchMobile}>
                    <SearchBar showSearchBox={false} />
                </NavBar>
            </div>

            <div className="search-mobile-container">
                <SearchBar showSearchBox={searchMobile} />
            </div>
        </header>
    );
};

export default Header;
