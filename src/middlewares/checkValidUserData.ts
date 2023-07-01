import { User } from '../models/interfaces/user.interface.js';

export const checkValidUserData = (data: User): User | Error => {
  const { username, age, hobbies } = data;
  if (
    typeof username === 'string'
    && typeof age === 'number'
    && Array.isArray(hobbies)) {
    return data;
  }
  throw new Error();
};