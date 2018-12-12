import incident from '../../incident.json';
import users from '../../user.json';
import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

exports.verifyToken = (req, res, next) => {
  // Get the auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		// Split at the space
		const bearer = bearerHeader.split(' ');
		// Get token from array
		const bearerToken = bearer[1];
		// Set the token
		req.token = bearerToken;
		// Next middleware
		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
};