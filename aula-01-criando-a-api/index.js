import express from 'express'
import mongoose from 'mongoose'
import gameRoutes from './routes/gameRouters.js'

const app = express()

app.use(express.json()) // permite uso de JSON na aplicação

// usando rotas
app.use('/', gameRoutes)

// iniciando conexão com banco MongoDB na porta padrão
mongoose.connect("mongodb://127.0.0.1:27017/api-the-games")

// rota raiz
// app.get("/", (req,res) => {
//     res.status(200).json({"message" : "API rodando com sucesso!"})
//     const games = [ // array de objetos p/ exemplo
//         {
//             title: "Game 1",
//             year: "2020",
//             platform: "PC",
//             price: 20
//         },
//         {
//             title: "Game 2",
//             year: "2024",
//             platform: "Xbox",
//             price: 30
//         }
//     ]
//     res.status(200).json(games) // retornando status + dados
// })

// rodando API na porta 4000

const port = 4000
app.listen(port, (error) => {
    if (error) {
        console.log(`Erro ao iniciar servidor na porta 4000: ${error}`)
    } else {
        console.log(`API iniciada em http://localhost:${port}`)
    }
})
