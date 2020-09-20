const reportsRouter = require('express').Router()
const { getKmom, getKmoms, createKmom } = require('../controllers/reports')
// const path = require('path')

reportsRouter.route('/').get(getKmoms).post(createKmom)

reportsRouter.route('/week/:id').get(getKmom)

// reportsRouter.get('/setup.svg', function (req, res) {
//   res.setHeader('Content-Type', 'image/svg+xml')
//   res.sendFile(path.join(__dirname, '../setup.svg'))
// })

module.exports = reportsRouter
