const express = require('express')

//funções do controller
const {loginUser, signupUser} = require('../controllers/userController')

const router = express.Router()

// rota de login
router.post('/login', loginUser)

// rota de cadastro
router.post('/signup', signupUser)

module.exports = router