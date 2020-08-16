const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const { db } = require('../controllers/database')

exports.register = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const { param: title, msg: detail } = errors.errors[0]
    return res.status(400).json({
      errors: {
        status: 400,
        source: '/register',
        title: `${title} error`,
        detail,
      },
    })
  }
  try {
    const { email, password } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      email,
      passwordHash,
      (err) => {
        if (err) {
          // returnera error
          return res.status(500).json({
            errors: {
              status: 500,
              source: '/register',
              title: 'Database error',
              detail: err.message,
            },
          })
        }

        return res.status(201).json({
          status: 201,
          source: '/register',
          title: 'added user',
          detail: `${email} added`,
        })
        // returnera korrekt svar
      },
    )
  } catch (err) {
    next(err)
  }
}

exports.validation = [
  // username must be an email
  body('email').isEmail().withMessage('You must provide a valid email address'),
  // password must be at least 5 chars long
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long')
    .not()
    .isIn(['12345'])
    .withMessage('Do not use a common password'),
]
