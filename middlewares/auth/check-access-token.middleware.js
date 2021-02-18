const jwt = require('jsonwebtoken');

const { authServices } = require('../../service');
const { BAD_REQUEST, UNAUTHORIZED, FORBIDDEN } = require('../../constants/status-codes');
const { config: { JWT_SECRET } } = require('../../configs');
const { AUTHORIZATION } = require('../../constants/constans');
const { ErrorHandler, errors } = require('../../error');

module.exports = async (req, res, next) => {
    const access_token = req.get(AUTHORIZATION);

    if (!access_token) {
        throw new ErrorHandler(errors.NOT_TOKEN.message, BAD_REQUEST, errors.NOT_TOKEN.code);
    }

    jwt.verify(access_token, JWT_SECRET, (err) => {
        if (err) {
            throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, UNAUTHORIZED, errors.NOT_VALID_TOKEN.code);
        }
    });
    const isTokenExist = await authServices.getTokensByParams({ access_token });

    if (!isTokenExist) {
        throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, UNAUTHORIZED, errors.NOT_VALID_TOKEN.code);
    }

    if (+req.params.id !== isTokenExist.id) {
        throw new ErrorHandler(errors.PERMISSION_DENIED.message, FORBIDDEN, errors.PERMISSION_DENIED.code);
    }

    req.user = isTokenExist.id;

    next();
};
