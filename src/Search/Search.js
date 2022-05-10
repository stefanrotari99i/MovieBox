import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native'
import { Feather } from '@expo/vector-icons'; 


export const Search = ({navigation}) => {
    const [query, setQuery] = useState();
    return(
        <View style={styles.search} >
            <TouchableOpacity>
                <Feather name="search" size={24} color="#969696" />
            </TouchableOpacity>
            <TextInput 
                style={styles.input}
                placeholder="Search ..."
                placeholderTextColor='#A0A0A0'
                keyboardAppearance='dark'
                onChangeText={(value) => setQuery(value)}
                onSubmitEditing={ () => navigation.navigate('SearchPage',{Query: query})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: 'rgba(255, 255, 255, .1)',
        height: 52,
        marginHorizontal: 30,
        borderRadius: 15,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        
    },
    
    input: {
        marginLeft: 16,
        width: '80%',
        color: '#fff',
        fontSize: 15,
        height: '100%',
        fontFamily: 'NexaBold',
    }
})