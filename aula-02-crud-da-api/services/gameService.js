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

    // método de cadastro de Game
    async Create(title, platform, year, price){
        try{
            const newGame = new Game({ // instanciando módulo de Games
                // técnica do JS de desestruturação : ao invés de atribuir os parâmetros, coloca o mesmo nome
                title, 
                platform,
                year,
                price
            }) 
            // gravando no banco com método mongoose .save()
            await newGame.save()
        }catch(error){
            console.log(error)
        }
    }

    // método de excluir Game
    async Delete(id){
        try {
            await Game.findByIdAndDelete(id) // método mongoose que seleciona e deleta um documento
            console.log(`Game com a id ${id} foi deletado.`)
        } catch (error) {
            console.log(error)
        }
    }

    // método de alterar Game
    async Update(id, title, platform, year, price){
        try {
            const updatedGame = await Game.findByIdAndUpdate(id, { // método mongoose que seleciona e altera um documento
                title,
                platform,
                year,
                price
            },
            { new : true } // retorna junto os novos dados do Game alterado
        ) 
            console.log(`Game com a id ${id} foi alterado.`)
            return updatedGame
        } catch (error) {
            console.log(error)
        }
    }

    // método para listar único Game
    async getOne(id){
        try {
            const game = await Game.findOne({ _id : id}) // primeiro id vem com underline, pois é padrão do mongodb
            return game
        } catch (error) {
            console.log(error)
        }
    }
}

export default new gameService() // assim se exporta uma classe