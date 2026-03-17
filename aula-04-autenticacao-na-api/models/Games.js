import mongoose from "mongoose"

// O campo "description" será um documento aninhado
const descriptionSchema = new mongoose.Schema({
    genre: String,
    platform: String,
    rating: String
})

const gamesSchema = new mongoose.Schema({
    title: String,
    year: Number,
    price : Number,
    descriptions : descriptionSchema // aninhando o doc
})

const Game = mongoose.model("Game", gamesSchema)

export default Game