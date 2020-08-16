const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const {
  indexRouter,
  reportsRouter,
  loginRouter,
  registerRouter,
} = require('./routes/')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors())
// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')) // 'combined' outputs the Apache style LOGs
}

app.use('/', indexRouter)
app.use('/reports', reportsRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  res.status(err.status || 500).json({
    errors: [
      {
        status: err.status,
        title: err.message,
        detail: err.message,
      },
    ],
  })
})

module.exports = app
