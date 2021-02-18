const Joi = require('joi');

const { ErrorHandler, errors } = require('../../error');
const { BAD_REQUEST } = require('../../constants/status-codes');
const { authValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const { error } = Joi.validate(user, authValidator.authUserValidator);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.massage, BAD_REQUEST, errors.NOT_VALID_BODY.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
