import gameService from '../services/gameService.js' // importando o Service
import {ObjectId} from 'mongodb' // importa função p/ validar IDs

// função p/ tratar requisição de LISTAR TODOS OS JOGOS
const getAllGames = async (req,res) => {
    try{
        const games = await gameService.getAll() // chamando método no service
        res.status(200).json({games : games})
        // cod. 200 (OK) : requisição tratada com sucesso
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Erro interno do servidor. Não foi possível listar os jogos."})
        // cod. 500 (SERVER ERROR)
    }
}

// função p/ tratar a requisição de CADASTRAR UM JOGO
const createGame = async(req, res) => {
    try {
        // desestruturação do corpo da requisição POST
        const {title, platform, year, price} = req.body
        // passando dados para camada Service
        await gameService.Create(title,platform,year,price)
        // res.sendStatus(201) envia apenas cod de status
        res.status(201).json({message:"O jogo foi cadastrado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro interno do servidor. Não foi possível cadastrar o jogo."})
    }
}

// função p/ tratar a requisição de DELETAR UM JOGO
const deleteGame = async(req, res) => {
    try {
        // coletando ID recebida pela URL
        const id = req.params.id
        // validando ID c/ pacote mongodb
        if(ObjectId.isValid(id)){
            await gameService.Delete(id)
            res.status(204).json({message:"O jogo foi excluído com sucesso."}) // http 204 (no context) é para deleções
        } else{
            res.status(400).json({error:"Ocorreu um erro na validação da ID."})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Erro interno do servidor. Não foi possível excluir o jogo."})
    }
}

// função p/ tratar a requisição de ALTERAR UM JOGO
const updateGame = async(req, res) => {
    try {
        const id = req.params.id // ID vem pela URL
        if(ObjectId.isValid(id)){
            const {title,platform,year,price} = req.body // dados vem pelo corpo da requisição
            const game = await gameService.Update(id,title,platform,year,price)

            res.status(200).json({message:"O jogo foi alterado com sucesso.", game : game}) // retorna tmb o JSON com o game alterado
        }else{
            res.status(400).json({error:"Ocorreu um erro na validação da ID."})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Erro interno do servidor. Não foi possível alterar o jogo."})
    }
}

// função p/ tratar a requisição de BUSCAR UM JOGO ÚNICO
const getOneGame = async(req,res) => {
    try {
        const id = req.params.id
        if(ObjectId.isValid(id)){
            const game = await gameService.getOne(id)
            // verificando se o jogo foi encontrado
            if(!game){
                res.status(404).json({message:"O jogo buscado não foi encontrado."})
            } else{
                res.status(200).json({message:"O jogo foi encontrado com sucesso.", game : game})
            }
        } else {
            res.status(400).json({error:"Ocorreu um erro na validação da ID."})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Erro interno do servidor. Não foi possível encontrar o jogo."})
    }
}

export default { getAllGames, createGame, deleteGame, updateGame, getOneGame } // assim se exporta uma função