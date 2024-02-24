import AnimeCard from '@/components/AnimeCard';
import Grid from '@/components/Grid';
import SearchAnime from '@/components/SearchAnime';
import Colors from '@/constants/Colors';
import Utils from '@/constants/Utils';
import { ANIME, IAnimeResult } from '@consumet/extensions';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

export default function TabOneScreen() {
    const [results, setResults] = useState<IAnimeResult[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleSearchChange = (searchText: string) => {
        if(searchText === '') {
            setLoading(false)
            setResults([])
            return
        }

        setLoading(true)

        const scraper = new ANIME.AnimeUnity({ url: Utils.proxyUrl })
        const response = scraper.search(searchText).then(data => {
            setResults(data.results)
            setLoading(false)
        })
    };

    return (
        <ScrollView>
            <SearchAnime onSearchChange={handleSearchChange} />
            
            {loading && 
                <ActivityIndicator 
                    size="small" 
                    color={Colors.text}
                    style={styles.loading} />}

            <Grid>
                {results?.length === 0
                    ?   <Text style={styles.error}>No results</Text>
                    :   (results?.map(result => (
                            <AnimeCard key={result.id} animeResult={result}></AnimeCard>
                        )))
                }
            </Grid>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 10
    },
    error: {
        color: Colors.textShy,
        fontSize: 20,
    },
});
