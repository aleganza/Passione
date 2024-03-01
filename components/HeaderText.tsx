import Colors from '@/constants/Colors';
import { StyleSheet, Text } from 'react-native';

interface HeaderTextProps {
    text: string
}

const HeaderText: React.FC<HeaderTextProps> = ({ text }) => {
    return (
        <Text style={styles.text}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: Colors.contrast,
        fontSize: 34,
        fontWeight: 'bold',
        marginLeft: 10
    },
});

export default HeaderText;
