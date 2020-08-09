const fs = require('fs')
const reportsRouter = require('express').Router()

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
    const link = fs.readFileSync(
      `./reports/kmom${id.padStart(2, '0')}link.md`,
      {
        encoding: 'utf-8',
        flag: 'r',
      },
    )

    res.json({ markdown, link })
  } catch {
    next()
  }
})

module.exports = reportsRouter
