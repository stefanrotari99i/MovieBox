import React, {useState, memo} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, VirtualizedList} from 'react-native';
import { Rating } from 'react-native-ratings';
import GENRE from './GENRE';

const ORIGINAL_DATA = [
    {
        "id":"0",
        "uri":"https://content.myconnectsuite.com/api/documents/a1f90e3ca3aa4c45b95beface121c5ba.gif",
        "title":"Undefinded",
        "category":"0",
        "rating":"0"
    }
];

const Item = ({ title, uri, category, rating, navigation,id, type}) => {
    return (
        <TouchableOpacity style={styles.categoryitem} onPress={() => navigation.push('PostPage',{id:id, type: type})}>
            <TouchableOpacity style={styles.bookmarkwrapp}>
                <Image style={styles.bookmark} source={require('../assets/Bookmark.png')} />
            </TouchableOpacity>
            <Image style={styles.poster} source={{uri: uri}} />
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop: 5}}>
                <Rating
                    type='custom'
                    ratingCount={5}
                    imageSize={15}
                    tintColor='#121212'
                    ratingColor='#ff9f00'
                    ratingBackgroundColor='#66530e'
                    readonly={true}
                    startingValue={rating/2}
                />
                <Text style={styles.ratingtext}>{(rating/2).toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    )
};


const getItem = (data, index) => ({
    "id":data[index].id,
    "uri":data[index].uri,
    "title":data[index].title,
    "category":data[index].category,
    "rating":data[index].rating,
    "type": data[index].type
});

const getItemCount = (data) => data.length;

const PeopleMovie = ({navigation, peopleid}) => {

    const [DATA,setDATA]=useState(ORIGINAL_DATA);
    const [state,setstate]=useState(true);
        
    var new_data;
    const getMovies = async () => {
        if(state)
        try {

            
        const response = await fetch('https://api.themoviedb.org/3/person/'+peopleid+'/combined_credits?api_key=329c87031d049e635b2d60f695329362&language=en-US');
        const json = await response.json();
        new_data=json.cast;
        var data_=[];

        for(let i=0;i<new_data.length;i++){
              data_.push({
            "id":new_data[i].id,
            "uri":"https://image.tmdb.org/t/p/original"+new_data[i].poster_path,
            "title": new_data[i].media_type == "movie" ? new_data[i].title : new_data[i].name,
            "category":GENRE[new_data[i].genre_ids[0]],
            "rating":new_data[i].vote_average,
            "type":new_data[i].media_type

        }); 

        }  
            setDATA(data_);
            setstate(false);
        } catch (error) {
        console.error(error);
        }
    };
  
    getMovies();

     return (
        <View style={{marginTop: 5, marginBottom: 20}}>
           <Text style={styles.categorytitle}>Know for</Text>
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({ item }) => <Item id={item.id} type={item.type} title={item.title} uri={item.uri} category={item.category} rating={item.rating} navigation={navigation}/>}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal
                removeClippedSubviews
            />
        </View>
    );
    
};

const styles = StyleSheet.create({
    categorytitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
        paddingLeft: 30,
        fontFamily: 'NexaBold'
    },

    categoryitem: {
        marginLeft: 30,
        shadowColor: '#fff',
    },

    poster: {
        width: 160,
        height: 210,
        borderRadius: 20,
    },

    title: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
        width: 150,
        fontFamily: 'NexaBold'
    },

    category: {
        fontSize: 14,
        color: 'rgba(255,255,255, .5)',
        marginTop: 4,
        fontFamily: 'NexaRegular',
    },

    ratingtext: {
        color: '#fff',
        fontWeight: 'bold',
    },

    bookmark: {
        width: 18,
        height: 18,
    },

    bookmarkwrapp: {
        position: 'absolute',
        zIndex: 2,
        top: 15,
        right: 15,
        width: 42,
        height: 42,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, .6)',
    }
});

export default memo(PeopleMovie);