import { RequestHandler } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { AppDataSource } from '../../data-source';
import User from '../../entity/User';

const getUserProfileController: RequestHandler = async (
  req: JWTRequest,
  res,
) => {
  try {
    // Getting Requesting User
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.find({
      where: {
        id: req.auth?.id,
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

export default getUserProfileController;
