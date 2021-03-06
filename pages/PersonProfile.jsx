import React, { useState, useEffect } from 'react'
import { View, ProgressBarAndroid, Image, StyleSheet, ImageBackground, Dimensions, ScrollView, Text, FlatList } from 'react-native'
import { getPersonDetails, getImageUrl } from '../client'
import MovieCard from '../components/movieCard'
import ReadMore from 'react-native-read-more-text';


const styles = StyleSheet.create({
    containter: {
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
    },
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    poster: {
        width: 200,
        height: 300,
        marginLeft: 5,
        marginTop: 20
    },
    movieTitle: {
        marginTop: 20,
        fontSize: 20,
    },
    text: {
        color: "white"
    },
    scrollview: {
        backgroundColor: 'transparent'
    }
})

const PersonProfile = ({ navigation, route }) => {
    const { id } = route.params
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPersonDetails(id, "movie_credits").then((data) => {
            setProfile(data)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <View>
                <ProgressBarAndroid />
            </View>
        )
    }

    return (
        <View>
            <View style={{ position: "absolute", bottom: 0, width: "100%", height: "100%", backgroundColor: "rgba(20,20,20,0.4)" }}></View>
            <ScrollView style={[styles.scrollview]} endFillColor="rgba(20,20,20,0.7)">
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={[styles.text, styles.movieTitle]}>{profile.name}</Text>
                    <Text style={[styles.text, { marginTop: 40 }]}>Born in {profile.place_of_birth}</Text>
                </View>
                <Text style={[styles.text ,{ marginTop: 50, marginLeft: 10, marginRight: 10, marginBottom:10,fontSize:20 }]}>Biography</Text>
                <ReadMore
                    numberOfLines={3}
                    renderRevealedFooter={(handlePress) => (<Text style={{marginLeft:10, marginRight:10, marginTop:5, color:"white"}} onPress={handlePress} >Read Less</Text>)}
                    renderTruncatedFooter={(handlePress) => (<Text style={{marginLeft:10, marginRight:10, marginTop:5, color:"white"}} onPress={handlePress} >Read More</Text>)}
                >
                    <Text style={[styles.text, { marginLeft: 10, marginRight: 10 }]}>{profile.biography}</Text>
                </ReadMore>
                <Text style={[styles.text, {fontSize:20 ,marginTop:50, marginLeft:10, marginRight:10}]}>Credits</Text>
                <View>
                {profile.movie_credits && profile.movie_credits.cast && <FlatList horizontal
                data={profile.movie_credits.cast}
                keyExtractor={item => item.id.toString()}
                extraData={profile}
                initialNumToRender={3}
                 renderItem={({item}) => <MovieCard id={item.id} title={item.title} poster_path={item.poster_path} navigation={navigation} />}>
                </FlatList>}
                </View>
            </ScrollView>
            <ImageBackground source={{ uri: getImageUrl(profile.profile_path, "original") }} style={[styles.fixed, styles.containter, { zIndex: -1 }]} />
        </View>
    )
}

export default PersonProfile