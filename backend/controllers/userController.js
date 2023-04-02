const User = require('../modules/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}


// registrar usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // criar um token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


// cadastrar usuario
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // criar um token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { loginUser, signupUser }