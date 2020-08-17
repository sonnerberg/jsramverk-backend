const { me } = require('../controllers')

const indexRouter = require('express').Router()

indexRouter.route('/').get(me)
indexRouter.route('/me').get(me)

module.exports = indexRouter
