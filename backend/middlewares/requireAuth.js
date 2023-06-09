const jwt = require('jsonwebtoken')
const User = require('../modules/userModel')

const requireAuth = async (req, res, next) => {
    // verficar autenticação
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Token de autorização necessário' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Requisição não autorizada' })
    }
}

module.exports = requireAuth