const uuid = require('uuid').v1();
const fs = require('fs-extra').promises;
const path = require('path');

const { ACTIVATE_USER_ACCOUNT, DELETE_USER } = require('../../constants/emailAction.enum');
const { CREATED, NO_CONTENT } = require('../../constants/status-codes');
const { passwordHash, uuidToken } = require('../../utils');
const { userServices, emailServices } = require('../../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userServices.getUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            const [avatar] = req.photos;
            const token = await uuidToken();

            user.password = await passwordHash(user.password);
            const newUser = await userServices.createUser(user, token);

            if (avatar) {
                const photoDir = `users/${newUser.id}/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), { recursive: true });
                await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));

                await userServices.updateUser(newUser.id, { photo: `${photoDir}/${photoName}` });
            }

            await emailServices.sendMail(user.email, ACTIVATE_USER_ACCOUNT, {
                token,
                userName: user.login
            });

            res.status(CREATED).end();
        } catch (e) {
            next(e);
        }
    },

    getOneUsers: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userServices.getUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { email } = req.params;

            const user = await userServices.deletedUser(email);

            res.status(NO_CONTENT).json(`User delete: ${user}`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updateUser = req.body;
            const [avatar] = req.photos;
            const { id } = req.params;
            if (avatar) {
                const photoDir = `users/${id}/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), { recursive: true });
                await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));

                await userServices.updateUser(id, { photo: `${photoDir}/${photoName}` });
            }

            const db = await userServices.updateUser(id, updateUser);

            res.status(CREATED).json(db);
        } catch (e) {
            next(e);
        }
    },
};
