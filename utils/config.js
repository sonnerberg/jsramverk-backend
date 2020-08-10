require('dotenv').config()

let PORT = process.env.PORT || 3333
let JWT_SECRET = process.env.JWT_SECRET || 'thisIsNotSecret'

module.exports = { PORT, JWT_SECRET }
