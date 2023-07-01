import { IncomingMessage, ServerResponse } from 'http';
import { typeOfErrors } from '../shared/typeOfErrors.js';
import { createEndpointId } from '../utils/createEndpointId.js';
import { checkValidUserId } from '../middlewares/checkValidUserId.js';
import { messagesError } from '../shared/messagesError.js';
import { json } from '../utils/json.js';
import { endpoints } from '../shared/endpoints.js';
import { KeysOfEndpoints, KeysOfMessageError, KeysOfMethod } from '../models/types/keysOfTypes.js';
import { ApiError } from '../exceptions/apiError.js';

export const router = (request: IncomingMessage, response: ServerResponse): void => {
  try {
    const { method } = request;
    let endpoint = request.url;
    response.setHeader('Content-type', 'application/json');
    const endpointLength = endpoint?.split('/').length;

    if (endpointLength && endpointLength > 3) {
      checkValidUserId(endpoint as string);
      endpoint = createEndpointId(endpoint as string);
    }

    endpoints[`${endpoint as KeysOfEndpoints}`][`${method as KeysOfMethod}`](request, response);
  } catch (e) {
    const err = e as Error;
    let typeErr = 'SERVER';
    let status = 500;

    if (err.message.match(typeOfErrors.endpoint)) {
      typeErr = 'EXIST_ENDPOINTS';
      status = 404;
    } else if (err.message === 'VALID') {
      typeErr = 'VALID';
      status = 400;
    }

    const error = ApiError.dynamicError(status, messagesError[typeErr as KeysOfMessageError]);
    response.writeHead(error.status).end(json(error.message));
  }
};
