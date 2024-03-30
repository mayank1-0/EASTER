module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define("Users", {
        fullName: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'member'
        }
    });

    return UserModel;
};
