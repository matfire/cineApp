import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import { getImageUrl, getTrending, getPlaying } from '../client'
import MovieCard from '../components/movieCard'


const Home = ({navigation}) => {
	const [trending, setTrending] = useState([])
	const [playing, setPlaying] = useState([])

	useEffect(() => {
		getPlaying().then(data => setPlaying(data))
		getTrending().then(data => setTrending(data))
	}, [])
	return (
		<ScrollView>
			<Text style={{alignSelf:"center", fontSize:30}}>Trending</Text>
			<ScrollView horizontal contentContainerStyle={{justifyContent:"center"}}>
			{trending.map((t) => (
				<MovieCard key={t.id} title={t.title} poster_path={t.poster_path} id={t.id} navigation={navigation} />
			))}
			</ScrollView>
			<Text style={{alignSelf:"center", fontSize:30, paddingTop:50}}>Playing</Text>
			<ScrollView style={{flex:1}} horizontal contentContainerStyle={{justifyContent:"center"}}>
			{playing.map((t) => (
				<MovieCard key={t.id} title={t.title} poster_path={t.poster_path} id={t.id} navigation={navigation} />
			))}
			</ScrollView>
		</ScrollView>
	)
}

export default Home