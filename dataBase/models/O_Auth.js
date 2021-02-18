module.exports = (sequelize, DataTypes) => {
    const O_Auth = sequelize.define('O_Auth', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false,
        },

        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        createAt: {
            type: DataTypes.STRING,
            defaultValue: sequelize.fn('NOW')
        }
    },
    {
        tableName: 'O_Auth',
        timestamps: false
    });

    const User = require('./User');

    O_Auth.belongsTo(User, {
        foreignKey: 'user_id'
    });

    return O_Auth;
};
