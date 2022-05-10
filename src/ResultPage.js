import { SafeAreaView, StyleSheet, ImageBackground} from "react-native"
import ResultItem from "./ResultItem";
import { LinearGradient } from 'expo-linear-gradient';


export const ResultPage = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <ImageBackground  source={{uri: 'https://i.ibb.co/fvgRfKN/Background.png'}} style={styles.gradient} resizeMode='cover' />
            <ResultItem navigation={navigation} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090F',
    },

    gradient: {
        flex: 1,
        height: '150%',
        width: '100%',
        position: 'absolute',
    },
})
