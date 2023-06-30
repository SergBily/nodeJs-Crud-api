import { v4 } from 'uuid';
import { User } from '../models/interfaces/user.interface.js';

class UserService {
  private database: User[] = [];

  public async getAllUsers(): Promise<User[]> {
    return this.database;
  }

  public async createNewUser(user: User): Promise<User> {
    const newUser = { ...user, id: v4() };
    this.database = [...this.database, newUser];
    return newUser;
  }
}

export const userService = new UserService();
