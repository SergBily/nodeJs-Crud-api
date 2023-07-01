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

  public async getUser(userId: string): Promise<User | undefined> {
    return this.database.find((u) => u.id === userId);
  }

  public async updateUser(userId: string, user: User): Promise<User | undefined> {
    const findedUser: User | undefined = this.database.find((u) => u.id === userId);
    if (findedUser) {
      this.database.splice(this.database.indexOf(findedUser), 1, user);
      return user;
    }
    return findedUser;
  }
}

export const userService = new UserService();
