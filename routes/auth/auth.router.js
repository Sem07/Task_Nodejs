const { Router } = require('express');

const authController = require('../../controllers/auth');
const { authMiddlewares } = require('../../middlewares');

const authRouter = Router();

authRouter.post('/login',
    authMiddlewares.checkAuthUserValid,
    authMiddlewares.checkIsUserCreated,
    authMiddlewares.checkPassword,
    authController.loginUser);

authRouter.post('/refresh',
    authMiddlewares.checkRefreshToken,
    authController.refreshToken);

authRouter.post('/logout',
    authMiddlewares.checkAccessToken,
    authController.logoutUser);

authRouter.get('/activateAccount/:token',
    authMiddlewares.isActionTokenExist,
    authController.activateAccount);

module.exports = authRouter;
