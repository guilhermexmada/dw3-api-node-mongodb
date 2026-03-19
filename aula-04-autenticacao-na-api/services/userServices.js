import User from '../models/Users.js'

class userService{
    async Create(name, email, password){
        try {
            const newUser = new User({
                name,
                email,
                password
        })
            await newUser.save()
        } catch (error) {
            console.log(error)
        }
    }
    async getOne(email){
        try {
            // findOne() busca um registro no banco de dados
            const user = await User.findOne({email : email})
            return user
        } catch (error) {
            console.log(error)
        }
    }
}

export default new userService()