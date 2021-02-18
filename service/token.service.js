const { O_AuthModel } = require('../base/models');

module.exports = {
    getAllToken: () => O_AuthModel().findAll(),

    deleteToken: (id) => O_AuthModel.destroy({
        where: { id }
    }),

};
