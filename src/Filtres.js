import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';


const DATA = [
    {
        id: '1',
        uri: 'https://i.postimg.cc/fbwyMBrC/Generes.png',
        title: 'Genre',

    },

    {
        id: '2',
        uri: 'https://i.postimg.cc/HkmX70Nc/Rating.png',
        title: 'Top IMDb',
        screen: 'ResultPage'
    },

    {
        id: '3',
        uri: 'https://i.postimg.cc/s26h8kg7/Watched.png',
        title: 'Watched',
    },

    {
        id: '4',
        uri: 'https://i.postimg.cc/3w58w9fV/output-onlinepngtools.png',
        title: 'Saved',
    },

    {
        id: '5',
        uri: 'https://i.postimg.cc/rFsFZDtn/random.png',
        title: 'Random',
    }
];


const Item = ({ title, uri, screen, navigation, index}) => {
    return (
        <View style={index==DATA.length? styles.wrapperlast : styles.wrapper}>
            <TouchableOpacity style={styles.categoryitem} onPress={() => navigation.navigate(screen)}>
                <Image style={styles.image} source={{uri: uri}} />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
};

export const Filtres = ({navigation}) => {
    const renderItem = ({ item}) => (
        <Item title={item.title} index={item.id} uri={item.uri} screen={item.screen} navigation={navigation}/>
    );

    return (
        <View style={{marginTop: 30}}>
           <Text style={styles.categorytitle}>Filters</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    categoryitem: {
        width: 72,
        height: 72,
        backgroundColor: 'rgba(196, 196, 196, .1)',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    wrapper: {
        alignItems: 'center', 
        justifyContent:'center', 
        alignContent: 'center',
        marginLeft: 30,
    },

    wrapperlast: {
        alignItems: 'center', 
        justifyContent:'center', 
        alignContent: 'center',
        marginLeft: 30,
        marginRight: 30,
    },

    text: {
        color: '#A0A0A0',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 10,
        fontFamily: 'NexaBold',
    },

    image: {
        width: 32, 
        height: 32,
    },

    categorytitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        paddingLeft: 30,
        fontFamily: 'NexaBold',
    }
}
)