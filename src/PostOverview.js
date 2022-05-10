import { View } from "react-native"
import { MovieDescription } from "./MovieDescription"
import { PostGenres } from "./PostGenres"
import { Cast } from "./Cast"

export const PostOverview = ({plot, genres, DATA_CAST, navigation}) => {
    return(
        <View style={{height: '100%'}}>
            <MovieDescription plot={plot}/>
            <PostGenres genres={genres} />
            <Cast DATA_CAST={DATA_CAST} navigation={navigation}/>
        </View>
    )
}