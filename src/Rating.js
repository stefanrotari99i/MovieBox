import { Rating} from 'react-native-ratings';
import { StyleSheet, Text, View } from 'react-native';

export const RatingComponent = ({rating}) => {
    return(
    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
        <Rating
            type='custom'
            ratingCount={5}
            imageSize={24}
            tintColor='#121212'
            ratingColor='#ff9f00'
            ratingBackgroundColor='#66530e'
            readonly={true}
            startingValue={rating / 2}/>
        <Text style={styles.ratingtext}>{rating/2}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    ratingtext: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10
    }
  });
  