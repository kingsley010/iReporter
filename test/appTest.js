import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import babelCore from 'babel-core';
import babelRegister from 'babel-register';
import start from '../start';

const should = chai.should();
chai.use(chaiHttp);

describe('createRecord', () => {
  it('should create a red-flag record on /api/v1/red-flags POST', (done) => {
    let rcd = {
    username: 'Kingsley',
    title: 'Hallibuton Scandal'
  };

  chai.request(app)
  .post('/api/v1/red-flags')
  .send(rcd)
  .end((err, res) => {
  res.should.have.status(201);
  done();
  });
  });
});

describe('fetchAllRecords', () => {
  it('should list ALL records on /api/v1/red-flags GET', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('fetchOneRecord', () => {
  it('should GET one red-flag record', (done) => {
      let rcd = { 
        'id': '1',
        'createdOn': '25/11/18',
        'createdBy': '2',
        'type': 'red-flag',
        'location': 'lat: -34.397, lng: 150.644',
        'status': 'under investigation',
        'images': '[Image, Image]',
        'videos': '[Image, Image]',
        'comment': 'The Halliburton scandal'
      };
      chai.request(app)
      .get('/api/v1/red-flags/:id')
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
        'id': '1',
        'createdOn': '25/11/18',
        'createdBy': '2',
        'type': 'red-flag',
        'location': 'lat: -34.397, lng: 150.644',
        'status': 'under investigation',
        'images': '[Image, Image]',
        'videos': '[Image, Image]',
        'comment': 'The Halliburton scandal'
      };
      chai.request(app)
      .patch('/api/v1/red-flags/:id')
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
        'id': '1',
        'createdOn': '25/11/18',
        'createdBy': '2',
        'type': 'red-flag',
        'location': 'lat: -34.397, lng: 150.644',
        'status': 'under investigation',
        'images': '[Image, Image]',
        'videos': '[Image, Image]',
        'comment': 'The Halliburton scandal'
      };
      chai.request(app)
      .patch('/api/v1/red-flags/:id/location')
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
        'id': '1',
        'createdOn': '25/11/18',
        'createdBy': '2',
        'type': 'red-flag',
        'location': 'lat: -34.397, lng: 150.644',
        'status': 'under investigation',
        'images': '[Image, Image]',
        'videos': '[Image, Image]',
        'comment': 'The Halliburton scandal'
      };
      chai.request(app)
      .patch('/api/v1/red-flags/:id/comment')
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
    chai.request(app)
      .delete('/api/v1/red-flags/:id')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
      done();
  });
});
