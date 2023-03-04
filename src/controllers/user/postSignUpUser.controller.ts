import { RequestHandler } from 'express';
import User from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { QueryFailedError } from 'typeorm';

const postSignUpUserController: RequestHandler = async (req, res) => {
  try {
    // Create a new User object
    const user = new User();

    // Set the properties of the User object from the request body
    user.username = req.body.username.toLowerCase();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;

    // Save the new User object to the database
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    // Send a 201 Created response with the saved Video object as JSON
    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof QueryFailedError)
      return res.status(400).json({ message: err.driverError.detail });
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error creating video' });
  }
};

export default postSignUpUserController;
