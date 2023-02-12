const express = require("express")
const app = express()
const port = 8080
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use("/auth",authRoutes)
app.use("/user",userRoutes)

app.get("/",()=>{
    console.log('Entrou');
})

app.listen(port,()=>{
    console.log("Servidor Online na porta: "+ port);
})