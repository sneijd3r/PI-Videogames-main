const initialState = {
  videogames : [],
  allVideogames : [],
  genres: [],
  platforms: [],
  details : []
}
function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES' :
            return{
                ...state,
                videogames : action.payload,
                allVideogames : action.payload
            }

        case 'GET_VIDEOGAMES_ID' :
            return{
                ...state,
                details: action.payload
            }

        case 'GET_PLATFORMS' :
            return{
                ...state,
                platforms: action.payload
            }

        case 'CLEAR_STATE' :
            return{
                ...state,
                details: []
            }

        case 'GET_DB_GAMES' :
            const allGames = state.allVideogames
            const gameAtDb = action.payload === 'db' ? allGames.filter(el => el.createdAtDb) : allGames
            console.log(gameAtDb);
            return{
                ...state,
                videogames : gameAtDb
            }
        
            case 'SORT':
            const gamesAz = [...state.videogames]
            const sortByAz = action.payload === 'a-z' ?
            gamesAz.sort(function (a, b){
                if (a.name > b.name) {
                    return 1
                }
                if (a.name < b.name) {
                    return -1
                }
                return 0
            }) : 
            gamesAz.sort(function (a, b){
                if (a.name < b.name) {
                    return 1
                }
                if (a.name > b.name) {
                    return -1
                }
                return 0
            })
            return {
                ...state,
                videogames: sortByAz
            }

        case 'GET_GAME_NAME':
            return{
                ...state,
                videogames: action.payload
            }

            
        case 'GET_GENRES' :
            return{
                ...state,
                genres: action.payload
            }

        case 'POST_GAME' :
            return{
                ...state,
                allVideogames: action.payload
            }

        case 'SORT_RATING':
            const gamesRating = [...state.videogames]
            const sortRating = action.payload === 'descen' ?
            gamesRating.sort(function (a, b){
                if (a.rating > b.rating) {
                    return 1
                }
                if (a.rating < b.rating) {
                    return -1
                }
                return 0
            }) : 
            gamesRating.sort(function (a, b){
                if (a.rating < b.rating) {
                    return 1
                }
                if (a.rating > b.rating) {
                    return -1
                }
                return 0
            })
            return {
                ...state,
                videogames: sortRating
            }

            case 'GENRE_FILTER' :
            const filterGenre = [...state.allVideogames]
            const filter = []
            
            for (let i = 0; i < filterGenre.length; i++) {
               for (let j = 0; j < filterGenre[i].genres?.length; j++) {
                if(filterGenre[i].genres[j] === (action.payload)) filter.push(filterGenre[i])
                if(filterGenre[i].genres[j].name === (action.payload)) filter.push(filterGenre[i]) 
               
            }
        }
            
            console.log(filterGenre);
            console.log(action.payload);
            console.log(filter);
            return{
                ...state,
                videogames: filter
                
            }

        
        default: return state
    }
}
export default rootReducer;



// case 'GENRE_FILTER' :
//             const filterGenre = [...state.allVideogames]
//             const filter = []
//             for (let i = 0; i < filterGenre.length; i++) {
//                 for (let j = 0; j < filterGenre[i].genres?.length; j++) {
//                     if(filterGenre[i].genres[j] === 'Sports')
//                     filter.push(filterGenre[i])                    
//                 }               
//             }
//             console.log(filter);
//             return{
//                 ...state,
//                 videogames: filter
//             }
// const filterByGenres = action.payload === 'all' ? filter : filter.filter(el => el.genres?.includes(action.payload))
//            console.log(filterByGenre);