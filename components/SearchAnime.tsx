import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

type SearchAnimeProps = {
    onSearchChange: (searchText: string) => void;
};

const SearchAnime: React.FunctionComponent<SearchAnimeProps> = ({ onSearchChange }) => {
    const [search, setSearch] = useState("");
    const [debounce, setDebounce] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (debounce) {
                clearTimeout(debounce);
            }
        };
    }, [debounce]);

    const updateSearch = (searchText: string) => {
        setSearch(searchText);

        if (debounce) clearTimeout(debounce);

        const newDebounce = setTimeout(() => {
            onSearchChange(searchText);
        }, 300);

        setDebounce(newDebounce);
    };

    return (
        <SearchBar
            placeholder="Search..."
            platform='ios'
            onChangeText={updateSearch}
            value={search}
            clearIcon={{ type: 'antdesign', name: 'close' }}
            searchIcon={{ type: 'antdesign', name: 'search1' }}
            inputStyle={{ color: Colors.text }}
            inputContainerStyle={{ backgroundColor: Colors.background, paddingBottom: 0 }}
            containerStyle={{ backgroundColor: Colors.overlay }}
        />
    );
};

const styles = StyleSheet.create({
});

export default SearchAnime;
