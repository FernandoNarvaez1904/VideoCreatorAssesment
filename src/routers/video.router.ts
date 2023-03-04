import express from 'express';
import getPublishedVideosController from '../controllers/video/getPublishedVideos.controller';
import getVideoDetailsController from '../controllers/video/getVideoDetails.controller';
import postCreateVideoController from '../controllers/video/postCreateVideo.controller';
import postToggleIsPublishedVideoController from '../controllers/video/postToggleIsPublishedVideo.controller';

const videoRouter = express.Router();

videoRouter.get('/published', getPublishedVideosController);
videoRouter.get('/detail/:id', getVideoDetailsController);

videoRouter.post('/create', postCreateVideoController);
videoRouter.post('/toggleIsPublished', postToggleIsPublishedVideoController);

export default videoRouter;
