import { ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

interface AnimeVideoPlayerProps {
    uri: string | undefined
    show: boolean
}

export const AnimeVideoPlayer: React.FC<AnimeVideoPlayerProps> = ({ uri = '', show = false }) => {
    const videoRef = useRef<Video>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(show);

    const handleFullscreenUpdate = (status: { fullscreenUpdate: 0 | 1 | 2 | 3 }) => {
        if (status.fullscreenUpdate === 3) {
            setShowPlayer(false)
            setIsFullscreen(false);
            videoRef?.current?.pauseAsync();
        }
    };

    return (
        <View style={showPlayer ? { display: 'flex' } : { display: 'none' }}>
            <Video
                source={{ uri: uri }}
                ref={videoRef}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={true}
                useNativeControls
                onFullscreenUpdate={handleFullscreenUpdate}
                onLoad={() => {
                    videoRef?.current?.presentFullscreenPlayer();
                    videoRef?.current?.playAsync();
                    setIsFullscreen(true);
                    setShowPlayer(true)
                }}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    video: {
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
    }
});
