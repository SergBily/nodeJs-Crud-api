import { userController } from '../controllers/userController';
import { Endpoints } from '../models/interfaces/endpoints.interface';

export const endpoints: Endpoints = {
  '/api/users': {
    GET: userController.getAllUsers,
    POST: userController.createNewUser,
  },
  '/api/users/:id': {
    GET: userController.getUser,
    PUT: userController.updateUser,
    DELETE: userController.deleteUser,
  },
};
