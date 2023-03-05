import express from 'express';
import postSignUpUserController from '../controllers/user/postSignUpUser.controller';
import postSignInUserController from '../controllers/user/postSignInUser.controller';
import { Secret } from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import getUserProfileController from '../controllers/user/getUserProfile.controller';

const userRouter = express.Router();

// JWT Authentication
const secret = process.env.SECRET_KEY as Secret;
userRouter.use(
  expressjwt({ secret: secret, algorithms: ['HS256'] }).unless({
    // Not Protected Routes
    path: ['/user/signin', '/user/signup'],
  }),
);

userRouter.get('/profile', getUserProfileController);

userRouter.post('/signup', postSignUpUserController);
userRouter.post('/signin', postSignInUserController);

export default userRouter;
