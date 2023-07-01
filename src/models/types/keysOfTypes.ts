import { Endpoints } from '../interfaces/endpoints.interface.js';
import { Method } from './method.type.js';
import { MessagesError } from '../interfaces/messagesError.interface.js';

export type AllUsers = Omit<Method, 'PUT' | 'DELETE'>;
export type User = Omit<Method, 'POST'>;
export type KeysOfEndpoints = keyof Endpoints;
export type KeysOfMethod = keyof AllUsers & keyof User;
export type KeysOfMessageError = keyof MessagesError;
