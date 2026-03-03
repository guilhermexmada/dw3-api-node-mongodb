import gameService from '../services/gameService.js' // importando o Service

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

export default { getAllGames, createGame } // assim se exporta uma função