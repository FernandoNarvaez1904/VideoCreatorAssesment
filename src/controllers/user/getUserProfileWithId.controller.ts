import { RequestHandler } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { AppDataSource } from '../../data-source';
import User from '../../entity/User';

const getUserProfileControllerWithId: RequestHandler = async (
  req: JWTRequest,
  res,
) => {
  try {
    const userId = Number(req.params.id);
    // Check if the userId is not a number
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ message: 'The provided id must be a number' });
    }

    // Get the user
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.find({
      where: {
        id: userId,
      },
      // It is needed to query the relationships
      relations: {
        videos: true,
        likedVideos: true,
      },
    });

    // Send a 201 Created response with the saved Video object as JSON
    return res.status(201).json(user);
  } catch (err) {
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error Getting User Profile' });
  }
};

export default getUserProfileControllerWithId;
