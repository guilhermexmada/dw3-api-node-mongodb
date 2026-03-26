import userServices from "../services/userServices.js"
import jwt from 'jsonwebtoken' // importando JWT para criar token
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

const JWTSecret = 'thegames-secret' // segredo (geralmente em .env) para gerar token

const createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        await userServices.Create(name, email, hash)
        res.status(201).json({message : "Usuário cadastrado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Não foi possível cadastrar o usuário. Erro interno do servidor."})
    }
}

// função para autenticar um usuário (login)
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        // se o e-mail existe
        if(email != undefined){
            // busca usuário no banco
            const user = await userServices.getOne(email)
            // se o usuário for encontrado
            if(user != undefined){
                // verifica se o hash de senha está correto
                const correct = bcrypt.compareSync(password, user.password)
                if(correct){
                    // concede token de autenticação com dados personalizados + secredo + tempo de expiração
                    jwt.sign({id: user._id, email: user.email}, JWTSecret, {expiresIn: '48h'}, 
                        // verifica se ocorreu erro ou, se bem-sucedido, grava token
                        (error, token) => {
                            if(error){
                                res.status(400).json({error: "Não foi possível gerar o token de autenticação."})
                            } else {
                                res.status(200).json({message: "Login realizado com sucesso!", token: token})
                            }
                    })
                } else{
                    // se a senha estiver incorreta -> cod 401 (unauthorized)
                    res.status(401).json({error: "Suas credenciais são inválidas. Verifique e tente novamente."})
                }
            } else {
                // se o usuário não foi encontrado -> cod 404 (not found)
                res.status(404).json({error: "Usuário não encontrado. Verifique e tente novamente."})
            }
        } else {
            // e-mail não encontrado
            res.status(404).json({error: "E-mail inválido ou vazio."})
        }       
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Não foi possível realizar o login. Erro interno do servidor."})
    }
}

export default { createUser, loginUser, JWTSecret }