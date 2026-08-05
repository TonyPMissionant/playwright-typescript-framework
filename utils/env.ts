import dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL ?? '',
  username: process.env.USERNAME ?? '',
  password: process.env.PASSWORD ?? '',
};
