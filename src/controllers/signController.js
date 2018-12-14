import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import client from '../config/heroku_postgres';
import Verify from '../middlewares/verify';

dotenv.config();

class SignController {
  static signUp (req, res) {
    const userPattern = /[A-Za-z0-9]{2,}/;
    const passPattern = /.{6,}/;
    const phoneNumberPattern = /[0-9]{11,13}/;
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { othernames } = req.body;
    const { email } = req.body;
    const { phonenumber } = req.body;
    let validationErrorMsg = '';

    if (userPattern.test(req.body.username) && passPattern.test(req.body.password)
      && emailPattern.test(req.body.email) && phoneNumberPattern.test(req.body.phonenumber)
      && userPattern.test(req.body.firstname) && userPattern.test(req.body.lastname)
      && userPattern.test(req.body.othername)) {
      const { username } = req.body;
      const { password } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            res.status(500).send({
              message: 'password could not be hashed',
            });
          } else {
          client.query('SELECT * FROM users WHERE username=$1', [req.body.username], (error, result) => {
            if (error) {
              res.status(400).send({
                status: res.statusCode,
                error: 'Username already taken, please choose another username',
              });
            } else {
            client.query('SELECT * FROM users WHERE email=$1', [req.body.email], (error, result) => {
              if (error) {
                res.status(400).send({
                  status: res.statusCode,
                  error: 'Email already exists, please use another email',
                });
              } else {
              client.query('INSERT INTO users(firstname, lastname, othernames, email, phonenumber, username, password) VALUES($1,$2,$3, $4, $5, $6, $7)', [firstname, lastname, othernames, email, phonenumber, username, hash], (err) => {
                if (err) {
                  res.status(400).send({
                    status: res.statusCode,
                    message: er,
                  });
                } else {
                  const user = {
                    firstname, lastname, othernames, email, phonenumber, username,
                  };
                  const token = Verify.generateToken({ username });
                  res.header('x-auth', token).status(201).send({
                    status: res.statusCode,
                    data: [{
                      user,
                      token,
                    }],
                  });
                }
              });
             }
            });
           }
          });
         }
        });
      });
    } else {
      if (!emailPattern.test(req.body.email)) {
        validationErrorMsg = 'Email is invalid';
      }

      if (!userPattern.test(req.body.username)) {
        validationErrorMsg = 'Your username must not be less than 2 characters';
      }
      if (!passPattern.test(req.body.password)) {
        validationErrorMsg = 'Your password must not be less than 6 characters';
      }

      if (!phoneNumberPattern.test(req.body.phonenumber)) {
        validationErrorMsg = 'Your phone number must be digits of length between 11 and 13';
      }
      if (!userPattern.test(req.body.firstname)) {
        validationErrorMsg = 'Your firstname must not be less than 6 characters';
      }

      if (!userPattern.test(req.body.lastname)) {
        validationErrorMsg = 'Your lastname must not be less than 6 characters';
      }
      if (!userPattern.test(req.body.othername)) {
        validationErrorMsg = 'Your othernames field must not be less than 6 characters';
      }

      res.status(400).send({
        status: res.statusCode,
        error: validationErrorMsg,
      });
    }
  }

 static signIn (req, res) {
  const { username } = req.body;
  const { password } = req.body;

  client.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
    if (error) {
      res.status(501).send({
        status: res.statusCode,
        error: 'An error occured',
      });
    }
    if (results.rows[0]) {
      bcrypt.compare(password, results.rows[0].password, (err, hash) => {
        if (err) {
          res.status(500).send({
            status: res.statusCode,
            error: 'Error',
          });
        }
        if (hash === true) {
          const info = results.rows[0];
          const user = {
            firstname: info.firstname,
            lastname: info.lastname,
            othernames: info.othernames,
            email: info.email,
            phonenumber: info.phonenumber,
            username: info.username,
            isAdmin: info.isAdmin,
          };
          const token = Verify.generateToken({ username, admin: results.rows[0].isadmin });
          res.header('x-auth', token).status(200).send({
            success: 'Logged in successfully',
            data: [{
              token,
              user,
            }],
          });
        } else {
          res.status(401).send({
            status: res.statusCode,
            error: 'Username or password is incorrect',
          });
        }
      });
    } else {
      res.status(400).send({
        status: res.statusCode,
        error: 'Username or password is incorrect',
      });
    }
  });
}
}

export default SignController;