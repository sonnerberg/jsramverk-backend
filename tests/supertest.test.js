const supertest = require('supertest')
const server = require('../index')
const fs = require('fs')
const path = require('path')

const api = supertest(server)
const kmomNumber = '99'
const kmomNumber2 = '98'

beforeEach(() => {
  const kmom = path.join(__dirname, `../reports/kmom${kmomNumber}.md`)
  const kmomLink = path.join(__dirname, `../reports/kmom${kmomNumber}link.md`)
  const kmom2 = path.join(__dirname, `../reports/kmom${kmomNumber2}.md`)
  const kmomLink2 = path.join(__dirname, `../reports/kmom${kmomNumber2}link.md`)
  try {
    fs.unlinkSync(kmom)
    fs.unlinkSync(kmomLink)
    fs.unlinkSync(kmom2)
    fs.unlinkSync(kmomLink2)
  } catch {
    return
  }
})

describe('when there initially is some content', () => {
  test('index returns JSON', async () => {
    await api
      .get('/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('/me returns JSON', async () => {
    await api
      .get('/me')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('kmom01 returns JSON', async () => {
    await api
      .get('/reports/week/1')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('kmom02 returns JSON', async () => {
    await api
      .get('/reports/week/2')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('kmom04 returns JSON', async () => {
    await api
      .get('/reports/week/4')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('reports returns JSON', async () => {
    await api
      .get('/reports')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('page that does not exist returns 404', async () => {
    await api.get('/kjadfs').expect(404)
  })

  // test('svg returns', async () => {
  //   await api
  //     .get('/reports/setup.svg')
  //     .expect(200)
  //     .expect('Content-Type', /image\/svg\+xml/)
  // })
})

describe('when no users are registered', () => {
  let token

  test('login user that does not exist', async () => {
    await api
      .post('/login')
      .send({ email: 'richard@email.com', password: '123456789' })
      .expect(401)
  })

  test('register user with common password', async () => {
    await api
      .post('/register')
      .send({ email: 'richard@email.com', password: '12345' })
      .expect(400)
  })

  test('register user with short password', async () => {
    await api
      .post('/register')
      .send({ email: 'richard@email.com', password: '1' })
      .expect(400)
  })

  test('register user', async () => {
    await api
      .post('/register')
      .send({ email: 'richard@email.com', password: '123456789' })
      .expect(201)
  })

  test('register without valid email', async () => {
    await api
      .post('/register')
      .send({ email: 'richardhello.com', password: '123456' })
      .expect(400)
  })

  test('register same user again', async () => {
    await api
      .post('/register')
      .send({ email: 'richard@email.com', password: '12346789' })
      .expect(500)
  })

  test('login user with incorrect password', async () => {
    await api
      .post('/login')
      .send({ email: 'richard@email.com', password: '123453' })
      .expect(401)
  })

  test('login user', async () => {
    await api
      .post('/login')
      .send({ email: 'richard@email.com', password: '123456789' })
      .expect(200)
      .then(
        (response) => {
          token = response.body.data.token
        },
        (err) => {
          console.error(err)
        },
      )
  })

  test('uncreated content returns error', async () => {
    await api.get('/reports/week/10').expect(500)
  })

  test('create content without wrong token', async () => {
    await api
      .post('/reports')
      .set('Authorization', `Bearer ${token.slice(0, -1)}x`)
      .send({
        kmomNumber,
        content: '# 123456789',
        githubLink: 'www.github.com/sonnerberg',
      })
      .expect(500)
  })

  test('create content without header', async () => {
    await api
      .post('/reports')
      .send({
        kmomNumber,
        content: '# 123456789',
        githubLink: 'www.github.com/sonnerberg',
      })
      .expect(500)
  })

  test('create content', async () => {
    const {
      body: { data: kmomsBefore },
    } = await api.get('/reports')

    await api
      .post('/reports')
      .set('Authorization', `Bearer ${token}`)
      .send({
        kmomNumber,
        content: '# 123456789',
        githubLink: 'www.github.com/sonnerberg',
      })
      .expect(201)

    const {
      body: { data: kmomsAfter },
    } = await api.get('/reports')

    expect(kmomsAfter).toHaveLength(kmomsBefore.length + 1)
  })

  test('create content with malformed url', async () => {
    await api
      .post('/reports')
      .set('Authorization', `Bearer ${token}`)
      .send({
        kmomNumber: kmomNumber2,
        content: '# 123456789',
        githubLink: 'www.git.com/sonnerberg',
      })
      .expect(500)
  })

  test('created content returns JSON', async () => {
    await api
      .get(`/reports/week/${kmomNumber}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  server.close()
})
