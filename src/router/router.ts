import { IncomingMessage, ServerResponse } from 'http';
import { messagesError } from '../shared/messagesError.js';
import { json } from '../utils/json.js';
import { endpoints } from '../shared/endpoints.js';
import { KeysOfEndpoints, KeysOfMethod } from '../models/types/keysOfTypes.js';
import { ApiError } from '../exceptions/apiError.js';

export const router = (request: IncomingMessage, response: ServerResponse): void => {
  try {
    const { url: endpoint, method } = request;
    response.setHeader('Content-type', 'application/json');

    endpoints[`${endpoint as KeysOfEndpoints}`][`${method as KeysOfMethod}`](request, response);
  } catch (_e) {
    const error = ApiError.NotFound(messagesError.EXIST_ENDPOINTS);
    response.writeHead(error.status).end(json(error.message));
  }
};
