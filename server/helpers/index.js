import createToken from './createToken';
import responseMessage from './responseMessage';
import sendMail from './sendMail';
import findUser from './findUser';
import findBook from './findBook';
import findLendingHistory from './findLendingHistory';
import makeLowerCase from './customSanitizers';
import * as messages from './messages';
import enforceVerification from './enforceVerification';
import setupNewUser from './setupNewUser';
import emptyBody from './emptyBody';
import genericBookHelpers from './genericBookHelpers';
import notifications from './notifications';
import socket from './socket';

const {
  signupMessage, createUserMessage, newBookNotificationMessage, resetpasswordMessage,
  overdueBookNotificationMessage
} = messages;

const helpers = {
  createToken,
  responseMessage,
  findUser,
  findBook,
  findLendingHistory,
  sendMail,
  makeLowerCase,
  signupMessage,
  enforceVerification,
  createUserMessage,
  setupNewUser,
  resetpasswordMessage,
  emptyBody,
  genericBookHelpers,
  notifications,
  newBookNotificationMessage,
  overdueBookNotificationMessage,
  socket
};

export default helpers;
