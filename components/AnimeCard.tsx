import Colors from '@/constants/Colors';
import Utils from '@/constants/Utils';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface AnimeCardProps {
    id: string
    image: string | undefined
    title: string | undefined
}

const AnimeCard: React.FC<AnimeCardProps> = ({ id, image, title }) => {
    useEffect(() => {
    }, [])

    return (
        <View>
            <Link
                href={{
                    pathname: "/AnimePage",
                    params: {
                        id: id,
                        image: image ?? ''
                    }
                }}
                asChild
            >
                <Pressable>
                    {({ pressed }) => (
                        <View style={[styles.card, {opacity: pressed ? 0.7 : 1 }]}>
                            <Image
                                style={styles.image}
                                source={image ?? ''}
                                contentFit="cover"
                                transition={1000}
                                cachePolicy={'none'}
                            />
                            <Text
                                style={styles.title}
                                numberOfLines={2}
                                ellipsizeMode='tail'>
                                    {title}
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
        borderRadius: Utils.borderRadius
    },
    title: {
        marginTop: 8,
        color: Colors.text,
        // fontWeight: 'bold',
        fontSize: 15,
        // height: 40
    }
});

export default AnimeCard;
