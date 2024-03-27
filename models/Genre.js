// models/Genre.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Book = require('./Book');

const Genre = sequelize.define('Genre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Define other columns...
});

Genre.hasMany(Book); // A genre can have many books

module.exports = Genre;
