import { userController } from '../controllers/userController.js';
import { Endpoints } from '../models/interfaces/endpoints.interface.js';

export const endpoints: Endpoints = {
  '/api/users': {
    GET: userController.getAllUsers,
    POST: userController.createNewUser,
  },
};
