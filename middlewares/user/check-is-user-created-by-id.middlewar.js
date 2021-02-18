const { userServices } = require('../../service');
const { BAD_REQUEST } = require('../../constants/status-codes');
const { ErrorHandler, errors } = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await userServices.getUserById(userId);

        if (!user) {
            throw new ErrorHandler(errors.USER_NOT_FOUND.message, BAD_REQUEST, errors.USER_NOT_FOUND.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
