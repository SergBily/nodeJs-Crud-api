import { AllUsers, User } from '../types/keysOfTypes.js';

export interface Endpoints {
  '/api/users': AllUsers;
  '/api/users/:id': User;
}
