import { StyleSheet, SafeAreaView, ScrollView,View, Image,ImageBackground } from 'react-native';
import { Genres } from './Genres';
import  Movie  from './Movie';
import { Search } from './Search/Search';
import { Filtres } from './Filtres';
import useFonts from '../hooks/useFonts';
import AppLoading from 'expo-app-loading';
import React, {useState} from 'react'



export const MainPage = ({navigation}) => {
    const [IsReady, SetIsReady] = useState(false);

    const LoadFontsAndRestoreToken = async () => {
      await useFonts();
    };

    if (!IsReady) {
        return (
          <AppLoading
            startAsync={LoadFontsAndRestoreToken}
            onFinish={() => SetIsReady(true)}
            onError={() => {}}
          />
        );
      }

    return(
        <SafeAreaView style={styles.container}>
            <ImageBackground  source={{uri: 'https://i.ibb.co/fvgRfKN/Background.png'}} style={styles.gradient} resizeMode='cover' />
            <ScrollView>
                <Search navigation={navigation}/>
                <Genres navigation={navigation}/>
                <Filtres navigation={navigation}/>
                <Movie navigation={navigation} type={'movie'}  category_title={'Trending Now'}/>
                <Movie navigation={navigation} type={'tv'} category_title={'TV Trending'} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
    },

    gradient: {
        flex: 1,
        height: '120%',
        width: '100%',
        position: 'absolute',
    },

  });
  