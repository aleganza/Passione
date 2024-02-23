import AnimeCard from '@/components/AnimeCard';
import SearchAnime from '@/components/SearchAnime';
import Colors from '@/constants/Colors';
import Utils from '@/constants/Utils';
import { ANIME, IAnimeResult } from '@consumet/extensions';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function TabOneScreen() {
    const [results, setResults] = useState<IAnimeResult[]>();

    const handleSearchChange = (searchText: string) => {
        if(searchText === '') return

        const au = new ANIME.AnimeUnity({ url: Utils.proxyUrl })
        const response = au.search(searchText).then(data => {
            setResults(data.results)
        })
    };

    return (
        <View style={styles.container}>
            <SearchAnime onSearchChange={handleSearchChange} />
            <ScrollView contentContainerStyle={styles.grid}>
                {results?.map(result => (
                    <AnimeCard key={result.id} animeResult={result}></AnimeCard>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    title: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
