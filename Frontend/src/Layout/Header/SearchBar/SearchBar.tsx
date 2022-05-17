import React, { useState } from 'react';
import { SearchBarProps } from '../../../Types';

const SearchBar = ({ showSearchBox }: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    // for search on post
    const handleValueChange = (event: React.FormEvent) => {
        setSearchValue((event.target as HTMLButtonElement).value);
    };

    return (
        <>
            <input
                className={`search-bar ${
                    showSearchBox ? 'mobile-search-bar' : 'desktop-search-bar'
                }`}
                name="searchBox"
                value={searchValue}
                type="text"
                // onKeyDown={}
                onChange={handleValueChange}
                placeholder="Search....."
            />
        </>
    );
};

export default SearchBar;
