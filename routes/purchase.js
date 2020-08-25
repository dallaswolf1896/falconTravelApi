const express = require('express') //define por donde va la app
const api = express.Router() //router metodo de express

api.post('/create', () => {})
api.put('/update/:id', () => {})
api.delete('/remove/:id', () => {})
api.get('/getAll', () => {})
api.get('/getOne/:id')
