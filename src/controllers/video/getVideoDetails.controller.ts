import { RequestHandler } from 'express';
import { AppDataSource } from '../../data-source';
import Video from '../../entity/Video';
import { EntityNotFoundError } from 'typeorm';

const getVideoDetailsController: RequestHandler = async (req, res) => {
  try {
    const videoRepository = AppDataSource.getRepository(Video);
    // This is a workaround for a bug in which repository.findOneByOrFail
    // returning object 4 when undefined is passed as id
    const videoId = Number(req.params.id);

    // Check if the videoId is not a number
    if (isNaN(videoId)) {
      return res
        .status(400)
        .json({ message: 'The provided id must be a number' });
    }

    // Getting video from id provided by user
    const video = await videoRepository.findOneOrFail({
      where: { id: videoId },
      relations: {
        likedBy: true,
        user: true,
      },
    });
    // Send a 201 Created response with the updated Video object as JSON
    return res.status(201).json(video);
  } catch (err) {
    // If the error is an EntityNotFoundError (thrown when no entity is found with the specified ID)
    if (err instanceof EntityNotFoundError) {
      return res.status(400).json({ error: err.message });
    }
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error getting video' });
  }
};

export default getVideoDetailsController;
