import { RequestHandler } from 'express';
import User from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { Request as JWTRequest } from 'express-jwt';
import Video from '../../entity/Video';

const postDislikeVideoController: RequestHandler = async (
  req: JWTRequest,
  res,
) => {
  try {
    // Retrieving user repository from AppDataSource and finding user by id in the auth token
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: {
        id: req.auth?.id,
      },
      relations: {
        likedVideos: true,
      },
    });

    // Retrieving video id from request body and checking if it's a number
    const videoId = Number(req.body.id);
    if (isNaN(videoId)) {
      // If videoId is not a number, returning error response
      return res
        .status(400)
        .json({ message: 'The provided id must be a number' });
    }

    // Retrieving video repository from AppDataSource and finding video by id
    const videoRepository = AppDataSource.getRepository(Video);
    const video = await videoRepository.findOneOrFail({
      where: {
        id: videoId,
      },
      // Eager loading 'likedBy' relation
      relations: {
        likedBy: true,
      },
    });
    // Check if user has already liked the video
    const isLiked =
      video.likedBy.find((likedUser) => likedUser.id === user.id) !== undefined;

    if (isLiked) {
      // Deleting Like
      user.likedVideos = user.likedVideos.filter((vid) => vid.id !== videoId);
      await userRepository.save(user);

      // I need to repeat this because object is local
      video.likesCount -= 1;
      video.likedBy = video.likedBy.filter((u) => u.id !== user.id);
      await videoRepository.save(video);
    }

    // Returning success response with user and videoLiked object
    return res.status(201).json({ user: user, videoDisliked: video });
  } catch (err) {
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error liking video' });
  }
};

export default postDislikeVideoController;
