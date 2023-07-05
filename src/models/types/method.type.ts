import { IncomingMessage, ServerResponse } from 'http';

export type Method = {
  GET: ControllerMethod;
  POST: ControllerMethod;
  PUT: ControllerMethod;
  DELETE: ControllerMethod;
};

type ControllerMethod = (request: IncomingMessage, response: ServerResponse) => void;
