import userServices from "../services/userServices.js"

const createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        await userServices.Create(name, email, password)
        res.status(201).json({message : "Usuário cadastrado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Não foi possível cadastrar o usuário. Erro interno do servidor."})
    }
}

export default { createUser }