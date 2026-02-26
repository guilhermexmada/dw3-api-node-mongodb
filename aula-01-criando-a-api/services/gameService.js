import Game from '../models/Game.js' // importando Model

// a camada de services possui os métodos que chamam a Model

class gameService{
    async getAll(){ // função assíncrona que retorna todos os jogos (função não bloqueante)
        // try trata sucesso
        try{
            // .find() é o método do mongoose p/ buscar registros no banco
            // await faz a função esperar a consulta
            const games = await Game.find() 
            return games
        } 
        // catch trata falha
        catch(error){
            console.log(error)
        }
    }
}

export default new gameService() // assim se exporta uma classe