const { Router } = require("express");
const { getPlatforms } = require("../getGames/getGames");
const router = Router();


router.get('/', async (req, res) =>{
    try{
    const platforms = await getPlatforms()
    res.status(200).send(platforms)

    } catch(error) {
      res.status(404).send('No platforms found')
      console.log(error);
    }
})
module.exports = router