import { regExpId } from '../shared/regExpId.js';

export const checkValidUserId = (endpoint: string): boolean | Error => {
  if (endpoint.match(regExpId)) {
    return true;
  }
  throw new Error('VALID');
};
