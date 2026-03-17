import express from "express"
import mongoose from "mongoose"
import gameRoutes from "./routes/gameRoutes.js"

const app = express()

// Configurações do app
app.use(express.json()) // Permite uso de json nas operações
app.use("/", gameRoutes)

// Iniciando a conexão com o banco de dados mongodb
mongoose.connect("mongodb://127.0.0.1:27017/api-the-games-novo")

// Criando rota principal
app.get("/", (req, res) => {
    const games = [
        {
            title: "Game 1",
            year: "2020",
            plataform: "PC",
            price: 20
        },
        {
            title: "Game 2",
            year: "2022",
            plataform: "Xbox",
            price: 30
        }
    ]
    res.status(200).json(games)
})

// Rodando a API na porta 4000
const port = 4000

app.listen(port, (error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log("API rodando na porta http://localhost:" + port)
    }
})