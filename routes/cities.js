const express = require('express');
const api = express.Router();
const cities = require('../controllers/cities');



api.post('/cities/create', () => {});
api.put('/cities/update/:id', cities.update);
api.delete('/cities/remove/:id', () => {});
api.get('/cities/getAll', cities.getAll);
api.get('/cities/getOne/:id', () => {});

module.exports = api