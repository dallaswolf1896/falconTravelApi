const express = require('express');
const api = express.Router();
const destinations = require('../controllers/destinations')

api.post('/destinations/create', destinations.create);
api.put('/destinations/update/:id', destinations.update );
api.delete('/destinations/remove/:id', () => {});
api.get('/destinations/getAll', destinations.getAll);
api.get('/destinations/getOne/:id', () =>{});
api.get('/destinations/getByParams/:origin/:destination/:startDate/:endDate', destinations.findByParams);

module.exports = api
