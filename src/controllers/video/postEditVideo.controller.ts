import { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import Video from '../../entity/Video';
import { EntityNotFoundError } from 'typeorm';

const postEditVideoController: RequestHandler = async (req, res) => {
  try {
    const videoRepository = AppDataSource.getRepository(Video);

    // This is a workaround for a bug in which repository.findOneByOrFail
    // returning object 4 when undefined is passed as id
    const videoParamId = req.body.id;
    if (videoParamId === undefined) {
      return res.status(400).json({ message: 'An ID must me provided' });
    }

    const videoId = Number(videoParamId);
    // Check if the videoId is not a number. AKA not a valid ID
    if (isNaN(videoId)) {
      return res
        .status(400)
        .json({ message: 'The provided id must be a number' });
    }

    const video = await videoRepository.findOneByOrFail({ id: videoId });

    video.title = req.body.title;
    video.url = req.body.url;
    video.thumbnailUrl = req.body.thumbnailUrl;
    video.isPublished = req.body.isPublished;
    video.description = req.body.description;

    await videoRepository.save(video);

    // Send a 201 Created response with the updated Video object as JSON
    return res.status(201).json(video);
  } catch (err) {
    // If the error is an EntityNotFoundError (thrown when no entity is found with the specified ID)
    if (err instanceof EntityNotFoundError) {
      return res.status(400).json({ error: err.message });
    }
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error Editing video' });
  }
};

export default postEditVideoController;
