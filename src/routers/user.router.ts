import express from 'express';
import postSignUpUserController from '../controllers/user/postSignUpUser.controller';

const userRouter = express.Router();

userRouter.post('/create', postSignUpUserController);

export default userRouter;
