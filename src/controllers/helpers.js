import client from '../config/heroku_postgres';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const isLetter = (str) => {
  const objRegExp = /^[a-zA-Z\u00C0-\u00ff]+$/;
  return objRegExp.test(str);
};

export const isAlphaNumeric = (str) => {
  const objRegExp = /^[a-zA-Z0-9]*$/;
  return objRegExp.test(str);
};

export const isEmail = (email) => {
  const check = /\S+@\S+\.\S+/;
  return check.test(email);
};

export const userWay = (username) => {
	const use = /[A-Za-z0-9]{2,}/;
	return use.test(username);
};

export const isPass = (password) => {
	const pass = /.{6,}/;
	return pass.test(password);
}
