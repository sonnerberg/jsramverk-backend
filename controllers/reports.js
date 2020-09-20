const jwt = require('jsonwebtoken')
const fs = require('fs')
const { db } = require('../controllers/database')
const { JWT_SECRET } = require('../utils/config')
const path = require('path')

const getTokenFrom = (req) => {
  const authorization = req.get('Authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

exports.getKmom = (req, res, next) => {
  const {
    params: { id },
  } = req
  const paddedKmom = `kmom${id.padStart(2, '0')}`
  const sql = 'SELECT * FROM texts WHERE kmom = (?)'

  db.get(sql, paddedKmom, (_, rows) => {
    try {
      const { text: markdown, link } = rows

      return res.json({ markdown, link })
    } catch (err) {
      next(err)
    }
  })
}

exports.getKmoms = (req, res) => {
  db.all('SELECT kmom FROM texts', (_, rows) => {
    return res.json({ data: rows.map((row) => row.kmom) })
  })
}

exports.createKmom = (req, res, next) => {
  const { kmomNumber, content, githubLink } = req.body
  const paddedKmom = `kmom${kmomNumber.padStart(2, '0')}`
  const token = getTokenFrom(req)
  jwt.verify(token, JWT_SECRET)
  // const decodedToken = jwt.verify(token, JWT_SECRET)

  // if (!token || !decodedToken.email) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  db.run(
    // https://www.sqlite.org/lang_UPSERT.html
    `INSERT INTO texts (text, link, kmom) VALUES (?, ?, ?)
      ON CONFLICT(kmom)
      DO UPDATE SET
      text = (?), link = (?)
      WHERE kmom = (?)`,
    content,
    githubLink,
    paddedKmom,
    content,
    githubLink,
    paddedKmom,
    (err) => {
      if (err) {
        // returnera error
        return res.status(500).json({
          errors: {
            status: 500,
            source: '/register',
            title: 'Database error',
            detail: err.message,
          },
        })
      }
      if (process.env.NODE_ENV !== 'test') {
        fs.writeFile(
          path.join(__dirname, `../reports/${paddedKmom}.md`),
          content,
          (err) => {
            if (err) next(err)
          },
        )
        fs.writeFile(
          path.join(__dirname, `../reports/${paddedKmom}link.md`),
          githubLink,
          (err) => {
            if (err) next(err)
          },
        )
      }
      return res.status(201).json({
        data: `Your content is available at http://localhost:3333/reports/week/${kmomNumber}`,
      })

      // returnera korrekt svar
    },
  )
}
