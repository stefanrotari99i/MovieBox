import React, {useState,useEffect, memo} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, VirtualizedList, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
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

const Item_2= ({item,navigation}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
            item.map((elem,i) =>(
            <TouchableOpacity style={styles.categoryitem} onPress={() => navigation.push('PostPage',{id:elem.id, type: "movie"})}>
                <TouchableOpacity style={styles.bookmarkwrapp}>
                    <Image style={styles.bookmark} source={require('../assets/Bookmark.png')} />
                </TouchableOpacity>
                <View style={styles.ratingwrapp}>
                    <AntDesign name="star" size={17} color="black" />
                    <Text style={styles.ratingtext}>{elem.rating}</Text>
                </View>
                <Image style={styles.poster} source={{uri: elem.uri}} />
                <Text style={styles.title} numberOfLines={1}>{elem.title}</Text>
                <Text style={styles.category}>{elem.category}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop: 5}}>
                    <Text style={styles.ratingtext}>{(elem.rating/2).toFixed(1)}</Text>
                </View>
            </TouchableOpacity>
                ))}
        </View>
    )
};


const getItem = (data, index) => {
    let duo=[]
    for (let i = 0; i < 2; i++) {
        if(index*2+i<data.length){
            const item ={
                "id":data[index*2+i].id,
                "uri":data[index*2+i].uri,
                "title":data[index*2+i].title,
                "category":data[index*2+i].category,
                "rating":data[index*2+i].rating
            }
            item && duo.push(item)
        }
    }
    return duo;
    }

const getItemCount = (data) => Math.ceil(data.length/2);

const DiscoverItem = ({navigation, type, route}) => {
    const [loading, setLoading] = useState(true);
    const genreid = route.params;
    const [Page, setpage] = useState(1);
    const [DATA,setDATA]=useState(ORIGINAL_DATA);
    var new_data;

    const Footer = () => {
        return(
            <View>
                {loading ? (
                    <ActivityIndicator color="white" style={{marginLeft: 8}} size="large"/>
                ) : null}
            </View>
        )
    }

    const getMovies = async () => {
        setLoading(true)
        try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=329c87031d049e635b2d60f695329362&language=en-US&sort_by=popularity.desc&include_adult=false&page='+Page+'&with_genres=' + genreid.genreid);
            const json = await response.json();
            new_data=json.results;
            var data_=[];

            for(let i=0;i<new_data.length;i++){
                data_.push({
                "id":new_data[i].id,
                "uri":"https://image.tmdb.org/t/p/original"+new_data[i].poster_path,
                "title": type == "movie" ? new_data[i].title : new_data[i].name,
                "category":GENRE[new_data[i].genre_ids[0]],
                "rating":new_data[i].vote_average,
                }); 
            }  

            if(DATA.length == 1){
                setDATA(data_);
                setpage(Page+1);
            } else {
                let MockData = DATA;
                MockData = MockData.concat(data_);
                setDATA(MockData);
                setpage(Page+1);
            }
            setLoading(false)
        } 
        
        catch (error) {
            setLoading(false)
        }
    };
    
    
    //use effect
    useEffect(()=>{
        getMovies();
    },[]);

     return (
        <View style={{marginTop: 30 }}>
           <Text style={styles.categorytitle}>Result for genre: {genreid.name}</Text>
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({item }) => <Item_2 item={item} navigation={navigation}/>}
                keyExtractor={(item, index) => index.toString()}
                getItemCount={getItemCount}
                getItem={getItem}
                removeClippedSubviews
                onEndReachedThreshold={1}
                ListFooterComponent={Footer}
                onEndReached={()=>{
                    getMovies(); 
                }}
                style={{marginBottom: 50}}
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    categorytitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        paddingLeft: 30,
        fontFamily: 'NexaBold'
    },

    categoryitem: {
        marginLeft: 30,
        marginBottom: 30,
        shadowColor: '#fff',
    },

    ratingwrapp: {
        backgroundColor: '#FFAC0B',
        width: 50,
        height: 55,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 20,
        position: 'absolute',
        zIndex: 2,
        right: 0,
        bottom: 66,
        alignItems: 'center',
        justifyContent: 'center'
    },

    poster: {
        width: 150,
        height: 240,
        borderRadius: 20,
    },

    title: {
        fontSize: 15,
        color: '#fff',
        marginTop: 10,
        width: 150,
        fontFamily: 'NexaBold'
    },

    category: {
        fontSize: 14,
        color: 'rgba(255,255,255, .5)',
        marginTop: 5,
        fontFamily: 'NexaRegular',
    },

    ratingtext: {
        color: '#000',
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'NexaBlack'
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

export default memo(DiscoverItem);