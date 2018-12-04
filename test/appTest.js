import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import babelCore from 'babel-core';
import babelRegister from 'babel-register';
import start from '../start';

const should = chai.should();
chai.use(chaiHttp);

describe('createRecord', () => {
  it('should create a red-flag record on /api/v1/red-flags', (done) => {
    let rcd = {
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

  chai.request('api/v1')
  .post('/red-flags')
  .send(rcd)
  .end((err, res) => {
  res.should.have.status(201);
  done();
  });
  done();
  });
});

describe('fetchAllRecords', () => {
  it('should list ALL records on /api/v1/red-flags', (done) => {
    chai.request('api/v1')
      .get('/red-flags')
      .end((err, res) => {
      res.should.have.status(200);
        done();
      });
      done();
  });
});

describe('fetchOneRecord', () => {
  it('should GET one red-flag record', (done) => {
      let rcd = { 
        'id': 1,
        'title': 'Hello',
        'createdOn': '25/11/18',
        'createdBy': 2,
        'type': ['red-flag'],
        'location': 'lat: -34.397, lng: 150.644',
        'status': 'under investigation',
        'images': [],
        'videos': [],
        'comment': 'The Halliburton scandal'
      };
      chai.request('/api/v1')
      .get('/red-flags/:id')
      .send(rcd)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
      done();
  });
});

describe('editOneRecord', () => {
  it('should edit one red-flag record', (done) => {
      let rcd = { 
        'id': 1,
        'createdOn': '25/11/18',
        'createdBy': 2,
        'type': ['red-flag'],
        'location': 'lat: -34.397, lng: 150.644',
        'status': ['under investigation'],
        'images': [],
        'videos': [],
        'comment': 'The Halliburton scandal'
      };
      chai.request('api/v1')
      .patch('/red-flags/:id')
      .send(rcd)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
      done();
  });
});

describe('editOneLocation', () => {
  it('should edit one red-flag record\'s location', (done) => {
      let rcd = { 
        'id': 1,
        'title': 'Hello',
        'createdOn': '25/11/18',
        'createdBy': 2,
        'type': ['red-flag'],
        'location': 'lat: -34.397, lng: 150.644',
        'status': ['under investigation'],
        'images': [],
        'videos': [],
        'comment': 'The Halliburton scandal'
      };
      chai.request('/api/v1')
      .patch('/red-flags/:id/location')
      .send(rcd)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
      done();
  });
});

describe('editOneComment', () => {
  it('should edit one red-flag record\'s comment', (done) => {
      let rcd = { 
        'id': 1,
        'title': 'Hello',
        'createdOn': '25/11/18',
        'createdBy': 2,
        'type': 'red-flag',
        'location': 'lat: -34.397, lng: 150.644',
        'status': 'under investigation',
        'images': '[Image, Image]',
        'videos': '[Image, Image]',
        'comment': 'The Halliburton scandal'
      };
      chai.request('/api/v1')
      .patch('/red-flags/:id/comment')
      .send(rcd)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
      done();
  });
});

describe('removeOneRecord', () => {
  it('should delete a specific red-flag record', (done) => {
    chai.request('/api/v1')
      .delete('/red-flags/:id')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
      done();
  });
});
