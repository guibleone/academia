const express = require('express')

const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()


// requer autorização para todas as trotas de exercicios
router.use(requireAuth)

//GET todos exercícios
router.get('/', getWorkouts)

//GET um único exercicio
router.get('/:id', getWorkout)

//POST um novo exercicio
router.post('/', createWorkout)

//DELETE um exercicio
router.delete('/:id', deleteWorkout)

//UPDATE um exercicio
router.patch('/:id', updateWorkout)

module.exports = router