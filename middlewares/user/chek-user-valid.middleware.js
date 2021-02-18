const Joi = require('joi');

const { ErrorHandler, errors } = require('../../error');
const { BAD_REQUEST } = require('../../constants/status-codes');
const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const { error } = Joi.validate(user, userValidator.newUserValidator);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.massage, BAD_REQUEST, errors.NOT_VALID_BODY.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
