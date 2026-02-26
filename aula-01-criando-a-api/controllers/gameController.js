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
        res.status(500).json({error:"Erro interno do servidor"})
        // cod. 500 (SERVER ERROR)
    }
}

export default { getAllGames } // assim se exporta uma função