const { userServices } = require('../../service');
const { NOT_FOUND } = require('../../constants/status-codes');
const { ErrorHandler, errors } = require('../../error');

module.exports = async (req, res, next) => {
    const { token } = req.query;

    const user = await userServices.getUserByToken(token);

    if (!user) {
        throw new ErrorHandler(errors.USER_NOT_FOUND.message, NOT_FOUND, errors.USER_NOT_FOUND.code);
    }

    req.user = user;

    next();
};
