import React, {useState, memo} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, VirtualizedList} from 'react-native';
import { Rating } from 'react-native-ratings';

const ORIGINAL_DATA = [
    {
        "id":"0",
        "uri":"https://content.myconnectsuite.com/api/documents/a1f90e3ca3aa4c45b95beface121c5ba.gif",
        "title":"Undefinded",
        "category":"0",
        "rating":"0"
    }
];

const GENRE=
    {
    28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",
    99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",
    27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",
    10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};

const Item = ({ title, uri, category, rating, navigation,id, type}) => {
    return (
        <TouchableOpacity style={styles.categoryitem} onPress={() => navigation.push('PostPage',{id:id, type: type})}>
            <Image style={styles.poster} source={{uri: uri}} />
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
        </TouchableOpacity>
    )
};


const getItem = (data, index) => ({
    "id":data[index].id,
    "uri":data[index].uri,
    "title":data[index].title,
    "category":data[index].category,
    "rating":data[index].rating
});

const getItemCount = (data) => data.length;

const RelatedMovie = ({navigation, id, type}) => {
    
    const [DATA,setDATA]=useState(ORIGINAL_DATA);
    const [state,setstate]=useState(true);
        
    var new_data;
    const getMovies = async () => {
        if(state)
        try {
        const response = await fetch('https://api.themoviedb.org/3/'+type+'/' + id +'/similar?api_key=329c87031d049e635b2d60f695329362&language=en-US&page=1');
        const json = await response.json();
        new_data=json.results;
        var data_=[];

        for(let i=0;i<new_data.length;i++){
            data_.push({
            "id":new_data[i].id,
            "uri":"https://image.tmdb.org/t/p/original"+new_data[i].poster_path,
            "title": type == "movie" ? new_data[i].title : new_data[i].name,
            "category":GENRE[new_data[i].genre_ids[0]],
            "rating":new_data[i].vote_average

        }); 

        }  
            setDATA(data_);
            setstate(false);
        } catch (error) {
        console.log("It does not work");
        }
};
  
getMovies();

     return (
        <View style={{marginTop: 30, marginBottom: 20,}}>
           <Text style={styles.categorytitle}>More like this</Text>
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({ item }) => <Item id={item.id} type={type} title={item.title} uri={item.uri} category={item.category} rating={item.rating} navigation={navigation}/>}
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
        color: '#000',
        marginBottom: 15,
        paddingLeft: 30,
        fontSize: 18,
        fontWeight: 'bold'
    },

    categoryitem: {
        marginLeft: 30,
        shadowColor: '#fff',
    },

    poster: {
        width: 125,
        height: 190,
        borderRadius: 20,
    },

    title: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
        width: 120
    },

    category: {
        fontSize: 14,
        color: 'rgba(0,0,0, .5)',
        marginTop: 4
    },

    ratingtext: {
        color: '#fff',
        fontWeight: 'bold',
    },

});

export default memo(RelatedMovie);