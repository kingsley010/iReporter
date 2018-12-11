import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const pool = new pg.Pool({
  host: 'ec2-23-21-201-12.compute-1.amazonaws.com',
  database: 'd3qn68r3djg36o',
  user: 'deybvxxbpuvlch',
  password: '679d3a072eaa7b21105ef47387527e7fd438666aeab892b1cacf592f8a6c49f4',
  port: 5432,
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

const signUp = (req, res) => {
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
          message: err,
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
                  message: 'error'
                });
              } else {
                return res.status(201).json({
                  message: 'successfully posted'
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

module.exports = {
  signUp
}
