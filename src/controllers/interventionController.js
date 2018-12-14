import client from '../config/heroku_postgres';
import Verify from '../middlewares/verify';
import bcrypt from 'bcryptjs';

class InterventionController {
  static postRecord (req, res) {
    const { createdby } = req.body;
    const { type } = req.body;
    const { location } = req.body;
    const { status } = req.body;
    const { images } = req.body;
    const { videos } = req.body;
    const { comment } = req.body;


    client.query('INSERT INTO records(createdby, type, location, status, images, videos, comment) VALUES($1,$2,$3, $4, $5, $6, $7)RETURNING (id)',
     [createdby, type, location, status, images, videos, comment], (err, result) => {
      console.log(location);
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      return res.status(201).send({
        data: [{
          id: result.rows[0].id,
          message: 'Record created successfully',
        }],
      });
    });
  }

  static fetchAllInterventions(req, res) {
    client.query('SELECT * FROM records', (err, result) => {
      if (err) {
        res.status(400).send({
          message: err
        });
      } else {
        res.status(200).send({
              data: result.rows
        });
      }
    });
  }

  static getSpecificIntervention(req, res) {
    const { id } = req.params;

    client.query('SELECT * FROM records WHERE id = $1', [+id], (err, result) => {
      if (err) {
        res.status(400).send({
          status: res.statusCode,
          error: err,
        });
      } else {
        res.status(200).send({
          status: res.statusCode,
          data: result.rows,
        });
      }
    });
  }

  static updateLocation(req, res) {
    const { id } = req.params;
    const { location } = req.body;
    client.query('UPDATE records SET location = ($1) WHERE id = ($2) RETURNING (id)', [location, +id], (err, result) => {
      if (err) {
        res.status(400).send({
          status: res.statusCode,
          error: err,
        });
      } else {
        res.status(200).send({
          status: res.statusCode,
          data: [{
            id: result.rows[0].id,
            message: 'Updated intervention record\'s location',
          }],
        });
      }
    });
  }

  static updateComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    client.query('UPDATE records SET comment = ($1) WHERE id = ($2) RETURNING (id)', [comment, +id], (err, result) => {
      if (err) {
        res.status(400).send({
          status: res.statusCode,
          error: err,
        });
      } else {
        res.status(200).send({
          status: res.statusCode,
          data: [{
            id: result.rows[0].id,
            message: 'Updated intervention record\'s comment',
          }],
        });
      }
    });
  }

static deleteOneIntervention(req, res) {
    const { id } = req.params;
    client.query('DELETE FROM records WHERE id = $1 AND type = $2 RETURNING (id)', [+id, 'intervention'], (err, result) => {
      if (err) {
        res.status(400).send({
          status: res.statusCode,
          error: err,
        });
      } else if (result.rows.length) {
        res.status(200).send({
          status: res.statusCode,
          data: [{
            id: result.rows[0].id,
            message: 'Record deleted successfully',
          }],
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          message: 'Record does not exist',
        });
      }
    });
  } 

  static editStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    client.query('UPDATE records SET status = ($1) WHERE id = ($2) AND type = ($3) RETURNING (id)', [status, +id, 'intervention'], (err, result) => {
      if (err) {
        res.status(400).send({
          status: res.statusCode,
          error: err,
        });
      } else if (result.rows.length) {
        res.status(200).send({
          status: res.statusCode,
          data: [{
            id: result.rows[0].id,
            message: 'Status changed successfully',
          }],
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          data: [{
            id: result.rows[0].id,
            message: 'Record does not exist',
          }],
        });
      }
    });
  }
}

export default InterventionController;