const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { default:mongoose } = require("mongoose")

module.exports = class UserController{
    static async register(req,res){
        console.log(req.body);
        const userName = req.body.name
        const userEmail = req.body.email
        const userPassword = req.body.password
        const userConfirmPassword = req.body.confirmPassword
        const userProfile = req.files

        if(userName == null || userEmail == null || userPassword == null || userConfirmPassword == null){
            return res.status(400).json({
                error: "Os campos de nome, e-mail e senha são obrigatórios."
            })
        }
        const emailExists = await User.findOne({
            email:userEmail
        })

        if(emailExists){
            return res.status(400).json({
                error:"O e-mail informado já está em uso."
            })
        }

        if(userPassword != userConfirmPassword){
            return res.status(400).json({
                error: "As senhas não coincidem."
            })
        }

        const salt = await bcrypt.genSalt(12)
        const encryptedPassword = await bcrypt.hash(userPassword, salt)
        const user = new User({
            name: userName,
            email: userEmail,
            password: encryptedPassword
        })
        try {
            const newUser = await user.save()
            const newToken = jwt.sign({
                name: newUser.name,
                id: newUser._id
            }, 'supersecret')

            res.json({
                error: null,
                msg: "Cadastro realizado.",
                token: newToken,
                userId: newUser._id
            })
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    }

}