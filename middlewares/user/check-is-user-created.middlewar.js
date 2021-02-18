const { ErrorHandler, errors } = require('../../error');
const { BAD_REQUEST } = require('../../constants/status-codes');
const { userServices } = require('../../service');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userServices.getUserByEmail(email);

        if (user) {
            throw new ErrorHandler(errors.EMAIL_ALREADY_EXIST.massage, BAD_REQUEST, errors.EMAIL_ALREADY_EXIST.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
