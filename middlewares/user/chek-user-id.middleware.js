const Joi = require('joi');

const { ErrorHandler, errors } = require('../../error');
const { NOT_FOUND } = require('../../constants/status-codes');
const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const { id } = req.params;

        const { error } = Joi.validate(id, userValidator.checkUserId);

        if (error) {
            throw new ErrorHandler(errors.USER_NOT_FOUND.message, NOT_FOUND, errors.USER_NOT_FOUND.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
