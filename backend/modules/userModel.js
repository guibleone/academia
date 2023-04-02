const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// metodo estatico de cadastro
userSchema.statics.signup = async function (email, password) {

    // validação
    if (!email || !password) {
        throw Error('Todos os campos devem estar preenchidos')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email não é válido')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Senha não é forte o suficiente')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email já existe')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// metodo estatico de login
userSchema.statics.login = async function (email, password) {
    // validação
    if (!email || !password) {
        throw Error('Todos os campos devem estar preenchidos')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Email incorreto')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Senha incorreta')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)