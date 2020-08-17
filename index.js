const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
// eslint-disable-next-line no-unused-vars
const colors = require('colors')

const server = app.listen(config.PORT, () => {
  logger.info(`Server running on localhost:${config.PORT}`.yellow.bold)
})

module.exports = server
