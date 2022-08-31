const { Router } = require("express");
const axios = require('axios')
const router = Router();
const { Genre, Videogame } = require("../db");
const {  getAllGames, getGamesIds , getGamesIdAtDb, getGamesName } = require("../getGames/getGames");



router.get('/', async(req, res) =>{
    const {name} = req.query
    const allGames = await getAllGames()
    const gamesByName = await getGamesName(name)
    
    try{
        if(name){
          
          const filterByName = gamesByName.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
          filterByName.length ?
          res.status(200).send(filterByName) :
          res.status(404).send(`There's no game with that name` )
        } else {
          res.status(200).send(allGames)
        }
    } catch( error ){
        res.status(404).send(console.log(error))
    }
   
});

router.get(`/:id`, async (req,res)=>{
    const {id} = req.params
    try{
      const allGames = await getGamesIds(id)
      
    if(id){
        const filterById = allGames.filter(el => el.id.toString() === id)
        console.log(id);
        filterById.length ?
        res.status(200).send(filterById) :
        res.status(404).send(`There's no game with that id` )
      } else {
        return  res.status(200).send(allGames)
      }
    }catch( error ){
      const allGames = await getGamesIds()
      if(id){
        const filterById = allGames.filter(el => el.id.toString() === id)
        console.log(id);
        filterById.length ?
        res.status(200).send(filterById) :
        res.status(404).send(`There's no game with that id` )
      }
        // console.log(error)
        // return  res.status(404).send('error')
  }
})

router.post('/', async (req, res) => {
    const {name, description, released, rating, platforms, genres, img, createdDb } = req.body
    try{
        const createGame = await Videogame.create({
            name,
            description,
            released,
            platforms,
            rating,
            img,
            createdDb
        })
    const getGenres = await Genre.findAll({where: {name: genres}})
    console.log(getGenres);
    await createGame.addGenre(getGenres)
    return res.send('The game ' + name + ' has been created')
    }catch(error){
        return res.status(404).send(console.log(error))
    }
})
module.exports = router