const { Router } = require('express');
const { getVideogamesHandler,
    getVideogameHandler,
    createVideogameHandler 
} = require('../handlers/videogamesHandlers')

const videogamesRouter = Router();




// GET | /videogames
videogamesRouter.get('/', getVideogamesHandler);
// GET | /videogames/:idVideogame
videogamesRouter.get('/:id', getVideogameHandler);
// POST | /videogames
videogamesRouter.post('/', createVideogameHandler);



module.exports = videogamesRouter;