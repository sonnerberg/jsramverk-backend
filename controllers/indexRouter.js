const indexRouter = require('express').Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/texts.sqlite')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const fs = require('fs')

const getTokenFrom = (req) => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

indexRouter.post('/reports', (req, res, next) => {
  const { kmomNumber, content, githubLink } = req.body
  console.log(kmomNumber, content, githubLink)
  // get the token from the request object
  const token = getTokenFrom(req)
  // verify the token
  const decodedToken = jwt.verify(token, JWT_SECRET)
  if (!token || !decodedToken.email) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  fs.writeFile(`./reports/kmom0${kmomNumber}.md`, content, (err) => {
    if (err) next(err)
  })
  fs.writeFile(`./reports/kmom0${kmomNumber}link.md`, githubLink, (err) => {
    if (err) next(err)
  })
  return res
    .status(201)
    .json({
      data: `Your content is available at http://localhost:3333/reports/week/${kmomNumber}`,
    })

  // handle editing and adding content
  // add files to the filesystem ('./reports/kmom0[\d].md' and './reports/kmom0[\d]link.md)
})

indexRouter.post('/login', (req, res, next) => {
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
            // status: 200,
            // source: '/login',
            // title: `${user.email} found`,
            // detail: `password correct: ${passwordCorrect}`,
            token,
            email,
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
})

indexRouter.post(
  '/register',
  [
    // username must be an email
    body('email')
      .isEmail()
      .withMessage('You must provide a valid email address'),
    // password must be at least 5 chars long
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long')
      .not()
      .isIn(['12345'])
      .withMessage('Do not use a common password'),
  ],
  async (req, res, next) => {
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

          res.status(201).json({
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
  },
)

indexRouter.get('/', (req, res) => {
  return res.json({
    main_heading: 'This is JS-ramverk',
    paragraph0: {
      // eslint-disable-next-line quotes
      text: "I'm Richard and this is the first page for the course",
      link: {
        text: 'jsramverk',
        url: 'https://www.jsramverk.se/',
      },
    },
    paragraph1: {
      text: `I am currently ${
        new Date().getFullYear() - 1986
      } years old and residing in Helsingborg.`,
    },
    github_avatar: {
      url:
        'https://avatars1.githubusercontent.com/u/31686265?s=460&u=b237572a2ca661ec50a7e2a4ce362d3ce67e751f&v=4',
    },
    paragraph2: {
      first_part: {
        text:
          'I have been studying web development remotely for a few years now. I actually did my first attempt in 2014, trying to complete the introductory Python course at ',
        link: {
          text: 'Blekinge Tekniska Högskola',
          url: 'https://www.bth.se',
        },
      },
      second_part: {
        text:
          '(BTH). That time I did not finish the course but in 2018 I came back in almost full force and gave studying another shot.',
      },
    },
    paragraph3: {
      first_part: {
        text: 'Since 2018 I have studied the "course package" ',
        link: {
          url: 'https://www.bth.se/kurspaket/KP667/20202/',
          text: 'Webbprogrammering och Databaser',
        },
      },
      second_part: {
        text: ' and in 2019 I started studying the full ',
        link: {
          text: 'program',
          url: 'https://www.bth.se/utbildning/program/pagwg/',
        },
      },
      third_part: {
        text:
          '. Right now I have completed enough points for almost one year (I have a few points here and there to collect from the first year).',
      },
    },
    paragraph4: {
      text:
        'While studying at BTH I have also been studying other courses at other swedish universities such as Umeå Universitet and Uppsala Universitet.',
    },
    paragraph5: {
      first_part: {
        text: 'During this last last summer I have been hard at work studying ',
        link: {
          text: 'Fullstack Open',
          url: 'https://www.fullstackopen.com/en',
        },
      },
      second_part: {
        text:
          'and at the moment I have completed the first 7 parts of the program and I am looking forward to continue with the GraphQL and TypeScript parts as time permits during the fall.',
      },
    },
    paragraph6: {
      first_part: {
        text:
          // eslint-disable-next-line quotes
          "I also recently found a very interesting book at O'Reilly which is called ",
        link: {
          text: 'JavaScript Everywhere',
          url:
            'https://www.oreilly.com/library/view/javascript-everywhere/9781492046974/',
        },
      },
      second_part: {
        text: 'that I also plan to go through as time permits during the fall.',
      },
    },

    paragraph7: {
      text: 'I am looking forward to diving into more JavaScript frameworks.',
    },
  })
})

module.exports = indexRouter
