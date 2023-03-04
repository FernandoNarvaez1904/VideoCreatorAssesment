import express from 'express';
import getPublishedVideosController from '../controllers/video/getPublishedVideos.controller';
import postCreateVideoController from '../controllers/video/postCreateVideo.controller';
import postToggleIsPublishedVideoController from '../controllers/video/postToggleIsPublishedVideo.controller';

const videoRouter = express.Router();

videoRouter.get('/published', getPublishedVideosController);

videoRouter.post('/create', postCreateVideoController);
videoRouter.post('/toggleIsPublished', postToggleIsPublishedVideoController);

export default videoRouter;
