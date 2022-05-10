import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 


export const MovieDescription = ({plot}) => {
    const [expandText, setExpandText] = useState([3, '0deg'])
    return(
        <View style={{paddingHorizontal: 30, marginTop: 25}}>
            <Text style={styles.title}>Storyline</Text>
            <Text  style={styles.description} numberOfLines={expandText[0]} onPress={() => expandText[0] == 3 ? setExpandText([0, '180deg']) : setExpandText([3, '0deg'])}>{plot} </Text>
            <FontAwesome style={{ position: 'absolute',right: 20, bottom: -2 ,transform: [{ rotate: expandText[1]},]}} name="angle-down" size={24} color="#ffc10d" />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
    },
    
    description: {
        fontSize: 14,
        color: 'rgba(0,0,0, .6)',
        fontWeight: '500',
        marginTop: 10,
        lineHeight: 23,
    },

  });
  