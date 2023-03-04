import { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import Video from '../../entity/Video';
import { EntityNotFoundError } from 'typeorm';

const postToggleIsPublishedVideoController: RequestHandler = async (
  req,
  res,
) => {
  try {
    const videoRepository = AppDataSource.getRepository(Video);

    // This is a workaround for a bug in which repository.findOneByOrFail
    // returning object 4 when undefined is passed as id
    const videoId = req.body.id;
    if (!videoId) {
      return res.status(500).json({ message: 'Error creating video' });
    }
    const video = await videoRepository.findOneByOrFail({ id: videoId });

    video.isPublished = !video.isPublished;
    await videoRepository.save(video);

    // Send a 201 Created response with the updated Video object as JSON
    return res.status(201).json(video);
  } catch (err) {
    // If the error is an EntityNotFoundError (thrown when no entity is found with the specified ID)
    if (err instanceof EntityNotFoundError) {
      return res.status(400).json({ error: err.message });
    }
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error creating video' });
  }
};

export default postToggleIsPublishedVideoController;
