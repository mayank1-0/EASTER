const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize"); //Sequelize is the framework/module. It is an ORM(Object-Relational-Mapping)

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.development.dialect,
    // logging: false  //To log all the running queries
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Authors = require("../models/Authors.model")(sequelize, Sequelize);
const Books = require("../models/Books.model")(sequelize, Sequelize);
const Genres = require("../models/Genres.model")(sequelize, Sequelize);
const Languages = require("../models/Languages.model")(sequelize, Sequelize);
const Users = require('./Users.model')(sequelize, Sequelize);

// P.K - F.K. -1. Foreign key one comes later i.e Books
Authors.hasMany(Books, {
  foreignKey: "author"
});
Books.belongsTo(Authors, {
  foreignKey: "author",
});

// P.K - F.K. -2.
Genres.hasMany(Books, {
  foreignKey: "genre"
});
Books.belongsTo(Genres, {
  foreignKey: "genre",
});

db.Authors = Authors;
db.Books = Books;
db.Genres = Genres;
db.Languages = Languages;
db.Users = Users;

module.exports = db;
