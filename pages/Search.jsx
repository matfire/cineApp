import React, { useState, useEffect } from 'react'
import { View, TextComponent, TextInput, ScrollView } from 'react-native'
import { searchMovies } from '../client'
import MovieCard from '../components/movieCard'

const SearchPage = ({navigation}) => {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    useEffect(() => {
        if (search.length % 3 === 0) {
            searchMovies(search).then((data) => {
                setResults(data)
            })
        }
    }, [search])

    return (
        <View>
            <TextInput
                style={{paddingLeft:10, paddingRight:10, height:40 ,borderColor:"blue", borderWidth:1}}
                placeholder="What movies are you looking for ?"
                onChangeText={(value) => setSearch(value)}
                value={search}
            />
            <ScrollView>
                {results.map((r) => <MovieCard id={r.id} key={r.id} title={r.title} poster_path={r.poster_path} navigation={navigation} />)}
            </ScrollView>
        </View>
    )
}

export default SearchPage