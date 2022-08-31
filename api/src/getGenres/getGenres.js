const axios = require("axios")
const { Genre } = require('../db.js')
const apiKey = 'key=83cb3d91e0104e47a602fc469a71b348'

let genresAtDb = async function(){
    const areGenres = await Genre.findAll()
    if(areGenres.length !== 0){
        console.log('La base de datos tiene los genres');

    } else {
        console.log('Cargando base de datos'); 
        const genres = await axios.get(`https://api.rawg.io/api/genres?${apiKey}`)
        const infoGenres = genres.data.results
        await Genre.bulkCreate(infoGenres)
    } 
}

module.exports = {genresAtDb}