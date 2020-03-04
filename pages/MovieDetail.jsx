import React, { useState, useEffect } from 'react'
import { View, ImageBackground, ScrollView, Image, StyleSheet, Dimensions, Text, ProgressBarAndroid } from 'react-native'
import { getMovieDetails, getImageUrl } from '../client'
import CastCircle from '../components/castImage'



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
		width: Dimensions.get("window").width / 3,
		height: Dimensions.get("window").height / 3,
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

const MovieDetail = ({ route, navigation }) => {

	const { id } = route.params
	const [movie, setMovie] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getMovieDetails(id, "credits").then((data) => {
			setMovie(data)
			setLoading(false)
		})
	}, [id])
	if (loading) {
		return (
			<View>
				<ProgressBarAndroid />
			</View>
		)
	}
	return (
		<View>
			<ScrollView style={[styles.scrollview]}>
				<View style={{ justifyContent: "space-around", flexDirection: "row" }}>
					<Image source={{ uri: getImageUrl(movie.poster_path, "w500") }} style={[styles.poster]} />
					<View style={{ flexWrap: "nowrap", flexDirection: "column", flex: 1, marginLeft: 5 }}>
						<Text style={[styles.movieTitle, styles.text]}>{movie.title} ({movie.release_date.split("-")[0]})</Text>
						<Text style={[styles.text]}>{movie.tagline}</Text>
					</View>
				</View>
				<View style={{ justifyContent: "space-between", flexDirection: "row", alignContent: "center", marginTop: 20 }}>
					<Text style={[{ fontSize: 20 }, styles.text]}>{movie.genres.map((g) => `${g.name}, `)}</Text>
					<Text style={[styles.text, { fontSize: 20 }]}>{`${movie.vote_average}/10`}</Text>
				</View>
				<Text style={[styles.text, { fontSize: 20, marginTop: 50 }]}>Overview</Text>
				<Text style={[styles.text, { marginTop: 5 }]}>{movie.overview}</Text>
				<Text style={[styles.text, { fontSize: 20, marginTop: 50 }]}>Cast</Text>
				<ScrollView horizontal>
					{movie.credits.cast.filter((c) => c.profile_path).map((c) => <CastCircle key={c.id} name={c.name} role={c.character} image={getImageUrl(c.profile_path, "w185")} />)}
				</ScrollView>
			</ScrollView>
			<ImageBackground source={{ uri: getImageUrl(movie.backdrop_path, "w1280") }} style={[styles.fixed, styles.containter, { zIndex: -1 }]}>
			</ImageBackground>
			{/* <ScrollView contentContainerStyle={{flex:1, ...StyleSheet.absoluteFillObject, backgroundColor:'rgba(69,85,117,0.7)'}}>
					<View style={{justifyContent:"space-around", flexDirection:"row"}}>
						<Image source={{uri:getImageUrl(movie.poster_path, "w500")}} style={[styles.poster]} />
						<View style={{flexWrap:"nowrap", flexDirection:"column", flex:1, marginLeft:5}}>
	<Text style={[styles.movieTitle, styles.text]}>{movie.title} ({movie.release_date.split("-")[0]})</Text>
	<Text style={[styles.text]}>{movie.tagline}</Text>
						</View>
					</View>
					<View style={{justifyContent:"space-between", flexDirection:"row", alignContent:"center", marginTop:20}}>
						<Text style={[{fontSize:20}, styles.text]}>{movie.genres.map((g) => `${g.name}, `)}</Text>
						<Text style={[styles.text, {fontSize:20}]}>{`${movie.vote_average}/10`}</Text>
					</View>
					<Text style={[styles.text, {fontSize:20, marginTop:50}]}>Overview</Text>
					<Text style={[styles.text, {marginTop:5}]}>{movie.overview}</Text>
					<Text style={[styles.text, {fontSize:20, marginTop:50}]}>Cast</Text>
					<ScrollView horizontal>
						{movie.credits.cast.filter((c) => c.profile_path).map((c) => <CastCircle key={c.id} name={c.name} role={c.character} image={getImageUrl(c.profile_path, "w185")} />)}
					</ScrollView>
				</ScrollView>
				<ImageBackground source={{uri:getImageUrl(movie.backdrop_path, "w1280")}} style={{height:"100%", width:"100%"}}>
			</ImageBackground> */}
		</View>
	)
}

export default MovieDetail