const { getGenres } = require('../controllers/genresController');

const genresHandler = async (req, res) => {
  try {
    // Llamamos al controlador que obtiene los géneros y guardamos la respuesta en una variable
    const genres = await getGenres();

    // Enviamos la respuesta al cliente
    res.status(200).json(genres);
  } catch (error) {
    // Enviamos una respuesta con un mensaje de error al cliente
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  genresHandler,
};
