import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';


const Item = ({ profile_path , name, character, index, lastItem, navigation, peopleid, firstItem}) => {
    return (
        <View style={index == lastItem ? styles.wrapperlast:index == firstItem? styles.wrapperfirst: styles.wrapper}>
            <TouchableOpacity style={styles.categoryitem} onPress={() => navigation.navigate('PeoplePage',{peopleid:peopleid})}>
                <Image style={styles.image} source={{uri: profile_path}} />
            </TouchableOpacity>
            <Text style={styles.name} numberOfLines={2}>{name}</Text>
            <Text style={styles.moviename} lineBreakMode='tail' numberOfLines={2}>{character}</Text>
        </View>
    )
};
//Post Page
export const Cast = ({DATA_CAST, navigation}) => {
    const lastItem = DATA_CAST[DATA_CAST.length - 1];
    const firstItem = DATA_CAST[0]
    const renderItem = ({item}) => (
        <Item profile_path={item.profile_path} navigation={navigation} peopleid={item.cast_id} index={item.cast_id} lastItem={lastItem.cast_id} firstItem={firstItem.cast_id} name={item.name} character={item.character} />
    );

    return (
        <View style={{marginTop: 25}}>
           <Text style={styles.categorytitle}>Cast</Text>
            <FlatList
                data={DATA_CAST}
                renderItem={renderItem}
                keyExtractor={item => item.cast_id}
                horizontal
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
                initialNumToRender={4}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 10
    },

    wrapperlast: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 30,
        marginLeft: 10
    },

    wrapperfirst: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 30,
        marginRight: 10
    },

    categorytitle: {
        paddingLeft: 30,
        color: '#000',
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    
    image: {
        width: 100,
        height: 125,
        borderRadius: 15,
        marginBottom: 15,
    },

    name: {
        fontSize: 14,
        color: '#000',
        fontWeight: '700',
        maxWidth: 100,
        textAlign:'center'
    },

    moviename: {
        color: '#A0A0A0',
        fontWeight: '400',
        fontSize: 13,
        marginTop: 2,
        maxWidth: 100,
        textAlign: 'center',
    }

})