import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import { get_beatiful } from './TextFormat';
import {timeConvert} from './TextFormat'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height / 2;

export const PostMain = ({title,release_date,runtime,rating, genres, tvseasons, popularity, vote_count, tvepisodes, type, last_episode, status, poster}) => {
    
    const InfoType = () => {
        if(type == 'tv') {

            return(
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={styles.movieinfo}>S{tvseasons} / E{tvepisodes}</Text>
                    <Text style={{color: 'rgba(0,0,0, .2)', fontSize: 20}}>•</Text>
                </View>
            )
        }
        return null
    }

    const MovieDate = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(type == 'tv') {
            var enddate = null;
            if(status == "Returning Series"){
                enddate = '...'
            } else {
                enddate=last_episode==null?"1970":last_episode.slice(0,4);
            };

            return(
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={styles.movieinfo}>{release_date} - {enddate}</Text>
                    <Text style={{color: 'rgba(0,0,0, .2)', fontSize: 20}}>•</Text>
                </View>
            )
        }
        release_date = new Date(release_date)
        return (
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text style={styles.movieinfo}> {release_date.getDate()+" "+months[release_date.getMonth()]+", "+release_date.getFullYear()}</Text>
                <Text style={{color: 'rgba(0,0,0, .2)', fontSize: 20}}>•</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.posterwrapp}>
                <Image style={styles.poster} source={{uri: poster}}/>
            </View>
            <View style={styles.infowrapp}>
                <Text style={styles.title}>{title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MovieDate />
                    <InfoType />
                    <Text style={styles.movieinfo}>{timeConvert(runtime)}</Text>
                </View>
                <View style={styles.statistics}>
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingwrapp}>
                            <AntDesign name="star" size={22} color="#FFAC0B"/>
                            <Text style={styles.ratingtext}>{rating}</Text>
                        </View>
                        <Text style={styles.ratingcount}>{get_beatiful(vote_count)}</Text>
                    </View>
                    <View style={styles.popualaritywrapp}>
                        <Text style={styles.popularity}>{get_beatiful(parseInt(popularity).toFixed())}</Text>
                        <Text style={styles.popularitysubtitle}>Popularity</Text>
                    </View>
                    <View style={styles.agerating}>
                        <Text style={styles.age}>18+</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    poster: {
        width: 180,
        height: 280,
        marginTop: -240,
        borderRadius: 15,
    },

    posterwrapp: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 15},
        shadowOpacity: .5,
        shadowRadius: 15,
    },

    statistics: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - 70
    },

    title: {
        fontSize: 28,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 18,
        marginBottom: 5,
        textAlign: 'center',
        maxWidth: windowWidth - 50,
        lineHeight:32
    },

    movieinfo: {
        fontSize: 14,
        color: 'rgba(0,0,0, .4)',
        fontWeight: '600',
        marginHorizontal: 8,
    },
    infowrapp: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

    playbtn: {
        width: 60,
        height: 60,
    },

    play: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
    },

    ratingwrapp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },

    ratingtext: {
        color: '#ffc10d',
        fontSize: 24,
        marginLeft: 4,
        fontWeight: '700'
    },

    ratingContainer: {
        alignItems: 'center',
    },

    ratingcount: {
        color: 'rgba(0,0,0, .3)',
        fontWeight: '700',
        fontSize: 13
    },

    popualaritywrapp: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    popularity: {
        color: '#2dcd96',
        fontSize: 24,
        fontWeight: '700',
        
    },

    popularitysubtitle: {
        color: 'rgba(0,0,0, .3)',
        fontWeight: '600',
        fontSize: 13
    },

    agerating: {
        borderWidth: 3,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 15,

    },

    age: {
        color: 'rgba(0, 0, 0, .2)',
        fontSize: 13,
        fontWeight: '900'
    }
    
  });
  