/* eslint-env node, mocha */

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const assert = require('assert')
const { expect } = require('chai')

chai.should()

chai.use(chaiHttp)

describe('Register twice', function () {
  describe('register user', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .post('/register')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richard@email.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.an('object')
          // res.body.errors.should.be.an('object')
          // assert.equal(401, res.body.errors.status)

          done()
        })
    })
  })

  describe('register user again', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .post('/register')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richard@email.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.errors.should.be.an('object')
          assert.equal(500, res.body.errors.status)
          // assert.equal(401, res.body.errors.status)

          done()
        })
    })
  })
})

describe('Register and Login', function () {
  describe('register user with malformatted email', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .post('/register')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richardhello.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.an('object')
          // res.body.errors.should.be.an('object')
          // assert.equal(401, res.body.errors.status)

          done()
        })
    })
  })

  describe('register user', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .post('/register')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richard@hello.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.an('object')
          // res.body.errors.should.be.an('object')
          // assert.equal(401, res.body.errors.status)

          done()
        })
    })
  })

  describe('login registered user', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .post('/login')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richard@hello.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.data.should.be.an('object')
          res.body.data.token.should.be.a('string')
          expect(res.body.data.token.length).to.be.above(100) // Not recommended

          done()
        })
    })
  })

  describe('login registered user with wrong password', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .post('/login')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richard@hello.com', password: '489' })
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.an('object')
          res.body.errors.should.be.an('object')
          // res.body.data.token.should.be.a('string')
          // expect(res.body.data.token.length).to.be.above(100) // Not recommended

          done()
        })
    })
  })
})

describe('Login without registered user', function () {
  describe('login without users in db', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .post('/login')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'test@test.com', password: '123456' })
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.an('object')
          res.body.errors.should.be.an('object')
          assert.equal(401, res.body.errors.status)

          done()
        })
    })
  })
})

describe('Reports', function () {
  describe('GET /reports', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .get('/reports')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.data.should.be.an('array')
          res.body.data.length.should.be.above(0)

          done()
        })
    })
  })

  describe('GET /me', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .get('/me')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.main_heading.length.should.be.above(0)

          done()
        })
    })
  })

  describe('GET /', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.main_heading.length.should.be.above(0)

          done()
        })
    })
  })

  describe('GET /reports/week/1', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .get('/reports/week/1')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.markdown.should.be.a('string')
          res.body.link.should.be.a('string')
          res.body.markdown.length.should.be.above(0)
          res.body.link.length.should.be.above(0)

          done()
        })
    })
  })

  describe('GET /reports/week/2', function () {
    it('200 HAPPY PATH', function (done) {
      chai
        .request(server)
        .get('/reports/week/2')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.markdown.should.be.a('string')
          res.body.link.should.be.a('string')
          res.body.markdown.length.should.be.above(0)
          res.body.link.length.should.be.above(0)

          done()
        })
    })
  })
})
