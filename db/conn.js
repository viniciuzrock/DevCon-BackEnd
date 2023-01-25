const mongoose = require("mongoose")
const dbName = "DevCon"

async function main(){
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`).then(()=>{
        console.log("Banco de dados conectado!")
    })
}

main().catch((e)=>{
    console.log("Erro na conexão com o banco de dados: "+e);
})

module.exports = mongoose