// Importamos el modelo Videogame desde el archivo ../db
const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const { dataClean } = require('./cleanData');
const { Op } = require('sequelize');



// Definimos una función asincrónica llamada createVideogame que toma cinco parámetros y devuelve una promesa
const createVideogame = async (name, description, platforms, released_at, background_image) =>
    await Videogame.create({ name, description, platforms, released_at, background_image });




const getVideogameById = async (id, source) => {
    let videogame;

    if (source === 'api') {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}&fields=name,background_image,description,genres,rating,platforms,released,website`);

        videogame = response.data;
    } else {
        videogame = await Videogame.findOne({
            where: { id },
            include: { model: Genre },
        });
    }

    return videogame;
};



const searchVideogameByName = async (name) => {
    const dBVideogames = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } }
    });

    const apiVideogames = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results
    const apiVG = dataClean(apiVideogames)
    const filterAPI = apiVG.filter(videogame => videogame.name.toLowerCase().startsWith(name.toLowerCase()));

    if (filterAPI.length === 0 && dBVideogames.length === 0) {
        return 'No se encontró ningún videogame con el nombre ' + name;
    }

    const first15Results = [...filterAPI, ...dBVideogames].slice(0, 15);

    return first15Results;

    // return [...filterAPI, ...dBVideogames]
}


const getAllVideogames = async () => {
    // Obtengo todos los videogames de la DB local
    const dBVideogames = await Videogame.findAll();
    const pageNumbers = 7;

    // Hacer solicitudes a la API y concatenar los resultados en un solo array
    let apiVideogames = [];
    for (let i = 1; i <= pageNumbers; i++) {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        apiVideogames = apiVideogames.concat(response.data.results);
    }

    // Filtrar la información obtenida de la API para eliminar elementos no deseados
    const apiVG = dataClean(apiVideogames)

    // Combinar los videogames obtenidos de DB y la API en un solo array, retornamos ese array
    return [...dBVideogames, ...apiVG];
};





// Exportamos las dos funciones para que puedan ser utilizadas en otros archivos de módulos
module.exports = {
    createVideogame,
    getVideogameById,
    searchVideogameByName,
    getAllVideogames
}