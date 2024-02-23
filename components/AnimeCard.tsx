import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { IAnimeResult } from '@consumet/extensions';

interface TabOneScreenProps {
    animeResult: IAnimeResult; // Aggiungi questa linea per definire la prop 'diocan'
}

const TabOneScreen: React.FC<TabOneScreenProps> = ({ animeResult }) => {
    useEffect(() => {
        console.log(':',  animeResult.title.toString())
    }, [])

    return (
        <View>
            <Link
                href={{
                    pathname: "/modal",
                    params: {
                        id: animeResult.id,
                        // title: typeof animeResult.title
                        image: animeResult.image ?? ''
                    }
                }}
                asChild
            >
                <Pressable>
                    {({ pressed }) => (
                        <View style={styles.card}>
                            <Image
                                style={[styles.image, {opacity: pressed ? 0.7 : 1 }]}
                                source={animeResult.image}
                                contentFit="cover"
                                transition={1000}
                                cachePolicy={'none'}
                            />
                            <Text style={styles.title}>{animeResult.title.toString()}</Text>
                        </View>
                    )}
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        width: 120,
        height: 300,
    },
    image: {
        width: 120,
        height: 200,
        backgroundColor: Colors.foreground,
        borderRadius: 10
    },
    title: {
        color: Colors.text,
        fontSize: 16
    }
});

export default TabOneScreen;
