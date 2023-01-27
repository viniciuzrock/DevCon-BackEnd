const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const { default:mongoose } = require("mongoose")

module.exports = class AuthController{

    static async register(req,res){

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
    };

    static async login(req,res){
        const userEmail = req.body.email
        const userPassword = req.body.password

        if(userEmail == null || userPassword == null){
            return res.status(400).json({
                error:"E-mail e senha são obrigatórios."
            });
        }
        const userExists = await User.findOne({
            email: userEmail
        })

        if(!userExists){
            return res.status(400).json({
                error: "Não há nenhum usuário cadastrado com o e-mail informado."
            });
        }

        const checkPassword = await bcrypt.compare(userPassword, userExists.password)

        if(!checkPassword){
            return res.status(422).json({
                error: "Senha inválida."
            })
        }

        try {
            const newToken = jwt.sign({
                name: userExists.name,
                id: userExists._id
            },"supersecret")
            res.json({
                error:null,
                msg:"Login realizado!",
                token: newToken,
                userId: userExists._id
            })
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    };

}