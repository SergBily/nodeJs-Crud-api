// eslint-disable-next-line import/no-cycle
import { Endpoints } from '../interfaces/endpoints.interface';
import { Method } from './method.type';
import { MessagesError } from '../interfaces/messagesError.interface';

export type AllUsers = Omit<Method, 'PUT' | 'DELETE'>;
export type User = Omit<Method, 'POST'>;
export type KeysOfEndpoints = keyof Endpoints;
export type KeysOfMethod = keyof AllUsers & keyof User;
export type KeysOfMessageError = keyof MessagesError;
