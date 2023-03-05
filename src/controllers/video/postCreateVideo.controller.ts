import { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import Video from '../../entity/Video';
import { QueryFailedError } from 'typeorm';
import { Request as JWTRequest } from 'express-jwt';
import User from '../../entity/User';

const postCreateVideoController: RequestHandler = async (
  req: JWTRequest,
  res,
) => {
  try {
    // Create a new Video object
    const video = new Video();

    // Set the properties of the Video object from the request body
    video.title = req.body.title;
    video.url = req.body.url;
    video.thumbnailUrl = req.body.thumbnailUrl;
    video.description = req.body.description;
    video.isPublished = false;

    // Adding user to the video
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneByOrFail({ id: req.auth?.id }); // The orFail saves me the if null statement

    // Save the new Video object to the database
    const videoRepository = AppDataSource.getRepository(Video);
    await videoRepository.save(video);

    // Send a 201 Created response with the saved Video object as JSON
    return res.status(201).json(video);
  } catch (err) {
    // Giving error feedback to user
    if (err instanceof QueryFailedError) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Error creating video' });
  }
};

export default postCreateVideoController;
