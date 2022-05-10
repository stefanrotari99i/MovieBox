import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'


export const Header = () => {
    return(
        <View style={{flexDirection: 'row',justifyContent:'space-between',  paddingHorizontal: 30, marginTop: 30,}}>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>Hello</Text>
                    <Text style={styles.name}>Stefan!</Text>
                </View>
                <Text style={styles.subtitle}>Check for latest addition.</Text>
            </View>
            <TouchableOpacity style={styles.avatarwrapp}>
                <Image style={styles.avatar} source={{uri: 'https://scontent-frx5-2.xx.fbcdn.net/v/t39.30808-1/275624321_2748479852119857_6979623861949743860_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=bWgZ5le5psAAX8NPKuq&_nc_ht=scontent-frx5-2.xx&oh=00_AT-5qMVH4A_xkfmhn-FaRmzUDL124rozbr1sD0KNakleXg&oe=626C6D68'}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 50,
        
    },

    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },

    title: {
        fontSize: 24,
        color: '#f5c518',
        fontWeight: 'bold',
    },

    name: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8
    },

    subtitle: {
        fontSize: 14,
        color: '#A0A0A0',
        fontWeight: '700',
        marginTop: 4,

    },

    avatarwrapp: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, .1)',
        borderRadius: 50
    }
})