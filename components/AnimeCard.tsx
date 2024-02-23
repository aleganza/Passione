import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { IAnimeResult } from '@consumet/extensions';

interface TabOneScreenProps {
    animeResult: IAnimeResult
}

const TabOneScreen: React.FC<TabOneScreenProps> = ({ animeResult }) => {
    useEffect(() => {
    }, [])

    return (
        <View>
            <Link
                href={{
                    pathname: "/AnimePage",
                    params: {
                        id: animeResult.id,
                        image: animeResult.image ?? ''
                    }
                }}
                asChild
            >
                <Pressable>
                    {({ pressed }) => (
                        <View style={[styles.card, {opacity: pressed ? 0.7 : 1 }]}>
                            <Image
                                style={styles.image}
                                source={animeResult.image}
                                contentFit="cover"
                                transition={1000}
                                cachePolicy={'none'}
                            />
                            <Text
                                style={styles.title}
                                numberOfLines={2}
                                ellipsizeMode='tail'>
                                    {animeResult.title.toString()}
                            </Text>
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
        // height: 300,
    },
    image: {
        width: 120,
        height: 200,
        backgroundColor: Colors.foreground,
        borderRadius: 10
    },
    title: {
        marginTop: 8,
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 15,
        // height: 40
    }
});

export default TabOneScreen;
