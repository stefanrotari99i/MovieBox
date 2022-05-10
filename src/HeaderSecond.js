import React, {useState} from 'react'
import { View, TouchableOpacity, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 


export const HeaderSecond = ({navigation}) => {
    const [Heart, setHeart] = useState('#fff');

    const Toggle = () => {
        if(Heart == '##ff002e') {
            setHeart('#fff')
        } else {
            setHeart('#ff002e')
        }
    }

    return(
        <View style={styles.header}>
            <TouchableOpacity
             style={styles.navigationwrapp} 
             onPress={() => navigation.goBack()}
             >
                <Ionicons name="arrow-back" size={22} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationwrapp} onPress={() => Toggle()}>
                <Ionicons name="ios-heart-sharp" size={22} color= {Heart} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',  
        paddingHorizontal: 30, 
        marginBottom: 30,
        marginTop: 70,
        position: 'absolute',
        zIndex: 2,
        width: '100%',
    },

    navigationwrapp: {
        backgroundColor: 'rgba(255,255,255, .2)',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },

})