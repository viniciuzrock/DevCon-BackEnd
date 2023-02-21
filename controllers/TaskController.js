const Task = require("../models/Task")
const jwt = require("jsonwebtoken")
const { find } = require("../models/Task")

module.exports = class TaskController{

    static async newTask(req, res){
        const name = req.body.name
        const description = req.body.description
        const done = req.body.done

        if(name == null || description == null){
            return res.status(400).json({
                error:"Nome e descrição da tarefa são obrigatórios."
            })
        }

        const task = new Task({
            name: name,
            description: description,
            done: done
        })

        try {
            const addTask = await task.save()
            console.log('SALVOU');
        } catch (error) {
            console.log('ERRO');
            console.log(error);

        }
    }

    static async getTasks(req,res){

        try {
            const tasks = await Task.find()
            res.json({
                error:null,
                msg:"Tarefas encontradas",
                tasks:tasks
            })
            console.log('ACHOU');
        } catch (error) {
            console.log(error);
        }

    }
    static async getDoneTasks(req,res){

        try {
            const tasks = await Task.find({
                done:true
            })
            res.json({
                error:null,
                msg:"Tarefas encontradas",
                tasks:tasks
            })
            console.log('ACHOU');
        } catch (error) {
            console.log(error);
        }

    }
    static async getPendingTasks(req,res){

        try {
            const tasks = await Task.find({
                done:false
            })
            res.json({
                error:null,
                msg:"Tarefas encontradas",
                tasks:tasks
            })
            console.log('ACHOU');
        } catch (error) {
            console.log(error);
        }

    }
}