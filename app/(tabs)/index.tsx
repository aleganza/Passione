import AnimeCard from '@/components/AnimeCard';
import SearchAnime from '@/components/SearchAnime';
import Colors from '@/constants/Colors';
import Utils from '@/constants/Utils';
import { ANIME, IAnimeResult } from '@consumet/extensions';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

export default function TabOneScreen() {
    const [results, setResults] = useState<IAnimeResult[]>()
    const [text, setText] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleSearchChange = (searchText: string) => {
        if(searchText === '') {
            setLoading(false)
            setResults([])
            return
        }

        setLoading(true)

        const au = new ANIME.AnimeUnity({ url: Utils.proxyUrl })
        const response = au.search(searchText).then(data => {
            setResults(data.results)
            setLoading(false)
        })
    };

    return (
        <View style={styles.container}>
            <SearchAnime onSearchChange={handleSearchChange} />
            {loading && 
                <ActivityIndicator 
                    size="small" 
                    color={Colors.text}
                    style={styles.loading} />}
            <ScrollView contentContainerStyle={styles.grid}>
                {results?.length === 0
                    ?
                    <Text style={styles.error}>No results</Text>
                    :
                    <>
                        {results?.map(result => (
                            <AnimeCard key={result.id} animeResult={result}></AnimeCard>
                        ))}
                    </>
                }
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
    loading: {
        marginBottom: 10
    },
    error: {
        color: Colors.textShy,
        fontSize: 20,
    },
});
