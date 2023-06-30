import { IncomingMessage, ServerResponse } from 'http';
import { endpoints } from '../shared/endpoints.js';
import { KeysOfEndpoints, KeysOfMethod } from '../models/types/keysOfTypes.js';

export const router = (request: IncomingMessage, response: ServerResponse): void => {
  const { url: endpoint, method } = request;
  let body: string;

  request.on('data', (chunk: string): void => {
    body = chunk.toString();
  })
    .on('end', () => {
      console.log(body);
      response.end('work');
    });

  if (endpoint && method) {
    endpoints[`${endpoint as KeysOfEndpoints}`][`${method as KeysOfMethod}`];
  }
};
