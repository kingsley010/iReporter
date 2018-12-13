import client from '../config/heroku_postgres';
import Verify from '../middlewares/verify';
import bcrypt from 'bcryptjs';

class InterventionController {
  static postRecord (req, res) {
    const { createdby } = req.body;
    const { type } = req.body;
    const { location } = req.body;
    const { images } = req.body;
    const { videos } = req.body;
    const { comment } = req.body;

    client.query('INSERT INTO records(createdby, type, location, images, videos, comment) VALUES($1,$2,$3, $4, $5, $6)RETURNING (id)', [createdby, type, location, images, videos, comment], (err, result) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      return res.header('x-auth', jwtoken).status(201).send({
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
}

export default InterventionController;