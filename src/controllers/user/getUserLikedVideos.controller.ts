import { RequestHandler } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { AppDataSource } from '../../data-source';
import User from '../../entity/User';

const getUserLikedVideosController: RequestHandler = async (
  req: JWTRequest,
  res,
) => {
  try {
    // Getting Requesting User
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: {
        id: req.auth?.id,
      },
      // It is needed to query the relationships
      relations: {
        likedVideos: true,
      },
    });

    // Send a 201 Created response with the saved Video object as JSON
    return res.status(201).json({ likedVideos: user.likedVideos });
  } catch (err) {
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error Getting Liked Videos' });
  }
};

export default getUserLikedVideosController;
