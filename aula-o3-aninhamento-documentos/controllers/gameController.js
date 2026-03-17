// Importar o service
import gameServices from "../services/gameServices.js";
import { ObjectId } from "mongodb";

// Função para tratar a requisição de listar jogos
const getAllGames = async (req, res) => {
    try {
        const games = await gameServices.getAll()
        res.status(200).json({games : games})
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Erro interno do servidor. Não foi possível listar os jogos"})
    }
}

// Função para tratar a requisição de CADASTRAR um jogo
const createGames = async (req, res) => {
    try {
        const {title, year, price, descriptions} = req.body // Coletando dados do corpo da requisição
        await gameServices.Create(title, year, price, descriptions)
        res.status(201).json({message: "Jogo cadastrado com sucesso"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Erro interno do servidor. Não foi possível cadastrar o jogo"})
    }
}

// Função para DELETAR um jogo
const deleteGame = async (req, res) => {
    try {
        const id = req.params.id

        // Validação do id
        if(ObjectId.isValid(id)) { // Coletando id
            await gameServices.Delete(id)
            res.status(204).json({message: "Jogo excluído com sucesso"}) // Cod 204 (apagar) - NO CONTENT - 
        }
        else {
            res.status(400).json({error: "Erro ao validar id para excluir o jogo"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro no servidor"})
    }
}

// Função para ALTERAR um jogo
const updateGame = async (req, res) => {
    try {
        const id = req.params.id
        const {title, year, price, descriptions} = req.body

        if (ObjectId.isValid(id)){
            const game = await gameServices.Update(id, title, year, price, descriptions)
            res.status(200).json({message : "Jogo atualizado com sucesso!", game : game})
        } else {
            res.status(400).json({error: "Erro ao validar id para alterar o jogo"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro interno do servidor"})
    }
}

// Função para buscar um jogo único
const getOneGame = async (req, res) => {
    try {
        const id = req.params.id
        if(ObjectId.isValid(id)){
            const game = await gameServices.getOne(id)

            // Verificando se o jogo foi encontrado
            if (!game) { // Jogo não encontrado
                res.status(404).json("Jogo buscado não foi encontrado")
            }else{ // Jogo encontrado;
                res.status(200).json({game})
            }
        } else {
            res.status(400).json({error : "A id informada é inválida"}) // Bad request
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro interno do servidor"})
    }
}

export default {getAllGames,  createGames, deleteGame, updateGame, getOneGame }