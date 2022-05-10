import { View, StyleSheet,ScrollView } from "react-native"
import {HeaderSecond} from './HeaderSecond'
import { PeopleMain } from "./PeopleMain"
import PeopleMovie from "./PeopleMovie"


export const PeoplePage = ({navigation, route}) => {
    const {peopleid} = route.params;

    return(
        <View style={styles.container}>
            <HeaderSecond navigation={navigation}/>
            <ScrollView>
                <PeopleMain peopleid={peopleid}/>
                <PeopleMovie navigation={navigation} peopleid={peopleid}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
  });