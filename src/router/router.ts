import { IncomingMessage, ServerResponse } from 'http';
import { typeOfErrors } from '../shared/typeOfErrors.js';
import { createEndpointId } from '../utils/createEndpointId.js';
import { checkValidUserId } from '../middlewares/checkValidUserId.js';
import { messagesError } from '../shared/messagesError.js';
import { json } from '../utils/json.js';
import { endpoints } from '../shared/endpoints.js';
import { KeysOfEndpoints, KeysOfMessageError, KeysOfMethod } from '../models/types/keysOfTypes.js';
import { ApiError } from '../exceptions/apiError.js';
import { HttpStatus } from '../models/enum/httpStatus.enum.js';
import { NameErrors } from '../models/enum/errors.enum.js';

export const router = (request: IncomingMessage, response: ServerResponse): void => {
  try {
    const { method } = request;
    let endpoint = request.url;
    response.setHeader('Content-type', 'application/json');
    const endpointLength = endpoint?.split('/').length;
    const endpointLengthWithOutId = 3;

    if (endpointLength && endpointLength > endpointLengthWithOutId) {
      checkValidUserId(endpoint as string);
      endpoint = createEndpointId(endpoint as string);
    }

    endpoints[`${endpoint as KeysOfEndpoints}`][`${method as KeysOfMethod}`](request, response);
  } catch (e) {
    const err = e as Error;
    let nameErr = NameErrors.server;
    let status = HttpStatus.internal_server;

    if (err.message.match(typeOfErrors.endpoint)) {
      nameErr = NameErrors.exist_endpoints;
      status = HttpStatus.not_found;
    } else if (err.message === NameErrors.valid) {
      nameErr = NameErrors.valid;
      status = HttpStatus.bad_request;
    }

    const error = ApiError.dynamicError(status, messagesError[nameErr as KeysOfMessageError]);
    response.writeHead(error.status).end(json(error.message));
  }
};
