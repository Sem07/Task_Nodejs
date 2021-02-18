const { ErrorHandler, errors } = require('../../error');
const { BAD_REQUEST } = require('../../constants/status-codes');

module.exports = (req, res, next) => {
    if (req.photos.length > 1) {
        throw new ErrorHandler(errors.JUST_ONE_PHOTO.message, BAD_REQUEST, errors.JUST_ONE_PHOTO.code);
    }

    next();
};
