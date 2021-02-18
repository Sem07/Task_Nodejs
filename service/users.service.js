const db = require('../dataBase').getInstance();

module.exports = {
    getUserById: (id) => {
        const UserModel = db.getModel('User');
        return UserModel.findByPk(id);
    },

    getUsers: () => {
        const UserModel = db.getModel('User');
        UserModel.findAll();
    },

    deletedUser: async (email) => {
        const UserModel = db.getModel('User');
        await UserModel.update(
            { deletedAt: true },
            { where: { email } }
        );
    },

    createUser: async (user, token) => {
        const UserModel = db.getModel('User');
        const ActionTokens = db.getModel('ActionTokens');
        const createdUser = await UserModel.create(user);
        await ActionTokens.create({ user_id: createdUser.id, token });
    },

    updateUser: (id, obj) => {
        const UserModel = db.getModel('User');
        UserModel.update(
            { ...obj },
            {
                where: { id }
            }
        );
    },

    getUserByEmail: (email) => {
        const UserModel = db.getModel('User');

        return UserModel.findOne({
            where: { email },
        });
    },

    getUserByToken: (token) => {
        const ActionModel = db.getModel('ActionTokens');

        return ActionModel.findOne({
            where: { token }
        });
    },

    getStatus: (user_id) => {
        const ActionModel = db.getModel('ActionTokens');

        return ActionModel.findOne({
            where: { user_id },
        });
    },
    setActivateStatus: async (user_id) => {
        const ActionModel = db.getModel('ActionTokens');

        await ActionModel.update(
            { token: 'Activated' },
            { where: { user_id } }
        );
    },
};
