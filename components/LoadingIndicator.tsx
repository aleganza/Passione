import Colors from '@/constants/Colors';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
    marginBottom?: number
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ marginBottom = 10 }) => {
    return (
        <ActivityIndicator
            size="small"
            color={Colors.text}
            style={{ marginBottom: marginBottom }} />
    );
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 10
    }
});

export default LoadingIndicator;
