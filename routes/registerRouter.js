const registerRouter = require('express').Router()
const { register, validation } = require('../controllers/register')

registerRouter.route('/').post(validation, register)

module.exports = registerRouter
