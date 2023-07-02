const { 
    createVideogame, 
    getVideogameById, 
    searchVideogameByName, 
    getAllVideogames 
} = require('../controllers/videogameController');


/* GET | /videogames
-  Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.

GET | /videogames/name?="..."**

-  Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
*/
const getVideogamesHandler =async (req, res) => {
    const { name } = req.query;

    const results = name ? await searchVideogameByName(name) : await getAllVideogames();

    res.status(200).json(results)
    // return results;

    // if (name) res.send(`Quiero buscar todos los que se llamen ${name}`);
    // else res.send('Quiero enviar todos los videogames');
};

/*GET | /videogames/:idVideogame**

-  Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
-  El videojuego es recibido por parámetro (ID).
-  Tiene que incluir los datos del género del videojuego al que está asociado.
-  Debe funcionar tanto para los videojuegos de la API como para los de la base de datos. */
const getVideogameHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'bdd' : 'api';

    try {
        const videogames = await getVideogameById(id, source);
        res.status(200).json(videogames)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
};

/*POST | /videogames**
-  Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
-  Toda la información debe ser recibida por body.
-  Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno). */
const createVideogameHandler = async (req, res) => {
    const { name, description, platforms, released_at, background_image } = req.body;
    try {
        const newVideogame = await createVideogame(name, description, platforms, released_at, background_image);
        res.status(201).json(newVideogame)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

};

// res.send(`Estoy por crear un videogame con los siguientes datos:
//     name: ${name},
//     description: ${description},
//     platforms: ${platforms},
//     releaseDate: ${releaseDate}
// `)


module.exports = {
    getVideogamesHandler,
    getVideogameHandler,
    createVideogameHandler
}