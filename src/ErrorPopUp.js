import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { View, Text, StyleSheet } from "react-native"


export const ErrorPopUp = () => {
    return(
        <View style={styles.wrapper}>
            <Text style={styles.text}>You have problem with connection</Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        wrapper: {
            backgroundColor: "#000",
            paddingHorizontal: 20,
            paddingVertical: 15,
            position: 'absolute',
            bottom: 50,
            width: '100%'
        },

        text: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 15
        }
    }
)