import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hooks';

import { setStateNameSearch } from '../../../features/index';

import { SearchBarProps } from '../../../Types';

const SearchBar = ({ showSearchBox, viewPort }: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // for search on post
    const handleValueChange = useCallback((event: any) => {
        setSearchValue((event.target as HTMLButtonElement).value);
    }, []);

    const handleSearch = (event: any) => {
        if (event.key === 'Enter' && searchValue !== '') {
            const text = searchValue;
            setSearchValue('');
            dispatch(
                setStateNameSearch({
                    stateName: 'searchPosts',
                    stateValue: [],
                }),
            );

            navigate(`/post/search?text=${text}`);
        }
    };

    return (
        <>
            <input
                data-testid={`${
                    viewPort === 'desktop'
                        ? 'desktop-header-search'
                        : 'mobile-header-search'
                }`}
                className={`search-bar ${
                    viewPort === 'desktop'
                        ? 'desktop-search-bar'
                        : showSearchBox
                        ? 'mobile-search-bar'
                        : 'hidden-search-bar'
                }`}
                name="searchBox"
                value={searchValue}
                type="text"
                onKeyDown={handleSearch}
                onChange={handleValueChange}
                placeholder="Search....."
            />
        </>
    );
};

export default SearchBar;
