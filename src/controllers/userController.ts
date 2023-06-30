import { IncomingMessage, ServerResponse } from 'http';
import { json } from '../utils/json.js';
import { userService } from '../services/userService.js';
// import { ApiError } from '../exceptions/apiError.js';

class UserController {
  public async getAllUsers(_request: IncomingMessage, response: ServerResponse) {
    const users = await userService.getAllUsers();
    response.writeHead(200).end(json(users));
  }

  public createNewUser() {

  }
}

export const userController = new UserController();
