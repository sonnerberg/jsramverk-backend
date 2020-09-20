process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const assert = require('assert')
const { expect } = require('chai')

chai.should()

chai.use(chaiHttp)

const kmomNumber = '99'

describe('Register twice', function () {
  describe('Register user', function () {
    it('User registered', function (done) {
      chai
        .request(server)
        .post('/register')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richard@email.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.an('object')

          done()
        })
    })
  })

  describe('Register user again', function () {
    it('User not registered again', function (done) {
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
          assert.strictEqual(500, res.body.errors.status)

          done()
        })
    })
  })
})

describe('Register and Login', function () {
  describe('Register user with malformatted email', function () {
    it('User not registered', function (done) {
      chai
        .request(server)
        .post('/register')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richardhello.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.an('object')

          done()
        })
    })
  })

  describe('register user', function () {
    it('User registered', function (done) {
      chai
        .request(server)
        .post('/register')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ email: 'richard@hello.com', password: '123456789' })
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.an('object')

          done()
        })
    })
  })
  let token

  describe('login registered user and save token', function () {
    it('User logged in and token saved', function (done) {
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
          token = res.body.data.token

          done()
        })
    })
  })

  describe('Create content', function () {
    it('Content created', function (done) {
      chai
        .request(server)
        .post('/reports')
        .set('Connection', 'keep alive')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({
          kmomNumber,
          content: '# 123456789',
          githubLink: 'www.github.com/sonnerberg',
        })
        .end((err, res) => {
          res.should.have.status(201)
          assert.strictEqual(
            res.body.data,
            `Your content is available at http://localhost:3333/reports/week/${kmomNumber}`,
          )

          done()
        })
    })
  })

  describe('Create content without proper token', function () {
    it('Report not created', function (done) {
      chai
        .request(server)
        .post('/reports')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token.slice(0, -1)}x`)
        .send({
          kmomNumber: '7',
          content: '# 123456789',
          githubLink: 'www.github.com/sonnerberg',
        })
        .end((err, res) => {
          res.should.have.status(500)
          assert.strictEqual(res.body.errors[0].title, 'invalid signature')

          done()
        })
    })
  })

  describe('Create content without token', function () {
    it('Report not created', function (done) {
      chai
        .request(server)
        .post('/reports')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          kmomNumber: '7',
          content: '# 123456789',
          githubLink: 'www.github.com/sonnerberg',
        })
        .end((err, res) => {
          res.should.have.status(500)
          assert.strictEqual(res.body.errors[0].title, 'jwt must be provided')

          done()
        })
    })
  })

  describe('Login registered user with wrong password', function () {
    it('User not logged in', function (done) {
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

          done()
        })
    })
  })
})

describe('Login without registered user', function () {
  describe('login without users in db', function () {
    it('User not logged in', function (done) {
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
          assert.strictEqual(401, res.body.errors.status)

          done()
        })
    })
  })
})

describe('Reports', function () {
  describe('GET /reports', function () {
    it('Reports returned', function (done) {
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
    it('Reports returned', function (done) {
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
    it('Description returned', function (done) {
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
    it('Report week 1 retrieved', function (done) {
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
    it('Report week 2 retrieved', function (done) {
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

  describe('GET /reports/week/9', function () {
    it('Report not retrieved', function (done) {
      chai
        .request(server)
        .get('/reports/week/9')
        .end((err, res) => {
          res.should.have.status(500)

          done()
        })
    })
  })

  //  describe('GET /reports/setup.svg', function () {
  //    it('SVG retrieved', function (done) {
  //      chai
  //        .request(server)
  //        .get('/reports/setup.svg')
  //        .end((err, res) => {
  //          res.should.have.status(200)
  //          assert.strictEqual(res.header['content-type'], 'image/svg+xml')
  //
  //          done()
  //        })
  //    })
  //  })

  describe('GET non existent page', function () {
    it('404 for page that does not exist', function (done) {
      chai
        .request(server)
        .get('/rep')
        .end((err, res) => {
          res.should.have.status(404)

          done()
        })
    })
  })
})
