import Colors from '@/constants/Colors';
import Utils from '@/constants/Utils';
import { ANIME, IAnimeInfo, IAnimeEpisode } from '@consumet/extensions';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Grid from '@/components/Grid';
import { AnimeVideoPlayer } from '@/components/AnimeVideoPlayer';
import AddToLibrary from '@/components/AddToLibrary';

const ModalScreen: React.FC = () => {
    const params = useLocalSearchParams();
    const { id, image } = params;
    const animeId = typeof id === 'string' ? id : '';

    const [results, setResults] = useState<IAnimeInfo>();
    const [uri, setUri] = useState<string | undefined>('');
    const [title, setTitle] = useState<string | undefined>('');
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)

        const getAnimeInfo = async (animeId: string) => {
            const scraper = new ANIME.AnimeUnity({ url: Utils.proxyUrl });
            const data = await scraper.fetchAnimeInfo(animeId);
            setResults(data);
            setTitle(data.title.toString() ?? '')
            setLoading(false)
        };

        getAnimeInfo(animeId);
    }, [animeId]);

    const loadEpisode = (id: string) => {
        const scraper = new ANIME.AnimeUnity({ url: Utils.proxyUrl })
        const response = scraper.fetchEpisodeSources(id).then(data => {
            setUri(data.sources[0].url)
            setShowPlayer(true)
        })
    }

    return (
        <ScrollView contentContainerStyle={[styles.container,]}>
            <AnimeVideoPlayer uri={uri} show={showPlayer}></AnimeVideoPlayer>
            <Image
                style={styles.image}
                source={image}
                contentFit="cover"
                transition={100}
                cachePolicy={'none'}
            />

            {loading
                ? <ActivityIndicator
                    size="small"
                    color={Colors.text}
                    style={styles.loading} />
                : <>
                    <Text style={styles.title}>{title}</Text>
                    <AddToLibrary animeInfo={results}></AddToLibrary>
                    <Grid>
                        {results?.episodes?.map((episode, index) => (
                            <Pressable key={index} onPress={() => { loadEpisode(episode.id) }}>
                                {({ pressed }) => (
                                    <View style={[styles.episodeCard, { opacity: pressed ? 0.7 : 1 }]}>
                                        <Text style={styles.episodeTitle}>{index}</Text>
                                    </View>
                                )}
                            </Pressable>
                        ))}
                    </Grid>
                </>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20
    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 120,
        height: 200,
        marginTop: 10,
        backgroundColor: Colors.foreground,
        borderRadius: Utils.borderRadius
    },
    episodeTitle: {
        color: Colors.text,
        fontSize: 20,
    },
    episodeCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 45,
        backgroundColor: Colors.foreground,
        borderRadius: Utils.borderRadius
    },
    loading: {
        marginBottom: 10
    }
});

export default ModalScreen;
