import { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import Video from '../../entity/Video';

const getPublishedVideosController: RequestHandler = async (req, res) => {
  const videoRepository = AppDataSource.getRepository(Video);
  const publishedVideos = await videoRepository.findBy({ isPublished: true });
  // Send a 201 Created response with the saved Video object as JSON
  return res.status(201).json(publishedVideos);
};

export default getPublishedVideosController;
