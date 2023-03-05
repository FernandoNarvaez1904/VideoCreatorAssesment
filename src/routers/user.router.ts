import express from 'express';
import postSignUpUserController from '../controllers/user/postSignUpUser.controller';
import postSignInUserController from '../controllers/user/postSignInUser.controller';

const userRouter = express.Router();

userRouter.post('/signup', postSignUpUserController);
userRouter.post('/signin', postSignInUserController);

export default userRouter;
