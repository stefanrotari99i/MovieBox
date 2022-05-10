import React, {useState,useEffect, memo} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, VirtualizedList, ActivityIndicator} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons'; 
import GENRE from '../GENRE';


const ORIGINAL_DATA = [];

const Item_2= ({item,navigation}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
            item.map((elem,i) =>(
            <TouchableOpacity style={styles.categoryitem} onPress={() => navigation.push('PostPage',{id:elem.id, type: "movie"})}>
                <TouchableOpacity style={styles.bookmarkwrapp}>
                <Ionicons name="bookmark" size={24} color="#ffff" />
                </TouchableOpacity>
                <Image style={styles.poster} source={{uri: elem.uri}} />
                <Text style={styles.title} numberOfLines={1}>{elem.title}</Text>
                <Text style={styles.category}>{elem.category}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop: 5}}>
                    <Rating
                        type='custom'
                        ratingCount={5}
                        imageSize={15}
                        tintColor='#121212'
                        ratingColor='#ff9f00'
                        ratingBackgroundColor='#66530e'
                        readonly={true}
                        startingValue={elem.rating/2}
                    />
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

const SearchItem = ({navigation, type, route, Query}) => {
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
            const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=329c87031d049e635b2d60f695329362&language=en-US&query='+encodeURIComponent(Query)+'&page='+Page+'&include_adult=false');
            const json = await response.json();
            new_data=json.results;
            var data_=[];
            let totalPages = json.total_pages;
            // new_data[i].media_type == "movie" ? : new_data[i].name
             
           
            for(let i=0;i<new_data.length;i++){
                data_.push({
                "id":new_data[i].id,
                "uri":"https://image.tmdb.org/t/p/original"+new_data[i].poster_path,
                "title": new_data[i].title,
                "category":new_data[i].genre_ids == undefined ? "No genre":GENRE[new_data[i].genre_ids[0]],
                "rating":new_data[i].vote_average,
                }); 
            }  
            // console.log(data_)

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
            // console.log('Error 404 Not found')
            setLoading(false)
        }
    };
    
    
    //use effect
    useEffect(()=>{
        getMovies();
    },[]);

     return (
        <View style={{marginTop: 30 }}>
           <Text style={styles.categorytitle}>Result: {Query}</Text>
           {DATA.length == 0 ? <Text style={{color: '#fff', fontSize: 20, alignSelf: 'center',}}>Sorry :( Nothing founded</Text> :
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({item }) => <Item_2 item={item} navigation={navigation}/>}
                keyExtractor={(item, index) => index.toString()}
                getItemCount={getItemCount}
                getItem={getItem}
                removeClippedSubviews
                onEndReachedThreshold={1}
                onScroll={() => console.log('0000000-------------------0000000000')}
                ListFooterComponent={Footer}
                onEndReached={()=>{
                    getMovies(); 
                }}
                style={{marginBottom: 50}}
            />}
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

    poster: {
        width: 150,
        height: 240,
        borderRadius: 20,
    },

    title: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10,
        width: 150,
        fontFamily: 'NexaBold',
    },

    category: {
        fontSize: 14,
        color: 'rgba(255,255,255, .5)',
        marginTop: 5,
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

export default memo(SearchItem);