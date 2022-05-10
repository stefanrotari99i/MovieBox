import React from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'

const openiamge = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height / 2;

export const ImageFull = ({uri}) => {
    return(
        <View style={styles.wrapper}>
            <Image style={styles.image} source={{uri: uri}} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'absolute',
        zIndex: 3,
        top: windowHeight / 2,
        backgroundColor: "#000",
    },

    image: {
        width: openiamge,
        height: 350,
    }

})