const fs = require('fs')
const reportsRouter = require('express').Router()

reportsRouter.get('/week', (req, res, next) => {
  // read the files available using fs and return json with filenames
  const files = fs.readdirSync('./reports', (err, files) => {
    if (err) return next(err)
    return files
  })

  res.json({ files })
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
