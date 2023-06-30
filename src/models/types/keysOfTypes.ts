import { Endpoints } from '../interfaces/endpoints.interface.js';
import { Method } from './method.type.js';

export type KeysOfEndpoints = keyof Endpoints;
export type KeysOfMethod = keyof Method;
