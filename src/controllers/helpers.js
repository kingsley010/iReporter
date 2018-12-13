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

    const { firstname } = req.body;
    const { lastname } = req.body;
    const { othernames } = req.body;
    const { email } = req.body;
    const { phonenumber } = req.body;
    const { password } = req.body;

    export const checkUser = (username) => {
       const { username } = req.body;
       const use = /[A-Za-z0-9]{2,}/;
       return use.test(username);
    }

    export const checkPass = (req.body.password) =>
    const passPattern = /.{6,}/;
    const phoneNumberPattern = /[0-9]{11,13}/;
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { othernames } = req.body;
    const { email } = req.body;
    const { phonenumber } = req.body;
    const { username } = req.body;
      const { password } = req.body;

      export default Helpers;