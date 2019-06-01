import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server/index';
import * as inputData from './testData';

const { expect } = chai;
const {
  User,
  missingInput,
  blankInput,
  invalidInput,
  wrongLengthInput,
} = inputData;

chai.use(chaiHttp);

const BASE_URL = '/api/v1/auth';

describe('AUTH', () => {
// Test Signing up a user
  describe('User signup', () => {
    it('It Should create user with right signup credentials', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('sign up successful');
          expect(response.body).to.have.property('token');
          done();
        });
    });
    it('should not register a new user with an already existing email', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(User)
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('user already exist');
          done();
        });
    });
  });

  describe('Validations', () => {
    it('should return validation errors for required input fields not supplied in request', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(missingInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password');
          expect(response.body.errors.body.firstName).to.equal('firstName is missing');
          expect(response.body.errors.body.lastName).to.equal('lastName is missing');
          expect(response.body.errors.body.email).to.equal('email is missing');
          expect(response.body.errors.body.password).to.equal('password is missing');
          done();
        });
    });

    it('should return validation errors for blank input fields in the request', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(blankInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'password', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('firstName cannot be blank');
          expect(response.body.errors.body.lastName).to.equal('lastName cannot be blank');
          expect(response.body.errors.body.email).to.equal('email cannot be blank');
          expect(response.body.errors.body.password).to.equal('password cannot be blank');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl cannot be blank');
          done();
        });
    });

    it('should return validation errors for invalid input fields in the request', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(invalidInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'email', 'avatarUrl');
          expect(response.body.errors.body.firstName).to.equal('firstName can only contain alphabets');
          expect(response.body.errors.body.lastName).to.equal('lastName can only contain alphabets');
          expect(response.body.errors.body.email).to.equal('email is not valid');
          expect(response.body.errors.body.avatarUrl).to.equal('avatarUrl must be a valid URL string');
          done();
        });
    });

    it('should return validation errors for input fields that are not the required length', (done) => {
      chai.request(server)
        .post(`${BASE_URL}/signup`)
        .send(wrongLengthInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('firstName', 'lastName', 'password');
          expect(response.body.errors.body.firstName).to.equal('firstName must be at least 2 characters, and maximum 20');
          expect(response.body.errors.body.lastName).to.equal('lastName must be at least 2 characters, and maximum 20');
          expect(response.body.errors.body.password).to.equal('password must be at least 6 characters');
          done();
        });
    });
  });

  describe('User logs in', () => {
    it('returns a status 200 if user supplies the valid email and password', (done) => {
      const body = {
        email: 'jamiefoxx@gmail.com',
        password: 'jamiefoxx'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(body)
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an('object');
          expect(response.body).to.include.all.keys('status', 'user', 'token');
          expect(response.body.status).to.be.equal('success');
          expect(response.body.user).to.include.all.keys('id', 'firstName', 'lastName', 'email');
          expect(response.body.user.id).to.be.a('Number');
          expect(response.body.user.firstName).to.be.a('String');
          expect(response.body.user.lastName).to.be.a('String');
          expect(response.body.user.email).to.be.a('String');
          done();
        });
    });
    it('should return validation errors for required input fields not supplied in request', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(missingInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('email', 'password');
          expect(response.body.errors.body.email).to.equal('email is missing');
          expect(response.body.errors.body.password).to.equal('password is missing');
          done();
        });
    });
    it('should return validation errors for blank input fields in the request', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(blankInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('email', 'password');
          expect(response.body.errors.body.email).to.equal('email cannot be blank');
          expect(response.body.errors.body.password).to.equal('password cannot be blank');
          done();
        });
    });
    it('should return validation errors for input fields that are not the required length', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(wrongLengthInput)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('errors');
          expect(response.body.errors.body).to.have.keys('password');
          expect(response.body.errors.body.password).to.equal('password must be at least 6 characters');
          done();
        });
    });
    it('should return a status 401 if user is not in the database', (done) => {
      const body = {
        email: 'jamiefoxx@gmail.com',
        password: 'password',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(body)
        .end((err, response) => {
          expect(response).to.have.status(401);
          expect(response).to.be.a('object');
          expect(response.body).to.have.all.keys('status', 'message');
          expect(response.body.message).to.be.a('String');
          done();
        });
    });
    it('should return a status 401 if user inputs wrong password', (done) => {
      const body = {
        email: 'todaytest@email.com',
        password: 'password1',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(body)
        .end((err, response) => {
          expect(response).to.have.status(401);
          expect(response).to.be.a('object');
          expect(response.body).to.have.all.keys('status', 'message');
          expect(response.body.message).to.be.a('String');
          done();
        });
    });
  });
});