const bcrypt = require('bcrypt');

module.exports = async (hashedPassword, password) => {
    const status = await bcrypt.compare(password, hashedPassword);
    return status;
};
