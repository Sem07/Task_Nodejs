const db = require('../dataBase').getInstance();

module.exports = {
    createTokens: (tokens) => {
        const O_AuthModel = db.getModel('O_Auth');
        return O_AuthModel.create(tokens);
    },

    deleteByParams: (params) => {
        const O_AuthModel = db.getModel('O_Auth');
        O_AuthModel.destroy({
            where: params
        });
    },

    getTokensByParams: (params) => {
        const O_AuthModel = db.getModel('O_Auth');
        const UserModel = db.getModel('User');

        return UserModel.findOne({
            include: {
                model: O_AuthModel,
                where: params
            }
        });
    }
};
