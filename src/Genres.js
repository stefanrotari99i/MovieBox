import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

const GENRE=
    [
    {"id":"0","name":"All"},
    {"id":"28","name":"Action"},
    {"id": "12","name": "Adventure"},
    {"id": "35", "name": "Comedy"},
    {"id": "80", "name": "Crime"},
    {"id": "99", "name": "Documentary"},
    {"id": "18", "name": "Drama"},
    {"id": "10751", "name": "Family"},
    {"id": "14", "name": "Fantasy"},
    {"id": "36", "name": "History"},
    {"id": "27", "name": "Horror"},
    {"id": "10402", "name": "Music"},
    {"id": "9648", "name": "Mystery"},
    {"id": "10749", "name": "Romance"},
    {"id": "878", "name": "Science Fiction"},
    {"id": "10770", "name": "TV Movie"},
    {"id": "53", "name": "Thriller"},
    {"id": "10752", "name": "War"},
    {"id": "37", "name": "Western"},
    {"id": "10759", "name": "Action & Adventure"},
    {"id": "10762", "name": "Kids"},
    {"id": "10763", "name": "News"},
    {"id": "10764", "name": "Reality"},
    {"id": "10765", "name": "Sci-Fi & Fantasy"},
    {"id": "10766", "name": "Soap"},
    {"id": "10767", "name": "Talk"},
    {"id": "10768", "name": "War & Politics"},
    ];

const lastItem = GENRE[GENRE.length - 1];

const Item = ({ title, index, navigation }) => {
    return (
        <TouchableOpacity style={index ==lastItem.id ? styles.categoryitemlast:styles.categoryitem} onPress={() => navigation.navigate('DiscoverPage',{genreid:index})}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
};

export const Genres = ({navigation}) => {
    const renderItem = ({ item}) => (
        <Item title={item.name} index={item.id} navigation={navigation}/>
    );

    return (
        <View style={{marginTop: 22}}>
            <FlatList
                data={GENRE}
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
        backgroundColor: 'rgba(196, 196, 196, .1)',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        paddingHorizontal: 18,
        paddingVertical: 10
    },

    categoryitemlast: {
        backgroundColor: '#1b1b1f',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        paddingHorizontal: 18,
        paddingVertical: 10
    },

    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
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