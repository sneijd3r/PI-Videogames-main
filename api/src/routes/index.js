const { Router } = require('express');
const videogames = require('./videogamesControler')
const genres = require('./genresControler')
const platforms = require('./platformsControler')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/Videogames', videogames)
router.use('/Genres', genres)
router.use('/Platforms', platforms)


module.exports = router;
