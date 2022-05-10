import React, { useState,useRef } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import { ImageFull } from './ImageFull';

const openiamge = Dimensions.get('window').width
const DATA = [
    {
        id: '1',
        uri: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/01/Peacemaker-crying.jpg',
    },

    {
        id: '2',
        uri: 'https://assets.cdn.moviepilot.de/files/9f2df0e3293ca5a0e2a690fadfb82c9692c9720f388516ab7d4aa7a6de9c/limit/1024/2000/john-cena_0.jpg',
    },

    {
        id: '3',
        uri: 'https://i.insider.com/61f1638be996470011907764?width=1136&format=jpeg',
    },

    {
        id: '4',
        uri: 'https://img.netzwelt.de/dw1200_dh675_sw3840_sh2160_sx0_sy0_sr16x9_nu0/picture/original/2022/02/peacemaker-332550.jpeg',
    },

    {
        id: '5',
        uri: 'https://sm.ign.com/t/ign_de/video/p/peacemaker/peacemaker-exclusive-red-band-trailer_jyyc.1200.jpg',
    }
];




export const MoviePhoto = () => {
    const renderItem = ({ item}) => (
        <Item uri={item.uri} index={item.id}/>
    );
    const flatlistRef = useRef()
     
      const Item = ({ uri}) => {

        return (
            <View style={styles.wrapper}>
                <TouchableOpacity
                 style={styles.categoryitem}
                 onPress={() => <ImageFull uri={uri} />} >
                    <Image source={{uri: uri}}  style={styles.image}/>
                </TouchableOpacity>
            </View>
        )
    
    };




    return (
        <View style={{marginTop: 25}}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={flatlistRef}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 30,
    },

    image: {
        width: 200,
        height: 120,
        borderRadius: 15,
    },

    // imageopen: {
    //     width: openiamge,
    //     height: 300,
    // },

    categoryitem: {
        // paddingRight: 150,
    },

    openImage: {
        position: 'absolute',
        zIndex: 5,
        flex: 1,
        
    },

    imageFull: {
        width: openiamge,
        height: 300,
    }

})