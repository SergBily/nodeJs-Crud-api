class UserService {
  private database = [{ id: '993988' }];

  public async getAllUsers() {
    return this.database;
  }

  public createNewUser() {

  }
}

export const userService = new UserService();
