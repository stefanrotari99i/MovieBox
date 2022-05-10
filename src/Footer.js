import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'


export const Footer = () => {
    return(
        <View style={{flexDirection: 'row',justifyContent:'space-between',  paddingHorizontal: 40, alignItems: 'center', width: '100%', paddingVertical: 20,}}>
            <TouchableOpacity>
                <Image style={styles.icon} source={{uri: 'https://i.postimg.cc/g2VQjvJJ/ri-home-2-fill.png'}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.icon} source={{uri: 'https://i.postimg.cc/kMtm9RxV/ri-play-circle-line.png'}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.icon} source={{uri: 'https://i.postimg.cc/0NNT4zky/ri-search-line.png'}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.icon} source={{uri: 'https://i.postimg.cc/9M6sz1GD/ri-account-circle-line.png'}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    }
})