import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import testData from './__mocks__';

const {
  userData: {
    newBook, nonExistingBook, InvalidBook, InvalidBook1, InvalidBook2, patronLogin
  }
} = testData;

const API_VERSION = '/api/v1';
const BASE_URL = `${API_VERSION}/favorites/book/`;
const loginUrl = `${API_VERSION}/auth/login`;
let patronToken;

chai.use(chaiHttp);

before((done) => {
  chai.request(server)
    .post(loginUrl)
    .send(patronLogin)
    .end((error, response) => {
      patronToken = response.body.token;
      done();
    });
});

describe('Favorite Book Test', () => {
  it('should favorite book if the book is in the database', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('favorited successfully');
        expect(response.body.book).to.be.a('object');
        expect(response.body.book).to.have.property('authors');
        expect(response.body.book).to.have.property('description');
        expect(response.body.book.id).to.equal(newBook.id);
        done();
      });
  });

  it('should not favorite book if the book is already a favorite and also in the database', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('this book is already in your favourites');
        done();
      });
  });

  it('should not favorite book if the book is not the database', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${nonExistingBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('book not found');
        done();
      });
  });

  it('should not favorite book if the book id is of wrong format', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${InvalidBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.errors).to.be.a('object');
        expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
        done();
      });
  });

  it('should not favorite book if the book id is of wrong format', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${InvalidBook1.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.errors).to.be.a('object');
        expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
        done();
      });
  });

  it('should not favorite book if the book id is of wrong format', (done) => {
    chai.request(server)
      .post(`${BASE_URL}${InvalidBook2.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.errors).to.be.a('object');
        expect(response.body.errors.params.bookId).to.equal('bookId value must be at least 1 and an integer');
        done();
      });
  });
});


describe('Unfavorite Book Test', () => {
  it('should unfavorite book if the book is already a favorite and also in the database', (done) => {
    chai.request(server)
      .delete(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('unfavorited successfully');
        done();
      });
  });

  it('should not unfavorite book if the book is already removed from the favorites and also in the database', (done) => {
    chai.request(server)
      .delete(`${BASE_URL}${newBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('this book is not in your favourites');
        done();
      });
  });

  it('should not favorite book if the book is not the database', (done) => {
    chai.request(server)
      .delete(`${BASE_URL}${nonExistingBook.id}`)
      .query({ token: patronToken })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.equal('book not found');
        done();
      });
  });
});