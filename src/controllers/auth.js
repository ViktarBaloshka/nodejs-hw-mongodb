import createHttpError from 'http-errors';
import {
  loginUser,
  logoutUsersSession,
  refreshUsersSession,
  registerUser,
  requestResetPassword,
} from '../services/auth.js';
import { SessionsCollection } from '../db/models/session.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUsersSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUsersController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }

  const session = await SessionsCollection.findOne({ _id: sessionId });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  await logoutUsersSession(sessionId);
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).end();
};

export const requestResetPasswordController = async (req, res) => {
  await requestResetPassword(req.body.email);
  res.json({
    message: 'Reset password email was successfully send',
    status: 200,
    data: {},
  });
};
