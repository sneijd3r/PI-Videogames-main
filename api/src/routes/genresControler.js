const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");

router.get('/', async (req, res) =>{
    try{

    const genres = await Genre.findAll()
    res.status(200).send(genres)

    } catch(error) {
      res.status(404).send('No genres found')
      console.log(error);
    }
})
module.exports = router