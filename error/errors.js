const {
    EMAIL_ALREADY_EXIST,
    TITLE_ALREADY_EXIST,
    WRONG_EMAIL,
    NOT_VALID_TOKEN,
    NOT_TOKEN,
    USER_NOT_FOUND,
    WRONG_ID,
    NOT_TITLE,
    WRONG_STRIPE_REQUEST,
    ORDER_NOT_FOUND,
    GOOD_NOT_FOUND,
    BAD_REQUEST,
    WRONG_DATA,
    PERMISSION_DENIED,
    BIG_FILE,
    WRONG_FILE,
    ONE_PHOTO,
    NOT_ACTIVATED_EMAIL,
    USER_DELETED

} = require('../constants/statuses.enum');

module.exports = {
    // BAD REQUEST
    EMAIL_ALREADY_EXIST: {
        message: EMAIL_ALREADY_EXIST,
        code: 4002
    },

    REQUEST_IS_EMPTY: {
        message: BAD_REQUEST,
        code: 4002
    },

    TITLE_ALREADY_EXIST: {
        message: TITLE_ALREADY_EXIST,
        code: 4002
    },

    NOT_VALID_BODY: {
        massage: WRONG_DATA,
        code: 4002
    },

    NOT_TITLE: {
        message: NOT_TITLE,
        code: 4001
    },

    NOT_TOKEN: {
        message: NOT_TOKEN,
        code: 4002
    },

    WRONG_ID: {
        message: WRONG_ID,
        code: 4002
    },

    WRONG_STRIPE_REQUEST: {
        message: WRONG_STRIPE_REQUEST,
        code: 4002
    },

    TOO_BIG_FILE: {
        message: BIG_FILE,
        code: 4002
    },
    WRONG_FILE_EXTENSION: {
        message: WRONG_FILE,
        code: 4002
    },
    JUST_ONE_PHOTO: {
        message: ONE_PHOTO,
        code: 4002
    },

    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        message: NOT_VALID_TOKEN,
        code: 4011
    },

    NOT_VALID_REFRESH_TOKEN: {
        message: NOT_VALID_TOKEN,
        code: 4012
    },
    NOT_ACTIVATED_EMAIL: {
        message: NOT_ACTIVATED_EMAIL,
        code: 4011
    },

    // NOT FOUND
    USER_NOT_FOUND: {
        message: USER_NOT_FOUND,
        code: 4041
    },

    ORDER_NOT_FOUND: {
        message: ORDER_NOT_FOUND,
        code: 4041
    },

    GOOD_NOT_FOUND: {
        message: GOOD_NOT_FOUND,
        code: 4041
    },

    WRONG_EMAIL: {
        message: WRONG_EMAIL,
        code: 4001
    },
    USER_DELETED: {
        message: USER_DELETED,
        code: 4041
    },

    // FORBIDDEN
    PERMISSION_DENIED: {
        message: PERMISSION_DENIED,
        code: 4031
    },

};
