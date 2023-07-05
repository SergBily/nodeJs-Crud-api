// eslint-disable-next-line import/no-cycle
import { AllUsers, User } from '../types/keysOfTypes';

export interface Endpoints {
  '/api/users': AllUsers;
  '/api/users/:id': User;
}
