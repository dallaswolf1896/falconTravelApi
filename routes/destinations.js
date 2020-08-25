const express = require('express');
const api = express.Router();
const destinations = require('../controllers/destinations')

api.post('/destinations/create', destinations.create);
api.put('/destinations/update/:id', () => {});
api.delete('/destinations/remove/:id', () => {});
api.get('/destinations/getAll', () => {});
api.get('/destinations/getOne/:id', () =>{});

module.exports = api
