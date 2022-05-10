import React from 'react'
import { View, Text,StyleSheet } from "react-native"
import {abbreviateNumber} from './TextFormat';
import { get_beatiful } from './TextFormat';

const Revenue_stat = ({difference}) => {
    return(
        <Text style={difference[0]=='-'?styles.secondtext_bad:styles.secondtext_good}>{abbreviateNumber({difference})} $</Text>
    )
}

export const PostInfo = ({status, budget, revenue, release_date, directors, writers}) => {
    let difference = (parseInt(revenue) - parseInt(budget)).toString();
    revenue = get_beatiful(revenue);
    budget = get_beatiful(budget);

    return(
        <View style={{paddingHorizontal: 30, marginTop: 18}}>
            <View style={styles.wrapper}>
                <Text style={styles.maintext}>Directors   </Text>
                <Text style={styles.secondtext}>{directors}</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.maintext}>Writters   </Text>
                <Text style={styles.secondtext}>{writers}</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.maintext}>Budget   </Text>
                <Text style={styles.secondtext}>{budget} $</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.maintext}>Revenue   </Text>
                <Text style={styles.secondtext}>{revenue} $</Text>
                <Revenue_stat difference={difference}/>

            </View>
            <View style={styles.wrapper}>
                <Text style={styles.maintext}>Status   </Text>
                <Text style={styles.secondtext}>{status}</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.maintext}>Release Date   </Text>
                <Text style={styles.secondtext}>{new Date(release_date).toDateString()}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#1a1a1a',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 6
    },

    maintext: {
        color: 'rgba(255,255,255, .7)',
        fontWeight: '700',
    },

    secondtext: {
        color: 'rgba(255,255,255, 1)',
        fontWeight: '600',
        fontSize: 14,
        maxWidth: 222,
        lineHeight: 20,
    },

    secondtext_bad: {
        color: 'crimson',
        marginLeft: 12,
        fontWeight: '600',
        fontSize: 13,
        maxWidth: 99,
    },

    secondtext_good: {
        color: 'green',
        marginLeft: 12,
        fontWeight: '600',
        fontSize: 13,
        maxWidth: 99,
    },
    
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 15
    }
})