import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ModalScreen: React.FC = () => {
    const params = useLocalSearchParams();
    const { id, image } = params;

    useEffect(() => {
        console.log('->', id)
    })

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
                contentFit="cover"
                transition={1000}
                cachePolicy={'none'}
            />
            <Text style={styles.title}>{id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: 120,
        height: 200,
        backgroundColor: Colors.foreground,
        borderRadius: 10
    }
});

export default ModalScreen;
