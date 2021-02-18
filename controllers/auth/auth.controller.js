const { AUTHORIZATION } = require('../../constants/constans');
const { authServices, userServices } = require('../../service');
const { jwtTokinazer } = require('../../utils');
const { NO_CONTENT } = require('../../constants/status-codes');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const user_id = req.user.id;

            const tokens = jwtTokinazer();
            await authServices.createTokens({ ...tokens, user_id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await authServices.deleteByParams({ access_token });

            res.status(NO_CONTENT).json('User logout');
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            await authServices.deleteByParams({ refresh_token });

            const tokens = jwtTokinazer();
            await authServices.createTokens({ ...tokens, user_id: req.user.id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    activateAccount: async (req, res, next) => {
        try {
            const { user_id } = req.user;

            await userServices.setActivateStatus(user_id);

            res.json('Activated');
        } catch (e) {
            next(e);
        }
    },

};
