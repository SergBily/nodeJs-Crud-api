import { IncomingMessage, ServerResponse } from 'http';

export type Method = {
  GET: ControllerMethod;
  POST: ControllerMethod;
};

type ControllerMethod = (request: IncomingMessage, response: ServerResponse) => void;
