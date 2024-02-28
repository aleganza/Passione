import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { Pressable, StyleSheet, View, Text, ScrollView } from 'react-native';
import { IAnimeResult } from '@consumet/extensions';

interface GridProps {
    children: ReactNode
}

const Grid: React.FC<GridProps> = ({ children }) => {
    return (
        <View style={styles.grid}>
            <>{children}</>
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 50
    },
});

export default Grid;
