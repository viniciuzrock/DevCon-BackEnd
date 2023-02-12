const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = class UserController{

    static async getUser(req, res){
        console.log('bateu');
        const userId = req.body.userIdLogin
        try {
            const user = await User.findById(userId)
            console.log(user);
            res.json({
                error: null,
                msg: "Usuário encontrado!",
                data: user
            })
        } catch (error) {
            res.status(400).json({
                error: error
            })
        }



    }
}