import { StyleSheet, View, ScrollView, RefreshControl, Image, Dimensions, useWindowDimensions, Text } from 'react-native';
import { Cast } from './Cast';
import { HeaderSecond } from './HeaderSecond';
import { MovieDescription } from './MovieDescription';
import { PostMain } from './PostMain';
import React,{useState,useCallback,useEffect} from 'react'
import  RelatedMovie  from './RelatedMovie';
import { PostGenres } from './PostGenres';
import GENRE from './GENRE';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height / 2.5;





export const PostPage = ({route,navigation}) => {

    useEffect(()=>{
        getMovies();
    },[]);

    useEffect(() => {
        return () => {
            try{
                controller.abort();
            }
            catch(error) {
            }
        }
    }, []);

    //variables
    const {id, type} = route.params;

    const [refreshing, setRefreshing] = useState(false);
    const [state,setstate]=useState(false);
    const [Movie_info,setMovie_info]=useState({
        'overview':"Loading...",
        'genres':['No data'],
        'backdrop_path':"null",
        'release_date':"0",
        'runtime':'0',
        'title':'Loading ...',
        'vote_average':0,
        'season_number': null,
        'episodes_number': null,
        'last_episode':"....",
        'status': null,
        'last_episode': null,
        'status': null,
        'budget': null,
        'revenue': null,
        'poster': "null",
        'vote_count': '0',
        'popularity': '0'
    });
    const [Data_Cast,setData_Cast]=useState([
        {
            cast_id: '0',
            profile_path: 'https://www.kerstinbruns.es/wp-content/themes/realestate-7/images/no-image.png',
            name: 'No name',
            character: 'Character'
        }
    ]
       );

    const getMovies = useCallback(async () => {
        setRefreshing(true);
        try {

        //fetch data
            const rp_movie_ =await fetch('https://api.themoviedb.org/3/'+type+'/'+id+'?api_key=329c87031d049e635b2d60f695329362&language=en-US');
            var json_movie_=null;
            json_movie_= await rp_movie_.json();
    
            const rp_cast =  await fetch('https://api.themoviedb.org/3/'+type+'/'+id+'/credits?api_key=329c87031d049e635b2d60f695329362&language=en-US');
        // convert to json    
            const json_cast= await rp_cast.json();
        // aux variables
            var temp_cast=[];
            var directors = "";
            var writers = "";
            var map_writers=new Map();
            for(let i=0;i<(json_cast.crew.length);i++){
                try {
                    if(json_cast.crew[i].job == "Director")
                        if(directors.length == 0)
                            directors = json_cast.crew[i].name;
                        else {
                            directors = directors + ' ∘ ' + json_cast.crew[i].name;
                        }
                       
                    if(json_cast.crew[i].department == "Writing")
                        if(writers.length == 0){
                            writers = json_cast.crew[i].name;
                            map_writers.set(json_cast.crew[i].name,"1");
                        }
                        else {
                            if(!map_writers.has(json_cast.crew[i].name)){
                            writers = writers + ' ∘ ' + json_cast.crew[i].name;
                                map_writers.set(json_cast.crew[i].name,"1");
                            }
                        }
                    }
                catch(error) {
                } 
            }

            for(let i=0;i<Math.min(json_cast.cast.length,12);i++){
                temp_cast.push({
                cast_id:json_cast.cast[i].id,
                profile_path:json_cast.cast[i].profile_path==null?'https://www.kerstinbruns.es/wp-content/themes/realestate-7/images/no-image.png':'https://image.tmdb.org/t/p/w200' + json_cast.cast[i].profile_path,
                name: json_cast.cast[i].name,
                character: json_cast.cast[i].character,});
            }
                        
            var temp={
                'overview':json_movie_.overview,
                'genres':json_movie_.genres,
                'backdrop_path':'https://image.tmdb.org/t/p/original' + json_movie_.backdrop_path,
                'release_date': type == "movie" ? json_movie_.release_date : json_movie_.first_air_date.slice(0,4),
                'release_date_original': json_movie_.release_date,
                'runtime':type == "movie" ? json_movie_.runtime : json_movie_.episode_run_time[0],
                'title': type == "movie" ? json_movie_.title : json_movie_.name,
                'vote_average':json_movie_.vote_average,
                'vote_count': json_movie_.vote_count,
                'popularity': json_movie_.popularity,
                'season_number': json_movie_.number_of_seasons,
                'episodes_number': json_movie_.number_of_episodes,
                'last_episode': json_movie_.last_air_date,
                'status': json_movie_.status,
                'budget': json_movie_.budget,
                'revenue': json_movie_.revenue,
                'directors': directors,
                'writers': writers,
                'poster': 'https://image.tmdb.org/t/p/original' + json_movie_.poster_path
            };

            setMovie_info(temp);
            setData_Cast(temp_cast);
            setRefreshing(false);

        } catch (error) {
            console.error(error);
        }

    },[refreshing]);
    let genresAll = ''
    for(let i=0 ; i < Movie_info.genres.length; i++) {
        if(i == 0)
        genresAll =  Movie_info.genres[i].name
        else 
        genresAll = genresAll + '  /  ' + Movie_info.genres[i].name
    }

    const layout = useWindowDimensions();
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Overview' },
      { key: 'second', title: 'Details' },
      { key: 'third', title: 'Episodes' },
    ]);


    const [viewHight, setViewHeight] = useState(500)

    const FirstRoute = () => (
        <View onLayout={(event) => {
            let {height} = event.nativeEvent.layout;
            setViewHeight(height + 80)
          }} >
            <MovieDescription plot={Movie_info.overview} />
            <PostGenres genres={Movie_info.genres} />
            <Cast DATA_CAST={Data_Cast} navigation={navigation}/>
        </View>
      );

      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff' }} />
      );
    
      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: SecondRoute
      });
      
    return(
            <View style={styles.container}>
                <ScrollView bounces refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={getMovies}
                            tintColor={'#ffc10d'}
                        />}
                    >
                    <HeaderSecond navigation={navigation} />
                    <View style={styles.backdrop}>
                        <Image resizeMode='cover' style={styles.image} source={{uri: Movie_info.backdrop_path}} />
                        <View style={styles.backdropfilter}></View>
                    </View>
                    <View style={styles.infowrapp}>
                        <PostMain title={Movie_info.title} status={Movie_info.status} popularity={Movie_info.popularity} poster={Movie_info.poster} release_date={Movie_info.release_date} runtime={Movie_info.runtime} rating={Movie_info.vote_average} backdrop={Movie_info.backdrop_path} tvseasons={Movie_info.season_number} tvepisodes={Movie_info.episodes_number} last_episode={Movie_info.last_episode} type={type} vote_count={Movie_info.vote_count}/>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width}}
                            style={{height: viewHight, marginTop: 35}}
                            renderTabBar={props => <TabBar {...props} 
                                activeColor='#ffc10d'
                              indicatorStyle={{ backgroundColor: '#ffc10d', width: '10%', marginLeft: 45}} 
                              style={{backgroundColor: 'transparent'}}
                              labelStyle={{color: 'rgba(0,0,0, .2)', fontWeight: '500', fontSize: 13}}
                              /> }
                              
                        />
                        {/* <MovieDescription plot={Movie_info.overview}/>
                        <PostGenres genres={Movie_info.genres} />
                        <Cast DATA_CAST={Data_Cast} navigation={navigation}/> */}
                        <RelatedMovie navigation={navigation} id={id} type={type}/>
                    </View>
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      flex: 1,
    },

    image: {
        height: windowHeight,
        width: windowWidth,
    },

    backdropfilter: {
        height: windowHeight,
        width: windowWidth,
        position: 'absolute',
        backgroundColor: '#000',
        opacity: .4
    },

    infowrapp: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    }
  });
  