const { ErrorHandler, errors } = require('../../error');
const { NOT_FOUND } = require('../../constants/status-codes');
const { checkHash } = require('../../utils');

module.exports = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { user } = req.user;

        const status = await checkHash(user.password, password);

        if (!status) {
            throw new ErrorHandler(errors.USER_NOT_FOUND.massage, NOT_FOUND, errors.USER_NOT_FOUND.code);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
