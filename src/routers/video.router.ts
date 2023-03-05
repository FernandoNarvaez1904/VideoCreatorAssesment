import express from 'express';
import getPublishedVideosController from '../controllers/video/getPublishedVideos.controller';
import getVideoDetailsController from '../controllers/video/getVideoDetails.controller';
import postCreateVideoController from '../controllers/video/postCreateVideo.controller';
import postToggleIsPublishedVideoController from '../controllers/video/postToggleIsPublishedVideo.controller';
import postEditVideoController from '../controllers/video/postEditVideo.controller';
import { expressjwt } from 'express-jwt';
import { Secret } from 'jsonwebtoken';

const videoRouter = express.Router();

// JWT Authentication
const secret = process.env.SECRET_KEY as Secret;
videoRouter.use(expressjwt({ secret: secret, algorithms: ['HS256'] }));

videoRouter.get('/published', getPublishedVideosController);
videoRouter.get('/detail/:id', getVideoDetailsController);

videoRouter.post('/create', postCreateVideoController);
videoRouter.post('/toggleIsPublished', postToggleIsPublishedVideoController);
videoRouter.post('/edit', postEditVideoController);

export default videoRouter;
