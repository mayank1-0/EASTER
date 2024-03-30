module.exports = (sequelize, Sequelize) => {
    const GenresModel = sequelize.define("Genres", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        genre: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            // unique: true,
        }
    });

    return GenresModel;
};
