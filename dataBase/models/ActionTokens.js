module.exports = (sequelize, DataTypes) => {
    const ActionTokens = sequelize.define('ActionTokens', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        token: {
            type: DataTypes.STRING,
            allowNull: false
        },

        createAt: {
            type: DataTypes.STRING,
            defaultValue: sequelize.fn('NOW')
        }

    },
    {
        tableName: 'ActionTokens',
        timestamps: false
    });

    const User = require('./User');

    ActionTokens.belongsTo(User, {
        foreignKey: 'user_id'
    });

    return ActionTokens;
};
