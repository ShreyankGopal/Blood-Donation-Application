import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchResult, setSearchResult] = useState(null);

    return (
        <SearchContext.Provider value={{ searchResult, setSearchResult }}>
            {children}
        </SearchContext.Provider>
    );
};
