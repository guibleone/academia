require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
mongoose.set('strictQuery', false)

//criar express app
const app = express()

app.use(cors())

//middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//rotas
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//conectar ao banco de dados
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //escutar por requests
        app.listen(process.env.PORT, () => {
        console.log('conectado ao db e escutando na porta', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


