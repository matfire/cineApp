import React from 'react'
import {TouchableOpacity, Image, Text} from 'react-native'
import { getImageUrl } from '../client'

const MovieCard = ({title, id, poster_path, navigation}) => {
    return (
        <TouchableOpacity style={{ paddingBottom: 50, paddingTop: 50, paddingLeft:10, paddingRight:10 }} onPress={() => {
            navigation.navigate("Movie Detail", { id: id, name: title })
        }}>
            <Image source={{ uri: getImageUrl(poster_path, "w500") }} style={{ height: 500, width: 300, alignSelf:"center" }} />
        </TouchableOpacity>
    )
}

export default MovieCard