import React, {useState, memo} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, VirtualizedList, Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

const wwidth = Dimensions.get('window').width;

const ORIGINAL_DATA = [
    {
        "id":"0",
        "uri":"https://content.myconnectsuite.com/api/documents/a1f90e3ca3aa4c45b95beface121c5ba.gif",
        "title":"No data",
        "category":"0",
        "rating":"0"
    }
];

const GENRE=
    {
    28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",
    99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",
    27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",
    10770:"TV Movie",53:"Thriller",10752:"War",37:"Western", 10759:"Action & Adventure", 10762:"Kids", 10763:"News",
    10764:"Reality", 10765:"Sci-Fi & Fantasy", 10766:"Soap", 10767:"Talk", 10768: "War & Politics",
};

const Item = ({ title, uri, category, rating, navigation, id, age}) => {
    return (
        <TouchableOpacity style={styles.categoryitem} onPress={() => navigation.navigate('PostPage',{id:id,})}>
            <View style={styles.ratingwrapp}>
                <AntDesign name="star" size={17} color="black" />
                <Text style={styles.ratingtext}>{rating}</Text>
            </View>
            <Image style={styles.poster} source={{uri: uri}} />
            <View style={{marginLeft: 20, alignItems:'flex-start'}}>
                <Text style={styles.title} numberOfLines={3}>{title}</Text>
                <Text style={styles.category} numberOfLines={3}>{category}</Text>
                <Text style={styles.category}>{age}</Text>
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
    "age": data[index].age
});

const getItemCount = (data) => data.length;

const ResultItem = ({navigation}) => {
    
    const [DATA,setDATA]=useState(ORIGINAL_DATA);
    const [state,setstate]=useState(true);
        
    var new_data;
    const getMovies = async () => {
    if(state)
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=329c87031d049e635b2d60f695329362&language=en-US&page=1');
        const json = await response.json();
        new_data=json.results;
        var data_=[];

        for(let i=0;i<new_data.length;i++){
            var genres_="";
            for(let j=0;j<new_data[i].genre_ids.length;j++)
                genres_= genres_+', '+ GENRE[new_data[i].genre_ids[j]];
            data_.push({
            "id":new_data[i].id,
            "uri":"https://image.tmdb.org/t/p/original"+new_data[i].poster_path,
            "title":new_data[i].title,
            "category":genres_.slice(1, genres_.length),
            "rating":new_data[i].vote_average,
            "age": new_data[i].release_date.slice(0,4)
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
        <View style={{marginTop: 30, paddingHorizontal: 30, marginBottom: 30}}>
           
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}>
                <TouchableOpacity
                style={styles.navigationwrapp} 
                onPress={() => navigation.goBack()}
                >
                    <Ionicons name="ios-chevron-back-sharp" size={24} color={'#fff'} />
                </TouchableOpacity>
                <Text style={styles.categorytitle}>Top IMDb</Text>
            </View>
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({ item }) => <Item id={item.id} title={item.title} uri={item.uri} age={item.age} category={item.category} rating={item.rating} navigation={navigation}/>}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                removeClippedSubviews={true}
                alignItems={'center'}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
    
};

const styles = StyleSheet.create({
    categorytitle: {
        fontSize: 22,
        color: '#fff',
        fontFamily: 'NexaBold'
    },

    categoryitem: {
        shadowColor: '#fff',
        width: wwidth- 60,
        marginBottom: 20,
        flexDirection: 'row',
        backgroundColor: 'rgba(196, 196, 196, .1)',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 15,
        justifyContent: 'flex-start'
    },

    poster: {
        width: 100,
        height: 140,
        borderRadius: 8
    },

    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 22,
        width: 120,
        marginTop: 5,
        fontFamily: 'NexaBold'
    },

    category: {
        fontSize: 14,
        color: 'rgba(255,255,255, .5)',
        marginTop: 20,
        textAlign: 'left',
        maxWidth: 170,
        lineHeight: 20
    },

    ratingtext: {
        color: '#000',
        fontSize: 13,
        fontFamily: 'NexaBlack',
        marginTop: 5,
    },

    navigationwrapp: {
        backgroundColor: 'rgba(0,0,0, .5)',
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 15,
    },

    ratingwrapp: {
        backgroundColor: '#FFAC0B',
        width: 40,
        height: 51,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        position: 'absolute',
        zIndex: 2,
        right: 20,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

});

export default memo(ResultItem);