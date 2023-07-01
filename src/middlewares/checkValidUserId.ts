import { regExpId } from '../shared/regExpId';

export const checkValidUserId = (endpoint: string): boolean | Error => {
  if (endpoint.match(regExpId)) {
    return true;
  }
  throw new Error('VALID');
};
