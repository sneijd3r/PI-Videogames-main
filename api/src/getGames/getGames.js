const axios = require('axios')
const {Videogame, Genre} = require('../db')
const { all } = require('../routes/videogamesControler')
const apiKey = 'key=83cb3d91e0104e47a602fc469a71b348'

async function getApiGames(){
const linkGames = []

for (let i = 1; i <= 5; i++) {
    linkGames.push(`https://api.rawg.io/api/games?${apiKey}&page=${i}`) 
}
const getGames = await Promise.all(linkGames.map((link) => axios.get(link)))

const games = getGames.map((game) => game.data.results).flat()
const apiGames = games.map(async (gamesInfo) => {
    return {
        id: gamesInfo.id,
        name: gamesInfo.name,
        released: gamesInfo.released,
        rating: gamesInfo.rating,
        platforms: gamesInfo.parent_platforms.map(el => { return el.platform.name}),
        genres: gamesInfo.genres.map(el => {return el.name}),
        image: gamesInfo.background_image
    }
})
const allGames = await Promise.all(apiGames)
return allGames
}

async function dbInfo() {
    return await Videogame.findAll({
       include:  Genre ,
       atributes: ['name']
        }
    )}
async function dbIdInfo(id) {
        return await Videogame.findAll({
           include:  Genre ,
           atributes: ['name'],
           throught: {
            atributes: [],
        }
            }
        )}
// async function getGamesIdAtDb(){
//     const isAtbd = await Videogame.findAll()
//         const dbid = isAtbd.map(async (info) => {
//         return{
//             id: info.id,
//             name: info.name,
//             description: info.description,
//             released: info.released,
//             rating: info.rating,
//             platforms: info.platforms?.map(el => el),
//             genres: info.genres?.map(el => el.name)
//         }
//         })
//         const data = await Promise.all(dbid)
//         // console.log(data);
//         return data 
// }

async function getGamesId(id){
const videogamesId = []
videogamesId.push(axios.get(`https://api.rawg.io/api/games/${id}?${apiKey}`))

const getGames = await Promise.all(videogamesId)
const games = getGames.map((game) => game.data).flat()
//console.log(games);
const apiGames = games.map(async (gamesInfo) => {
    return {
        id: gamesInfo.id,
        name: gamesInfo.name,
        released: gamesInfo.released,
        rating: gamesInfo.rating,
        description: gamesInfo.description_raw,
        platforms: gamesInfo.parent_platforms.map(el => { return el.platform.name}),
        genres: gamesInfo.genres.map(el => {return el.name}),
        image: gamesInfo.background_image
    }
})
const allGames = await Promise.all(apiGames)
//console.log(allGames);
return allGames

}
async function getGamesName(name){
    const videogamesName = []
    videogamesName.push(axios.get(`https://api.rawg.io/api/games?${apiKey}&search=${name}`))
    const getGames = await Promise.all(videogamesName)
    const games = getGames.map((game) => game.data.results).flat()
    //console.log(games);
    const apiGames = games.map(async (gamesInfo) => {
        return {
            id: gamesInfo.id,
            name: gamesInfo.name,
            released: gamesInfo.released,
            rating: gamesInfo.rating,
            platforms: gamesInfo.parent_platforms.map(el => { return el.platform.name}),
            genres: gamesInfo.genres.map(el => {return el.name}),
            image: gamesInfo.background_image
        }
    })
    const allGames = await Promise.all(apiGames)
    //console.log(allGames);
    return allGames
    
    }
async function getPlatforms(){
const linkGames = []
const platforms = []

for (let i = 1; i <= 5; i++) {
    linkGames.push(`https://api.rawg.io/api/games?${apiKey}&page=${i}`) 
}
const getGames = await Promise.all(linkGames.map((link) => axios.get(link)))
const games = getGames.map((game) => game.data.results).flat()
const apiGames = games.map(async (gamesInfo) => {
    return {
        platforms: gamesInfo.platforms.map(el =>  el.platform.name),

    }
})

const allGames = await Promise.all(apiGames)
platforms.push(allGames.map(el => el.platforms).flat(2))
const plataformas = [...new Set(platforms.flat())]
//console.log(plataformas);
return plataformas
}

async function getGamesIds(id){
    const infoIdApi = await getGamesId(id)
    const dbsInfo = await dbIdInfo(id)
    const allInfo = infoIdApi.concat(dbsInfo.map(el => el.dataValues));
    console.log(allInfo);
    return allInfo
}

async function getAllGames (){
    const infoApi = await getApiGames();
    const infoDb = await dbInfo();
    const allInfo = infoApi.concat(infoDb);
    return allInfo;
}

module.exports ={ getAllGames, getGamesIds, getGamesName, getPlatforms }