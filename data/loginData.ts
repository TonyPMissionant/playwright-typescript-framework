import { env } from '../utils/env';

export const validUser = {
    username: env.username,
    password: env.password,
};

export const invalidUser = {
    username: env.username,
    password: 'invalid_password',
};
