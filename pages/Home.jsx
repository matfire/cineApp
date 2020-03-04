import React, { useState, useEffect } from 'react'
import { ScrollView, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import { getImageUrl, getTrending } from '../client'


const Home = ({navigation}) => {
	const [trending, setTrending] = useState([])
	const [playing, setPlaying] = useState([])

	useEffect(() => {
		getTrending().then(data => setTrending(data))
	}, [])
	return (
		<ScrollView>
			<Text style={{alignSelf:"center", fontSize:30}}>Trending</Text>
			{trending.map((t) => (
				<TouchableOpacity key={t.id} style={{paddingBottom:50, paddingTop:50}} onPress={() => {
					navigation.navigate("Movie Detail", {id:t.id, name:t.title})
				}}>
					<Image source={{uri:getImageUrl(t.poster_path, "w500")}} style={{height:Dimensions.get("screen").height / 3}} />
			<Text style={{alignSelf:"center", fontSize:20, paddingTop:15}}>{t.title}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	)
}

export default Home