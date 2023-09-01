import { rest } from 'msw';
import { existingUser, userJwt } from '@mocks/data/user.mock';

const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1`;

export const signUpMock = rest.post(`${BASE_URL}/signup`, (req, res, ctx) => {
  const result = {
    message: 'User created successfully',
    user: existingUser,
    token: userJwt,
  };
  return res(ctx.json(result));
});

export const signUpMockError = rest.post(
  `${BASE_URL}/signup`,
  (req, res, ctx) => {
    const result = { message: 'Invalid credentials' };
    return res(ctx.status(400), ctx.json(result));
  },
);

export const signInMockError = rest.post(
  `${BASE_URL}/signin`,
  (req, res, ctx) => {
    const result = { message: 'Invalid credentials' };
    return res(ctx.status(400), ctx.json(result));
  },
);

export const resetPasswordMockError = rest.post(
  `${BASE_URL}/reset-password/1234567890`,
  (req, res, ctx) => {
    const result = { message: 'Passwords do not match' };
    return res(ctx.status(400), ctx.json(result));
  },
);

export const authHandlers = [
  signUpMock,
  signUpMockError,
  signInMockError,
  resetPasswordMockError,
];
