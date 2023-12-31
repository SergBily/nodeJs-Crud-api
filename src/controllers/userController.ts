import { IncomingMessage, ServerResponse } from 'http';
import { getUserId } from '../utils/getUserId';
import { checkValidUserData } from '../middlewares/checkValidUserData';
import { json } from '../utils/json';
import { userService } from '../services/userService';
import { User } from '../models/interfaces/user.interface';
import { ApiError } from '../exceptions/apiError';
import { messagesError } from '../shared/messagesError';
import { KeysOfMessageError } from '../models/types/keysOfTypes';
import { HttpStatus } from '../models/enum/httpStatus.enum';
import { NameErrors } from '../models/enum/errors.enum';

class UserController {
  public async getAllUsers(_request: IncomingMessage, response: ServerResponse): Promise<void> {
    const users = await userService.getAllUsers();
    response.writeHead(HttpStatus.ok).end(json(users));
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
          response.writeHead(HttpStatus.ok).end(json(createdUser));
        } catch (_e) {
          const error = ApiError.BadRequest(messagesError.REQUIRED);
          response.writeHead(error.status).end(json(error.message));
        }
      });
  }

  public async getUser(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url: endpoint } = request;
    const userId = getUserId(endpoint as string);
    const user: User | undefined = await userService.getUser(userId);

    if (user) {
      response.writeHead(HttpStatus.ok).end(json(user));
    } else {
      const error = ApiError.NotFound(messagesError.EXIST);
      response.writeHead(error.status).end(json(error.message));
    }
  }

  public async updateUser(request: IncomingMessage, response: ServerResponse): Promise<void> {
    let body: string;
    let updatedUser: User | undefined;
    const { url: endpoint } = request;
    const userId = getUserId(endpoint as string);

    request.on('data', (chunk: string): void => {
      body = chunk.toString();
    })
      .on('end', async (): Promise<void> => {
        try {
          const parsedBody = JSON.parse(body);
          checkValidUserData(parsedBody);
          updatedUser = await userService.updateUser(userId, parsedBody);

          if (updatedUser) {
            response.writeHead(HttpStatus.created).end(json(updatedUser));
          } else {
            throw new Error(NameErrors.exist);
          }
        } catch (e) {
          const err = e as Error;
          let nameErr = NameErrors.type_data;
          let status = HttpStatus.bad_request;
          if (err.message === NameErrors.exist) {
            status = HttpStatus.not_found;
            nameErr = NameErrors.exist;
          } else if (err.message === NameErrors.required) {
            nameErr = NameErrors.required;
          }
          const error = ApiError.dynamicError(status, messagesError[nameErr as KeysOfMessageError]);
          response.writeHead(error.status).end(json(error.message));
        }
      });
  }

  public async deleteUser(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url: endpoint } = request;
    const userId = getUserId(endpoint as string);
    const deletedUser = await userService.deleteUser(userId);
    if (deletedUser) {
      response.writeHead(HttpStatus.no_content).end(json('Record of user is deleted'));
    } else {
      const error = ApiError.NotFound(messagesError.EXIST);
      response.writeHead(error.status).end(json(error.message));
    }
  }
}

export const userController = new UserController();
