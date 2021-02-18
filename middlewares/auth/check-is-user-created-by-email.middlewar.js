const { ErrorHandler, errors } = require('../../error');
const { NOT_FOUND, UNAUTHORIZED } = require('../../constants/status-codes');
const { userServices } = require('../../service');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userServices.getUserByEmail(email);

        if (!user) {
            throw new ErrorHandler(errors.WRONG_EMAIL.massage, NOT_FOUND, errors.WRONG_EMAIL.code);
        }

        if (user.deletedAt) {
            throw new ErrorHandler(errors.USER_DELETED, NOT_FOUND, errors.USER_DELETED.code);
        }

        const activated = await userServices.getStatus(user.id);

        if (activated.token !== 'Activated') {
            throw new ErrorHandler(errors.NOT_ACTIVATED_EMAIL, UNAUTHORIZED, errors.NOT_ACTIVATED_EMAIL.code);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
