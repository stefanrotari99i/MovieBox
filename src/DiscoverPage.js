import { SafeAreaView, StyleSheet, Text} from "react-native"
import DiscoverItem from "./DiscoverItem"


export const DiscoverPage = ({navigation, route}) => {
    return(
        <SafeAreaView style={styles.container}>
            <DiscoverItem navigation={navigation} route={route} type={'movie'}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090F',
    }
})
