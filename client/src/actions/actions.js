import axios from 'axios'

export function getVideogames(setLoading){
    return async function(dispatch){
        setLoading(true)
        const videogames = await axios.get('http://localhost:3001/videogames')
        setLoading(false)
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: videogames.data
        })
    }
}



export function getVideogamesById(id){
    return async function(dispatch){
        const videogamesId = await axios.get('http://localhost:3001/videogames/' + id )
        return dispatch({
            type: 'GET_VIDEOGAMES_ID',
            payload: videogamesId.data
        })
    }
}


export function postGame(payload){
    return async function(dispatch){
        const post = axios.post('http://localhost:3001/videogames/', payload)
        return dispatch({
            type: 'POST_GAME',
            payload : post.data
        })
    }
}

export function getGameByName(name){
    return async function(dispatch){
        const searchGame = await axios.get('http://localhost:3001/videogames?name=' + name)
        return dispatch({
            type: 'GET_GAME_NAME',
            payload: searchGame.data
        })
    }
}


export function getGenres(){
    return async function(dispatch){
        const genres = await axios.get('http://localhost:3001/genres')
        return dispatch({
            type: 'GET_GENRES',
            payload: genres.data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        const platforms = await axios.get('http://localhost:3001/platforms')
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: platforms.data
        })
    }
}

export function clearState(){
    return{
        type: 'CLEAR_STATE'
    }
}

export function getDbGames(payload){
    return{
        type: 'GET_DB_GAMES',
        payload
    }
}

export function sort(payload){
    return{
        type: 'SORT',
        payload
    }
}

export function sortRating(payload){
    return{
        type: 'SORT_RATING',
        payload
    }
}

export function genreFilter(payload){
    return{
        type: 'GENRE_FILTER',
        payload

    }
}