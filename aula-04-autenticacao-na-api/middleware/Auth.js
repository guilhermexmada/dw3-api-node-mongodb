// MIDDLEWARE DE AUTENTICAÇÃO
import jwt from 'jsonwebtoken'
import userController from '../controllers/userController.js'

const Authorization = (req, res, next) => {
    // Capturar o token do user através do cabeçalho da requisição
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearerToken = authToken.split(' ')   
        const token = bearerToken[1]

        // Verificando se o token é válido
        jwt.verify(token, userController.JWTSecret, (error, data) =>{
            // Token inválido
            if (error) {
                res.status(401).json({error: "Acesso não autorizado. Token inválido"})
            }
            // Token válido
            else {
                req.token = token
                req.loggedUser = {
                    id: data.id,
                    email: data.email
                }

                // Prosseguindo com a requisição
                next()
            }
        })
    }
    // Token não existe
    else {
        res.status(401).json({error: "Acesso não autorizado, você não está logado"})
    }
}

export default { Authorization }