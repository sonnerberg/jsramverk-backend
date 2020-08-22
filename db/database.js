const sqlite3 = require('sqlite3').verbose()
const path = require('path')

module.exports = (function () {
  if (process.env.NODE_ENV === 'test') {
    return new sqlite3.Database(path.join(__dirname, '/test.sqlite'))
  }

  return new sqlite3.Database(path.join(__dirname, '/texts.sqlite'))
})()
