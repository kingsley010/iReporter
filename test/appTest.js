import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);

describe('createRecord', () => {
  it('should create a red-flag record on /api/v1/red-flags', (done) => {
    let record = {
    id: 1,
    title: 'Hello',
    createdOn: '25/11/2018',
    createdBy: 1,
    type: ['red-flag'],
    location: 'lat: -34.397, lng: 150.644',
    status: ['under investigation'],
    Images: [],
    Videos: [],
    comment: 'Hi'
  };

  chai.request(app)
  .post('/api/v1/red-flags')
  .send(record)
  .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
    done();
  });
  });
});

describe('fetchAllRecords', () => {
  it('should list ALL records on /api/v1/red-flags', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        done();
      });
  });
});

describe('fetchOneRecord', () => {
  it('should GET one red-flag record', (done) => {
      chai.request(app)
      .get('/api/v1/red-flags/2')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        done();
      });
  });
});

describe('editOneLocation', () => {
  it('should edit one red-flag record\'s location', (done) => {
      let record = { 
        id: 2,
        'location': 'lat: -34.397, lng: 150.644'
      };
      chai.request(app)
      .patch('/api/v1/red-flags/2/location')
      .send(record)
      .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
        done();
      });
  });
});

describe('editOneLocation', () => {
  it('should edit one red-flag record\'s comment', (done) => {
      let record = { 
        id: 2,
        'comment': 'Hi'
      };
      chai.request(app)
      .patch('/api/v1/red-flags/2/comment')
      .send(record)
      .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
        done();
      });
  });
});

describe('removeOneRecord', () => {
  it('should delete a specific red-flag record', (done) => {
    chai.request(app)
      .delete('/api/v1/red-flags/2')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        done();
      });
  });
});


import client from '../src/config/heroku_postgres';
import Verify from '../src/middlewares/verify';

let testToken;

before((done) => {
  client.query('TRUNCATE users, records RESTART IDENTITY', (err) => {
    if (err) {
      throw new Error('Truncating failed');
    } else {
      client.query('INSERT INTO users  (firstname, lastname, othernames, email, phonenumber, username, password) VALUES ($1,$2,$3, $4, $5, $6, $7) RETURNING (firstname)', ['Otti', 'Grant', 'Onyeukwu', 'otti.onyeukwu@gmail.com', '08068753218', 'wizzywise', '$2a$10$JR0.jzaGDj6pGHDe5W22h.rDMQqUYvi.2wxHhpKKPcSpb0MgCwuS.'], (er, results) => {
        if (err) {
          throw new Error('An error has occured');
        } else {
          testToken = Verify.generateToken(results.rows[0]);
          done();
        }
      });
    }
  });
});
