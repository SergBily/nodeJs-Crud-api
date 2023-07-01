import { IncomingMessage, ServerResponse } from 'http';
import { checkValidUserData } from '../middlewares/checkValidUserData.js';
import { json } from '../utils/json.js';
import { userService } from '../services/userService.js';
import { User } from '../models/interfaces/user.interface.js';
import { ApiError } from '../exceptions/apiError.js';
import { messagesError } from '../shared/messagesError.js';

class UserController {
  public async getAllUsers(_request: IncomingMessage, response: ServerResponse): Promise<void> {
    const users = await userService.getAllUsers();
    response.writeHead(200).end(json(users));
  }

  public createNewUser(request: IncomingMessage, response: ServerResponse): void {
    let body: string;
    let createdUser: User;

    request.on('data', (chunk: string): void => {
      body = chunk.toString();
    })
      .on('end', async (): Promise<void> => {
        try {
          const parsedBody = JSON.parse(body);
          checkValidUserData(parsedBody);
          createdUser = await userService.createNewUser(parsedBody);
          response.writeHead(201).end(json(createdUser));
        } catch (_e) {
          const error = ApiError.BadRequest(messagesError.REQUIRED);
          response.writeHead(error.status).end(json(error.message));
        }
      });
  }

  public async getUser(_request: IncomingMessage, response: ServerResponse): Promise<void> {
    console.log('getUser');
  }

  public async updateUser(_request: IncomingMessage, response: ServerResponse): Promise<void> {
    console.log('updateUser');
  }

  public async deleteUser(_request: IncomingMessage, response: ServerResponse): Promise<void> {
    console.log('deleteUser');
  }
}

export const userController = new UserController();
