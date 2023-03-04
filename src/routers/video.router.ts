import express from 'express';
import postCreateVideoController from '../controllers/video/postCreateVideo.controller';

const videoRouter = express.Router();


videoRouter.post('/create', postCreateVideoController);

export default videoRouter;
