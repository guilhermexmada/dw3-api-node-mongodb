import mongoose from 'mongoose'

// criando estrutura da coleção
const gameSchema = new mongoose.Schema({
    title: String,
    platform: String,
    year: Number,
    price: Number
})

// cria model de coleção 'Game' com a estrutura de gameSchema
const Game = mongoose.model('Game', gameSchema) 

// exporta model
export default Game