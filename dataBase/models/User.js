module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        login: {
            type: DataTypes.STRING,
            allowNull: false
        },

        photo: {
            type: DataTypes.STRING
        },
        deletedAt: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        tableName: 'User',
        timestamps: false
    });
    const O_Auth = require('./O_Auth');
    const ActionTokens = require('./ActionTokens');

    User.hasMany(O_Auth, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
    });
    User.hasMany(ActionTokens, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
    });

    return User;
};
