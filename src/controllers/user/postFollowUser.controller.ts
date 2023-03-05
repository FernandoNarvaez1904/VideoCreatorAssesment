import { RequestHandler } from 'express';
import User from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { Request as JWTRequest } from 'express-jwt';

const postFollowUserController: RequestHandler = async (
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
        follows: true,
        isFollowedBy: true,
      },
    });

    const userId = Number(req.body.id);
    // Check if the userId is not a number
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided id must be a number' });
    }
    const otherUser = await userRepository.findOneOrFail({
      where: {
        id: userId,
      },
      // It is needed to query the relationships
      relations: {
        likedVideos: true,
      },
    });

    // Following otherUser
    user.follows.push(otherUser);
    await userRepository.save(user);

    // Returning success response with user and videoLiked object
    return res.status(201).json(user);
  } catch (err) {
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error Following user' });
  }
};

export default postFollowUserController;
