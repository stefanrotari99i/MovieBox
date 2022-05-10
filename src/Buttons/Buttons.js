import {TouchableOpacity, Text, StyleSheet} from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const PrimaryButton = ({state}) => {
    console.log(state)
    return(
        <TouchableOpacity style={{marginTop: 30, position: 'absolute', width: '100%', left: 0, zIndex: 2, bottom: 40, display: {state}}}>
            <LinearGradient colors={['#000', '#000']} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={styles.gradient}> 
                <Text style={styles.text}>Add to watchlist</Text>
                <MaterialCommunityIcons name="bookmark-plus" size={38} color="#fff" />
            </LinearGradient>
            <LinearGradient pointerEvents="none" colors={['rgba(255,255,255, 1)', 'rgba(255,255,255, 0)']} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={styles.gradient2}> 
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    gradient: {
        marginHorizontal: 30,
        paddingVertical: 8,
        paddingHorizontal: 3,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        zIndex: 2,
    },

    gradient2: {
        width: '100%',
        height: 240,
        position: 'absolute',
        zIndex: 1,
        bottom: -50,
        
    },

    text: {
        color: 'rgba(255,255,255, .9)',
        fontSize: 15    ,
        marginLeft: 20,
        fontWeight: '500'
    }

})