import AnimeCard from '@/components/AnimeCard';
import Grid from '@/components/Grid';
import HeaderText from '@/components/HeaderText';
import LoadingIndicator from '@/components/LoadingIndicator';
import SearchAnime from '@/components/SearchAnime';
import Colors from '@/constants/Colors';
import Utils from '@/constants/Utils';
import { ANIME, IAnimeResult } from '@consumet/extensions';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

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
        <ScrollView style={styles.container}>
            <HeaderText text='Search'/>

            <SearchAnime onSearchChange={handleSearchChange} />

            {loading && 
                <LoadingIndicator/>}

            <Grid>
                {results?.length === 0
                    ?   <Text style={styles.error}>No results</Text>
                    :   (results?.map(result => (
                            <AnimeCard 
                                key={result.id} 
                                id={result.id} 
                                image={result.image} 
                                title={result.title.toString()}/>
                        )))
                }
            </Grid>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 10
    },
    error: {
        color: Colors.textShy,
        fontSize: 20,
    },
});
