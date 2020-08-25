const express = require('express') //define por donde va la app
const api = express.Router() //router metodo de express
const purchase = require('../controllers/purchase')

api.post('/purchase/create', purchase.create)
api.put('/purchase/update/:id', purchase.put)
api.delete('/purchase/remove/:id', purchase.delete)
api.get('/purchase/getAll', purchase.get)
api.get('/purchase/getOne/:id')

module.exports = api
