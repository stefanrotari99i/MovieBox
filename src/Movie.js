import React, {useState, memo} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, VirtualizedList} from 'react-native';
import { Rating } from 'react-native-ratings';
import { ErrorPopUp } from './ErrorPopUp';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import GENRE from './GENRE';



const ORIGINAL_DATA = [
    {
        "id":"0",
        "uri":"https://content.myconnectsuite.com/api/documents/a1f90e3ca3aa4c45b95beface121c5ba.gif",
        "title":"No data",
        "category":"0",
        "rating":"0"
    }
];


const Item = ({ title, uri, category, rating, navigation,id, type,index,length}) => {
    const TV = () => {
        
        if(type == 'tv'){
            return(
                <Text style={styles.type}>TV Series</Text>
            )
        }

        return null
    }


    const [Heart, setHeart] = useState('#fff');
    const Toggle = () => {
        if(Heart == '#ff002e') {
            setHeart('#fff')
        } else {
            setHeart('#ff002e')
        }
    }

    return (
        <TouchableOpacity style={index==length-1?styles.categoryitemlast:styles.categoryitem} onPress={() => navigation.navigate('PostPage',{id:id, type: type})}>
            <TouchableOpacity style={styles.bookmarkwrapp} onPress={() => Toggle()}>
                <Ionicons name="md-heart-sharp" size={20} color={Heart} />
            </TouchableOpacity>
            {/* <TV /> */}
            <View style={styles.ratingwrapp}>
                <AntDesign name="star" size={17} color="black" />
                <Text style={styles.ratingtext}>{rating}</Text>
            </View>
            <Image style={styles.poster} source={{uri: uri}} />
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop: 5}}>
            </View>
        </TouchableOpacity>
    )
};


const getItem = (data, index) => ({
    "index":index,
    "id":data[index].id,
    "uri":data[index].uri,
    "title":data[index].title,
    "category":data[index].category,
    "rating":data[index].rating
});

const getItemCount = (data) => data.length;

const Movie = ({navigation, type, category_title}) => {
    
    const [DATA,setDATA] = useState(ORIGINAL_DATA);
    const [state,setstate] = useState(true);
        
    var new_data;
    const getMovies = async () => {
        if(state)
            try {
                const response = await fetch('https://api.themoviedb.org/3/'+ type +'/popular?api_key=329c87031d049e635b2d60f695329362&language=en-US&page=1');
                const json = await response.json();
                new_data=json.results;
                var data_=[];                
            
                for(let i=0;i<new_data.length;i++){
                    data_.push({
                    "id":new_data[i].id,
                    "uri":"https://image.tmdb.org/t/p/w500" + new_data[i].poster_path,
                    "title": type == "movie" ? new_data[i].title : new_data[i].name,
                    "category":GENRE[new_data[i].genre_ids[0]],
                    "rating":new_data[i].vote_average});
                } 

                setDATA(data_);
                setstate(false);

            } catch (error) {
                return(
                    <ErrorPopUp />
                )
            }
};
  
getMovies();

     return (
        <View style={{marginTop: 30}}>
           <Text style={styles.categorytitle}>{category_title}</Text>
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({ item}) => <Item length={DATA.length} index={item.index} id={item.id} type={type} title={item.title} uri={item.uri} category={item.category} rating={item.rating} navigation={navigation}/>}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
            />
        </View>
    );
    
};

const styles = StyleSheet.create({
    categorytitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        paddingLeft: 30,
        fontFamily: 'NexaBold',
    },

    categoryitem: {
        marginLeft: 30,
        shadowColor: '#fff',
    },

    categoryitemlast: {
        marginLeft: 30,
        marginRight: 30,
        shadowColor: '#fff',
    },

    poster: {
        width: 190,
        height: 290,
        borderRadius: 20,
    },

    title: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'NexaBold',
        marginTop: 15,
        width: 190
    },

    category: {
        fontSize: 14,
        color: 'rgba(255,255,255, .5)',
        marginTop: 4,
        fontFamily: 'NexaRegular',
    },

    ratingtext: {
        color: '#000',
        fontWeight: '800',
        fontSize: 13,
        marginTop: 6,
        fontFamily: 'NexaBlack',
    },


    bookmarkwrapp: {
        position: 'absolute',
        zIndex: 2,
        top: 15,
        right: 15,
        width: 40,
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, .6)',
    },

    type: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 2,
        top: 22,
        left: 15,
        backgroundColor: 'rgba(0,0,0, .6)',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 15
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
        bottom: 54,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default memo(Movie);