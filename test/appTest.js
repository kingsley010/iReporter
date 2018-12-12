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

describe('signUp', () => {
  it('should sign user up successfully', (done) => {
    chai.request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'Kingsley',
      lastname: 'perfect',
      othernames: 'kaka',
      email: 'King@gmail.com',
      phonenumber: '1234567890',
      username: 'King',
      password: '12345',
      passwordagain: '12345'
    })
      .end((err, res) => {
        res.should.have.status(201);
      })
      done();
  });
});

describe('signIn', () => {
  it('it should login user successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'King',
        password: '12345'
      })
      .end((err, res) => {
        res.should.have.status(201);
      });
      done();
  });
});
