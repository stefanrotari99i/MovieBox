import { SafeAreaView, StyleSheet, Text} from "react-native"
import SearchItem from "./SearchItem"


export const SearchPage = ({navigation, route}) => {
    const query = route.params.Query;
    return(
        <SafeAreaView style={styles.container}>
            <SearchItem navigation={navigation} route={route} Query={query}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090F',
    }
})
