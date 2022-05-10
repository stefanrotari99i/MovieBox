import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native"


const DATA = [
    {
      id: '1',
      name: 'Loading...',
    },
  ];

const Item = ({ name, index, first, last}) => (
    <TouchableOpacity  style={index == last ? styles.lastitem:index == first? styles.firstitem: styles.item}>
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );

const ItemDivider = () => {
  return (
    <Text style={styles.divider}> / </Text>
  );
}
 
export const PostGenres = ({genres}) => {

    const lastItem = genres.length == 1 ? -1: genres[genres.length - 1];
    const firstItem = genres[0]

    const renderItem = ({ item }) => (
        <Item name={item.name} index={item.id} first={firstItem.id} last={lastItem.id}/>
    );

    return(
        <View  style={{marginTop: 15}}>
            <FlatList
                data={genres}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                ItemSeparatorComponent={ItemDivider}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}


const styles = StyleSheet.create({

    title: {
       color: 'rgba(0,0,0, .6)',
        fontWeight: '500',
        fontSize: 14,
        textTransform: 'capitalize',
    },

    firstitem: {
      paddingLeft: 30
    },

    lastitem: {
      paddingRight: 30
    },

    item: {
      padding: 0
    },


    divider: {
      color: 'rgba(0,0,0, .16)',
      fontWeight: '600',
      marginHorizontal: 6,
      fontSize: 14
    }
})