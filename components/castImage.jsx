import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	text: {
		color:"white"
	}
})

const CastCircle = ({name, role, image}) => {
	return (
		<View style={{flex:1, justifyContent:"center", alignContent:"center", marginRight:10}}>
			<Image source={{uri:image}} style={{width:100, height:100, borderRadius:50, alignSelf:"center"}} />
	<Text style={[styles.text, {alignSelf:"center"}]}>{name}</Text>
	<Text style={[styles.text, {alignSelf:"center"}]}>as</Text>
	<Text style={[styles.text, {alignSelf:"center"}]}>{role}</Text>
		</View>
	)
}

export default CastCircle