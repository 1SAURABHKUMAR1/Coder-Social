import { useState } from 'react';

const SearchBar = ({ showSearchBox }) => {
    const [searchValue, setSearchValue] = useState('');

    // for search on post
    const handleValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <>
            <input
                className={`search-bar ${
                    showSearchBox ? 'mobile-search-bar' : 'desktop-search-bar'
                }`}
                name="searchBox"
                value={searchValue}
                // onKeyDown={}
                onChange={handleValueChange}
                placeholder="Search....."
            />
        </>
    );
};

export default SearchBar;
