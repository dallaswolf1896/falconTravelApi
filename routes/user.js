const express = require('express');
const api = express.Router();

/**
 * POST: Para crear
 * GET: Obtener
 * DELETE: Eliminar
 * PUT: Modificar
 */

api.post('/create', () => {}); //Vamos a crear un usuario
api.put('/update/:id', () => {}); //Vamos a modificar un usuario
api.delete('/remove/:id', () => {}); //Vamos a eliminar un usuario
api.get('/getAll', () => {}); //Vamos a obtener todos los usuarios
api.get('/getOne/:id', () => {}); //Vamos a obtener un usuario