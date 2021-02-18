const { ACTIVATE_USER_ACCOUNT } = require('../constants/emailAction.enum');

module.exports = {
    [ACTIVATE_USER_ACCOUNT]: {
        subject: 'Activate your account',
        templateFileName: 'activateAccount'
    }
   };
