import { RequestHandler } from 'express';
import User from '../../entity/User';
import { AppDataSource } from '../../data-source';
import jwt from 'jsonwebtoken';
import { EntityNotFoundError } from 'typeorm';

const postSignInUserController: RequestHandler = async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneByOrFail({
      username: req.body.username,
    });

    // Checking if credentials are correct
    const isCredentialsCorrect = await user.checkPassword(req.body.password);

    // If credentials are incorrect, returning error response
    if (!isCredentialsCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If credentials are is correct, generating JWT token and sending it in response
    const secretKey = process.env.SECRET_KEY as string;
    const accessToken = jwt.sign({ id: user.id }, secretKey);
    return res.status(201).json({ token: accessToken });
  } catch (err) {
    if (err instanceof EntityNotFoundError) {
      return res.status(400).json({ message: err.message });
    }
    // Giving error feedback to user
    return res.status(500).json({ message: 'Error Signing In User' });
  }
};

export default postSignInUserController;
