const { login } = require('../controllers/login')

const loginRouter = require('express').Router()

loginRouter.route('/').post(login)

module.exports = loginRouter
