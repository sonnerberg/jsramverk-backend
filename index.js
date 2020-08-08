const app = require('./app')
const http = require('http')
const utils = require('./utils')

const server = http.createServer(app)

server.listen(utils.config.PORT, () => {
  utils.logger.info(`Server running on localhost:${utils.config.PORT}`)
})
