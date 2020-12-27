import { Session } from './session.entity';

const jwt = require('jsonwebtoken');

export const sign = async (data: any, secret: string): Promise<string> => {
  return await jwt.sign(data, secret);
};

export const verify = async (token, secret: string): Promise<Session> => {
  return await jwt.verify(token, secret);
};

export const decode = async (token): Promise<Session> => {
  return await jwt.decode(token);
};
