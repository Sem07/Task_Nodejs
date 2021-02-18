const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const { config: { DATABASE, PASSWORD_DB, USERNAME_DB } } = require('../configs');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DATABASE, USERNAME_DB, PASSWORD_DB,
            {
                host: 'localhost',
                dialect: 'mysql'
            });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

        function getModels() {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    const modelFile = require(path.join(modelsPath, model));
                    models[model] = modelFile(client, DataTypes);
                });
            });
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
