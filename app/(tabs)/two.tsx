import AnimeCard from '@/components/AnimeCard';
import Grid from '@/components/Grid';
import HeaderText from '@/components/HeaderText';
import Colors from '@/constants/Colors';
import { AnimeLibraryCard } from '@/models/types';
import isExpoGo from '@/modules/isExpoGo';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export default function TabTwoScreen() {
    const [results, setResults] = useState<AnimeLibraryCard[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const getAnimeCardsFromLibrary = () => {
        if(isExpoGo()) return

        const storage = new MMKV()
        const keys = storage.getAllKeys()

        if (keys === undefined) {
            setResults([])
            return
        }

        var data: AnimeLibraryCard[] = []
        for (let key of keys) {
            data.push({
                animeId: key,
                animeImage: storage.getString(key) ?? ''
            });
        }

        setResults(data)
    }

    useEffect(() => {
        getAnimeCardsFromLibrary()
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);

        getAnimeCardsFromLibrary()
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <HeaderText text='Library'/>

            <View style={styles.view}>
                <Grid>
                    {results?.length === 0
                        ? <Text style={styles.noItems}>Library empty{"\n"}Scroll down to refresh</Text>
                        : (results?.map(result => (
                            <AnimeCard
                                key={result.animeId}
                                id={result.animeId}
                                image={result.animeImage}
                                title={result.animeId} />
                        )))}
                </Grid>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: 100,
        paddingHorizontal: 10,
    },
    view: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noItems: {
        textAlign: 'center',
        color: Colors.textShy,
        fontSize: 20,
    },
});
