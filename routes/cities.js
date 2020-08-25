const express = require('express');
const api = express.Router();


api.post('/cities/create', () => {});
api.put('/cities/update/:id', () => {});
api.delete('/cities/remove/:id', () => {});
api.get('/cities/getAll', () => {});
api.get('/cities/getOne/:id',() => {});

module.exports = api
