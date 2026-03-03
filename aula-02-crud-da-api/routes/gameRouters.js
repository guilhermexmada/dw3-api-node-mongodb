import express from 'express'
import gameController from '../controllers/gameController.js'

const gameRoutes = express.Router()

// a camada de routes armazena os endpoints (URLs) da API

// endpoint para LISTAR TODOS OS JOGOS
// quando uma req do tipo get for enviada para /games é chamada a função correspondente no controller
gameRoutes.get("/games", gameController.getAllGames)

// endpoint para CADASTRAR UM JOGO
gameRoutes.post("/games", gameController.createGame)

export default gameRoutes