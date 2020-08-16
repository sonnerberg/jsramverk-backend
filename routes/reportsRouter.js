const reportsRouter = require('express').Router()
const { getKmom, getKmoms, createKmom } = require('../controllers/reports')

reportsRouter.route('/').get(getKmoms).post(createKmom)

reportsRouter.route('/week/:id').get(getKmom)

module.exports = reportsRouter
