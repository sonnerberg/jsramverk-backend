const fs = require('fs')
const reportsRouter = require('express').Router()
const { db } = require('./sqlite3')

reportsRouter.get('/week', (req, res) => {
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

reportsRouter.get('/week/:id', (req, res) => {
  const {
    params: { id },
  } = req
  const paddedKmom = `kmom${id.padStart(2, '0')}`
  const sql = 'SELECT * FROM texts WHERE kmom = (?)'

  db.get(sql, paddedKmom, (err, rows) => {
    const { text: markdown, link } = rows
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
    return res.json({ markdown, link })
  })
})

module.exports = reportsRouter
