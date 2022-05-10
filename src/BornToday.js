import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import Moment from 'moment';



const DATA = [
    {
        id: '1',
        uri: 'https://www.zdf.de/assets/hollywood-stories-johnny-depp-102~1280x720?cb=1613041368044',
        title: 'Johnny Depp',
        age: '53'
    },

    {
        id: '2',
        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/1200px-Brad_Pitt_2019_by_Glenn_Francis.jpg',
        title: 'Brad Pitt',
        age: '43'
    },

    {
        id: '3',
        uri: 'https://image.gala.de/22593746/t/At/v5/w1440/r1.5/-/amanda-seyfried.jpg',
        title: 'Amanda Seyfried',
        age: '35'
    },

    {
        id: '4',
        uri: 'https://m.media-amazon.com/images/M/MV5BNDExMzIzNjk3Nl5BMl5BanBnXkFtZTcwOTE4NDU5OA@@._V1_.jpg',
        title: 'Hugh Jackman',
        age: '44'
    },

    {
        id: '5',
        uri: 'https://i0.web.de/image/074/36618074,pd=1/chris-pine.jpg',
        title: 'Chris Pine',
        age: '42'
    }
];

const Item = ({ title, uri, age }) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.categoryitem}>
                <Image style={styles.image} source={{uri: uri}} />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.age}>{age}</Text>
        </View>
    )
};

export const BornToday = () => {
    const renderItem = ({ item}) => (
        <Item title={item.title} uri={item.uri} age={item.age}/>
    );
    var date = new Date();
    var formattedDate = Moment(date).format('MMM DD')
    return (
        <View style={{marginTop: 30}}>
           <Text style={styles.categorytitle}>Born Today - {formattedDate}</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    categoryitem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    wrapper: {
        alignItems: 'center', 
        justifyContent:'center', 
        alignContent: 'center',
        marginBottom: 30,
        marginLeft: 30,
    },

    text: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 10
    },

    image: {
        width: 80, 
        height: 80,
        borderRadius: 50
    },

    categorytitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 15,
        paddingLeft: 30
    },

    age: {
        color: '#A0A0A0',
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 14
    }
}
)