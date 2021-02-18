module.exports = class ErrorHandler extends Error {
    constructor(message, status, code) {
        super(message);
        this.status = status;
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
};
