// estudar toda esse arquivo

const express = require('express')
const router = express.Router()
const usersMiddlewares = require('../middlewares/users')
const usersConstroller = require('../controllers/users')

router.post('/users', usersMiddlewares.validateCreateUser, usersConstroller.createUser)

module.exports = router;