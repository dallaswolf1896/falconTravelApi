const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { connectToDatabase } = require("./connectiondb")
const app = express() //aqui se inicializa express para poder usar todos los metodos que este framework nos da
const port = 3000
app.use(cors())
app.use(bodyParser.json())

connectToDatabase()

const cities = require('./routes/cities')
app.use('/api', cities) 
app.listen(port, function(){
    console.log("Servidor funcionando")
})


