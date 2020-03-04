import axios from "axios"

const URL = "https://api.themoviedb.org/3"
const API = "2005b3a7fc676c3bd69383469a281eff"

const getTrending = async() => {
	const res = await axios.get(`${URL}/movie/top_rated?api_key=${API}&language=en-US&page=1`)
	return res.status > 200 ? [] : res.data.results
}

const getPlaying = async() => {

}

const getMovieDetails = async(id, query) => {
	const res = await axios.get(`${URL}/movie/${id}?api_key=${API}&language=en-US${query !== "" ? "&append_to_response=" + query : ""}`)
	return res.data
}

const getImageUrl = (path, size) => {
	return `https://image.tmdb.org/t/p/${size}${path}`
}

export {getTrending, getPlaying, getImageUrl, getMovieDetails}