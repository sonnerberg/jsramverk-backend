const fs = require('fs')
const reportsRouter = require('express').Router()
const { db } = require('./sqlite3')

reportsRouter.get('/week', (req, res, next) => {
  db.all('SELECT kmom FROM texts', (err, rows) => {
    if (err) {
      return res.status(500).json({
        errors: {
          status: 500,
          source: '/register',
          title: 'Database error',
          detail: err.message,
        },
      })
    }
    return res.json({ data: rows.map((row) => row.kmom) })
  })
})

reportsRouter.get('/week/:id', (req, res, next) => {
  const {
    params: { id },
  } = req

  try {
    const markdown = fs.readFileSync(
      `./reports/kmom${id.padStart(2, '0')}.md`,
      {
        encoding: 'utf-8',
        flag: 'r',
      },
    )
    let link = null
    if (fs.existsSync(`./reports/kmom${id.padStart(2, '0')}link.md`)) {
      link = fs.readFileSync(`./reports/kmom${id.padStart(2, '0')}link.md`, {
        encoding: 'utf-8',
        flag: 'r',
      })
    }

    if (link) return res.json({ markdown, link })
    return res.json({ markdown, link: 'http://github.com/sonnerberg' })
  } catch {
    next()
  }
})

module.exports = reportsRouter
