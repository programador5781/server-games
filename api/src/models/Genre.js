const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

// Inject la conexión a sequelize.
module.exports = (sequelize) => {
    // Definimos nuestro modelo para Genre
    sequelize.define('Genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};