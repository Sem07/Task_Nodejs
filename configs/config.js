module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'resfreshsecret',

    PORT: process.env.PORT || 5000,
    USERNAME_DB: process.env.USERNAME_DB || 'root',
    PASSWORD_DB: process.env.PASSWORD_DB || 'root',
    DATABASE: process.env.DATABASE || 'users',

    EMAIL_SERVICES: process.env.EMAIL_SERVICES || 'gmail',
    EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER || 'xxx@gmail.com',
    EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS || '123456789',

    CRON_EVERY_MONDAY: process.env.CRON_EVERY_MONDAY || '0 5 * * MON',
    DELETE_TOKEN_DAYS: process.env.DELETE_TOKEN_DAYS || 35
};
