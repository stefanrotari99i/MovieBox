import { View, Image , Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import React, {useEffect, useState} from 'react'
import { getAge } from "./TextFormat";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height / 1.6;

export const PeopleMain =({peopleid}) => {
    const [peopleinfo,setPeople]=useState(null);
    const [loading,setLoading]=useState(true);
    var peopleData;
    const getPeopleInfo=async()=>{
            setLoading(true);
         try{
         const response = await fetch('https://api.themoviedb.org/3/person/'+peopleid+'?api_key=329c87031d049e635b2d60f695329362&language=en-US');
         const json = await response.json();
        
         peopleData={
         "id":json.id,
         "uri":"https://image.tmdb.org/t/p/original"+json.profile_path,
         "name": json.name,
         "birthday": json.birthday,
         'bplace': json.place_of_birth,
         'biography': json.biography,
     
         };
         console.log(peopleData)
         setPeople(peopleData);
         setLoading(false);
         }
         catch(error){
         setLoading(false);
         }
    }
   useEffect(()=>getPeopleInfo(),[]);


    return loading ? (<ActivityIndicator size="small" color="#0000ff" />) : (
        <View style={styles.container}>
            <View>
                <Image resizeMode='cover' style={styles.image} source={{uri: peopleinfo.uri}} />
                <LinearGradient colors={['#121212', '#12121200']} start={{x: 0, y: .8}} end={{x: 0, y: .1}} style={styles.gradient}> 
                </LinearGradient>
            </View>
            <View style={styles.infowrapp}>
                <Text style={styles.title}>{peopleinfo.name}</Text>
                <View style={styles.section}>
                    <Text style={styles.sectiontitle}>Born</Text>
                    <Text style={styles.info}>{peopleinfo.birthday}    ({getAge(peopleinfo.birthday)} years old)</Text>
                    <Text style={styles.info}>{peopleinfo.bplace}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectiontitle}>Biography</Text>
                    <Text style={styles.description}>
                        {peopleinfo.biography}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30
    },

    image: {
        height: windowHeight,
        width: windowWidth,
    },
    gradient: {
        width: windowWidth,
        height: 300,
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },

    infowrapp: {
        marginTop: -50
    },

    sectiontitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'NexaBold',
    },

    section: {
        marginBottom: 30
    },
    

    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
        maxWidth: windowWidth - 35,
        fontFamily: 'NexaBold'
    },
    description: {
        fontSize: 14,
        color: 'rgba(255,255,255, .8)',
        fontWeight: '500',
        marginTop: 10,
        lineHeight: 23,
    }, 

    info: {
        fontSize: 14,
        color: 'rgba(255,255,255, .8)',
        fontWeight: '500',
        marginTop: 5,
        fontFamily: 'NexaBold'
    }
  });
  