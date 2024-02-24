import Colors from '@/constants/Colors';
import Utils from '@/constants/Utils';
import { IAnimeInfo } from '@consumet/extensions';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv'
import isExpoGo from '@/modules/isExpoGo';

interface AddToLibraryProps {
    animeInfo: IAnimeInfo | undefined
}

const AddToLibrary: React.FC<AddToLibraryProps> = ({ animeInfo }) => {
    const [inLibrary, setInLibrary] = useState<boolean>(false)

    const addToLibrary = () => {
        setInLibrary(true)
        
        if(!isExpoGo()) {
            const storage = new MMKV()
            storage.set(animeInfo!.id!, animeInfo?.cover ?? '')
        }
    }
    
    const removeFromLibrary = () => {
        setInLibrary(false)

        if(!isExpoGo()) {
            const storage = new MMKV()
            storage.delete(animeInfo!.id!)
        }
    }

    return (
        <Pressable onPress={inLibrary ? removeFromLibrary : addToLibrary}>
            {({ pressed }) => (
                <View style={[styles.button, inLibrary ? styles.buttonDisabled : styles.buttonEnabled, { opacity: pressed ? 0.7 : 1 }]}>
                    {inLibrary
                        ? <>
                            <Feather name="check" size={24} color={Colors.text} />
                            <Text style={[styles.buttonText, {color: Colors.text}]}>Remove from library</Text>
                        </>
                        : <>
                            <AntDesign name="plus" size={24} color={Colors.primary} />
                            <Text style={[styles.buttonText, {color: Colors.primary}]}>Add to library</Text>
                        </>}
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        padding: 10,
        borderRadius: Utils.borderRadius,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    buttonEnabled: {
        backgroundColor: Colors.transparent,
    },
    buttonDisabled: {
        backgroundColor: Colors.primary,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    },
});

export default AddToLibrary;
