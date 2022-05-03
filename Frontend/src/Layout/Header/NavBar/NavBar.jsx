import { NavLink } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';

const NavBar = ({ children, searchMobileIconHandler }) => {
    return (
        <>
            <div className="header-hamburger-menu"></div>
            <div className="header-logo-search">
                <NavLink to="/" className="header-logo">
                    Logo
                </NavLink>
                {children}
            </div>
            <nav className="header-login-signup">
                <div className="search-icon" onClick={searchMobileIconHandler}>
                    <FiSearch size={'1.7rem'} />
                </div>
                <NavLink to="/login" className="header-login-link">
                    Log in
                </NavLink>
                <NavLink to="/signup" className="header-signup-link">
                    Create Account
                </NavLink>
            </nav>
        </>
    );
};

export default NavBar;
