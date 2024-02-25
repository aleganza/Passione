import AnimeCard from '@/components/AnimeCard';
import Grid from '@/components/Grid';
import Colors from '@/constants/Colors';
import { AnimeLibraryCard } from '@/models/types';
import isExpoGo from '@/modules/isExpoGo';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export default function TabTwoScreen() {
    const [results, setResults] = useState<AnimeLibraryCard[]>([])

    const getAnimeCardsFromLibrary = () => {
        if (!isExpoGo()) {
            const storage = new MMKV()
            const keys = storage.getAllKeys()

            if (keys === undefined) {
                setResults([])
                return
            }

            const data: AnimeLibraryCard[] = []
            for (let key of keys) {
                data.push({
                    animeId: key,
                    animeImage: storage.getString(key) ?? ''
                });
            }

            setResults(data)
        }
    }

    useEffect(() => {
        getAnimeCardsFromLibrary()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Grid>
                {results?.length === 0
                    ? <Text style={styles.noItems}>Library empty</Text>
                    : (results?.map(result => (
                        <AnimeCard 
                            key={result.animeId}
                            id={result.animeId}
                            image={result.animeImage}
                            title={result.animeId}/>
                    )))}
            </Grid>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItems: {
        color: Colors.textShy,
        fontSize: 20,
    },
});
