import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: true,
});

const testEmail = (email) => {
  const emailregex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailregex.test(email);
};

const testUsername = (username) => {
  const usernameregex = /^[a-zA-Z]+[a-zA-Z0-9_]+$/;
  return usernameregex.test(username);
};

exports.signUp = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'Your entry contains a missing field.',
    });
  }
  if (!testEmail(req.body.email)) {
    return res.status(400).json({
      success: false,
      message: 'The email that you entered is invalid',
    });
  }
  if (!testUsername(req.body.username)) {
    return res.status(400).json({
      success: false,
      message: 'Usernames must start with alphabets and should not contain wilcards',
    });
  }
    pool.connect((err, client, done) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'cannot connect to database',
        });
      }
      client.query('SELECT * FROM users WHERE username=$1', [req.body.username], (error, result) => {
        if (result && result.rows.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Username already exists, Please choose another username',
          });
        } 
        client.query('SELECT * FROM users WHERE email=$1', [req.body.email], (error, result) => {
        if (result && result.rows.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Email already exists, Please use another email',
          });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return res.status(417).json({
                success: false,
                message: 'There was a hashing error',
              });
            }
            pool.connect((error, client, done) => {
              client.query('INSERT INTO users(firstname, lastname, othernames, email, phonenumber, username, password) VALUES($1, $2, $3, $4, $5, $6, $7)', [
                req.body.firstname,
                req.body.lastname,
                req.body.othernames,
                req.body.email,
                req.body.phonenumber,
                req.body.username,
                hash,
              ]);
              if (error) {
                res.status(404).json({
                  data: [{
                      message: 'error'
                  }]
                });
              } else {
                return res.status(201).json({
                  data: [{
                      message: 'successfully posted'
                  }]
                });
              }
            done();
            });
          });
        });
       }
      });
      done();
      });
  });
};

exports.signIn = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      message: 'Please fill in all fields'
    });
  }
  pool.connect((err, client, done) => {
    if (err) {
      return res.status(500).json({
        data: [{
             message: 'could not connect to database'
        }]
      });
    }
    client.query('SELECT userid, username, password FROM users WHERE username=$1', [req.body.username], (errors, result) => {
      if (result && result.rows.length === 1) {
         bcrypt.compare(req.body.password, result.rows[0].password, (err, bcryptres) => {
              if (err) { throw err }
                else {
            return res.status(201).json({
              data: [{
                  message: 'Logged in successfully'
              }]
            });
          }
        });
      } else {
         res.status(400).json({
          data: [{
            message: 'Username or password is incorrect'
          }]
        });     
      }
    });
    done();
  });
};
 