const express = require('express');
const api = express.Router();
const user = require('../controllers/user')
const auth = require('../middleware/auth')


/**
 * POST: Para crear
 * GET: Obtener
 * DELETE: Eliminar
 * PUT: Modificar
 */

api.post('/user/create', user.create); //Vamos a crear un usuario
api.put('/user/update/:id', user.update); //Vamos a modificar un usuario
api.delete('/user/remove/:id', () => {}); //Vamos a eliminar un usuario
api.get('/user/getAll', user.getAll); //Vamos a obtener todos los usuarios
api.post('/user/login', user.login);
api.get('/user/getOne/:id', user.getOne) //Vamos a obtener un usuario

module.exports = api