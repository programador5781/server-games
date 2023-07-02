const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;

const getGenres = async (req, res) =>{

        const genresDB = await Genre.findAll();

        if(genresDB.length){
            return genresDB
        } else {
            const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            // const response = await axios.get('https://apimocha.com/pi-videogames/genres')
            const genres = response.data.results;

            for (const genre of genres) {
                await Genre.findOrCreate({
                    where: {
                        name: genre.name
                    }
                });
            }

            const genresReady = genres.map(game => {
                return {
                    id: game.id,
                    name: game.name
                };
            });
            return genresReady;
            /*De esta manera, la función getGenres devuelve los géneros y el handler los envía de vuelta al cliente en la respuesta res. En lugar de simplemente imprimirlos con res.json(genresReady)*/
        }
};

module.exports = {
    getGenres
};

