module.exports = (sequelize, Sequelize) => {
    const AuthorsModel = sequelize.define("Authors", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },

        author: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        }
    });

    return AuthorsModel;
};
