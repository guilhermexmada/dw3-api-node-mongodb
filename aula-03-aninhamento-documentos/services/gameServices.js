import Game from "../models/Games.js"

class GameServices {
    // Método para buscar todos os games
    async getAll(){
        try {
            // Método do mongoose para buscar dados no banco
            const games = await Game.find()
            return games
        } catch (error) {
            console.log(error)
        }
    }
    // Método para cadastrar um game
    async Create(title, year, price, descriptions){
        try {
            const newGames = new Game({
                title,
                year,
                price,
                descriptions
            })

            // Gravando no banco
            await newGames.save() // Método do mongoose para cadastro
        } catch (error) {
            console.log(error)
        }
    }

    // Método para excluir um jogo

     async Delete(id) {
        try {
            // Excluindo o jogo pela id
            await Game.findByIdAndDelete(id)
            console.log(`Game excluido | id: ${id}`)
        } catch (error) {
            console.log(error)
        }
     }

    // Método para alterar o jogo
    async Update(id, title, year, price, descriptions) {
        try {
            const updateGame = await Game.findByIdAndUpdate(id, {
                title,
                year,
                price,
                descriptions
            }, 
            { new : true }
        )

        console.log(`Jogo alterado | id: ${id}`)
        return updateGame
        } catch (error) {
            console.log(error)
        }
    }

    // Método para lista um jogo unico
    async getOne(id){
        try {
            const game = await Game.findOne({_id : id})
            return game
        } catch (error) {
            console.log(error)
        }
    }

    
}

export default new GameServices