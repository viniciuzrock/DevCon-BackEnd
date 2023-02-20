const mongoose = require("../db/conn")
const { Schema } = mongoose
const User = mongoose.model("Task", new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    done:{
        type: Boolean,
        required: true
    },
    user:{
        type: String,
        required: true
    }
},{
    timestamps: true
}))
module.exports = User