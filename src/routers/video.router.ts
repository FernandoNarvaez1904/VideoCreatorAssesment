import express from 'express';
import postCreateVideoController from '../controllers/video/postCreateVideo.controller';
import postToggleIsPublishedVideoController from '../controllers/video/postToggleIsPublishedVideo.controller';

const videoRouter = express.Router();


videoRouter.post('/create', postCreateVideoController);
videoRouter.post('/toggleIsPublished', postToggleIsPublishedVideoController);

export default videoRouter;
