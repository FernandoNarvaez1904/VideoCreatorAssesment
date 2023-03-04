import { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import Video from '../../entity/Video';

const postCreateVideoController: RequestHandler = async (req, res) => {
  try {
    // Create a new Video object
    const video = new Video();

    // Set the properties of the Video object from the request body
    video.title = req.body.title;
    video.url = req.body.url;
    video.thumbnailUrl = req.body.thumbnailUrl;
    video.isPublished = req.body.isPublished;
    video.description = req.body.description;
    video.isPublished = false;

    // Save the new Video object to the database
    const videoRepository = AppDataSource.getRepository(Video);
    await videoRepository.save(video);

    // Send a 201 Created response with the saved Video object as JSON
    return res.status(201).json(video);
  } catch (err) {
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error creating video' });
  }
};

export default postCreateVideoController;
