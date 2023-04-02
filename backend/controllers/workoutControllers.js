const Workout = require('../modules/workoutModel')
const mongoose = require('mongoose')

// resgatar todos exercicios
const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(workouts)
}

// resgatar um unico exercicio
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercicio não encontrado' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'Exercício não encontrado' })
    }

    res.status(200).json(workout)
}


// criar um novo exercicio
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Por favor preencher todos os campos', emptyFields })
    }

    // adicionar documento ao db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, load, reps, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// apagar um exercicio
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercicio não encontrado' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: 'Exercício não encontrado' })
    }

    res.status(200).json(workout)
}

// atualizar um exercicio
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Exercício não encontrado' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({ error: 'Exercício não encontrado' })
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}