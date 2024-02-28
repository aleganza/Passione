import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { IAnimeInfo, IAnimeResult } from '@consumet/extensions';
import Utils from '@/constants/Utils';

interface EpisodesViewerProps {
    animeInfo: IAnimeInfo | undefined
    onChangeEpisodes: (page: number) => void 
}

type EpisodesPage = {
    page: number
    first: number
    last: number
}

const EpisodesViewer: React.FC<EpisodesViewerProps> = ({ animeInfo, onChangeEpisodes }) => {
    if (!animeInfo?.totalEpisodes)
        return <Text>Anime information is not available.</Text>;

    if(animeInfo.totalPages == 1)
        return <></>

    const [data, setData] = useState<EpisodesPage[]>([])

    const displayData = () => {
        const array: EpisodesPage[] = []
        const pages = animeInfo?.totalPages!

        for (let i = 1; i <= pages; i++) {
            array.push({
                page: i,
                first: i * 120 - 119,
                last: i === pages ? animeInfo?.totalEpisodes! : i * 120
            })
        }

        setData(array)
    }

    useEffect(() => {
        displayData()
    }, [])

    const renderItem = ({ item }: { item: EpisodesPage }) => (
        <Pressable onPress={() => {onChangeEpisodes(item.page)}}>
            {({ pressed }) => (
                <View style={[styles.button, { opacity: pressed ? 0.7 : 1 }]}>
                    <Text style={styles.text}>
                        {item.first} - {item.last}
                    </Text>
                </View>
            )}
        </Pressable>
    )

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                horizontal
                style={styles.list}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.page.toString()}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: Colors.foreground,
        borderWidth: 1,
        borderColor: Colors.textShy,
        borderRadius: Utils.borderRadius,
        padding: 10
    },
    text: {
        color: Colors.text
    }
});

export default EpisodesViewer;
