const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const { db } = require('../controllers/database')

exports.login = (req, res, next) => {
  const { email, password } = req.body
  try {
    db.get(
      'SELECT email, password as passwordHash FROM users WHERE email = ?',
      email,
      async (err, user) => {
        if (err) {
          // returnera error
          return res.status(500).json({
            errors: {
              status: 500,
              source: '/login',
              title: 'Database error',
              detail: err.message,
            },
          })
        }

        if (!user) {
          return res.status(401).json({
            errors: {
              status: 401,
              source: '/login',
              title: 'User not found',
              detail: 'User with provided email not found.',
            },
          })
        }

        const passwordCorrect =
          Boolean(user) === false
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if (passwordCorrect) {
          const payload = { email }
          const secret = JWT_SECRET
          const token = jwt.sign(payload, secret, { expiresIn: '1h' })
          return res.status(200).json({
            data: {
              // status: 200,
              // source: '/login',
              // title: `${user.email} found`,
              // detail: `password correct: ${passwordCorrect}`,
              token,
              email,
            },
          })
          // returnera korrekt svar
        }
        return res.status(401).json({
          errors: {
            status: 401,
            source: '/login',
            title: 'Invalid password',
            detail: 'User with provided email found, but password invalid.',
          },
        })
      },
    )
  } catch (err) {
    next(err)
  }
}
