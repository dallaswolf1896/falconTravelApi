const Destinations = require('../models/destinations');
const mongoose = require('mongoose');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Todos los campos son requeridos' });
    }
    const destino = new Destinations({
        country: req.body.country,
        destinationName: req.body.destinationName,
        price: req.body.price,
        description: req.body.description,
        stay: req.body.stay,
        imageLinks: req.body.imageLinks,
        cityId: new mongoose.Types.ObjectId(req.body.cityId)
    })
    destino.save().then(
        data => {
            res.status(200).send(data)
        }
    ).catch(
        error => {
            res.status(500).send({ message: error.message || 'Error subiendo el destino' })
        }
    )

}
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Todos los campos son requeridos' });
    }
    const destinations = {
        country: req.body.country,
        destinationName: req.body.destinationName,
        price: req.body.price,
        description: req.body.description,
        stay: req.body.stay,
        imageLinks: req.body.imageLinks,
        cityId: req.body.cityId
    }
    Destinations.findByIdAndUpdate(req.params.id, destinations, { new: true }).then(destino => {
        if (!destino) {
            return res.status(400).send({ message: 'No se encontro un destino con ese Id' })
        }
        res.send(destino)

    }).catch(error => {
        if (error.kind == 'ObjectId') {
            return res.status(404).send({ message: 'No se encontro un destino con el Id seleccionado' });

        }
        return res.status(500).send({ message: 'Error:  Actualizar el destino' })

    })
}


exports.getAll = (req, res) => {
    let searchBy = {}
    if (req.query.searchBy != undefined && req.query.searchBy != null) {
        const destination = new RegExp(`.*${req.query.searchBy}.*`, 'i')
        searchBy = { destinationName: destination }
    }

    Destinations.find(searchBy).then(destinations => {
        res.send(destinations)
    }).catch(error => {
        res.status(500).send({ message: error.message || 'Error de conexión' })
    })
}

exports.findByParams = (req, res) => {
    const destination = new mongoose.Types.ObjectId(req.params.destination);
    Destinations.find({cityId: destination})
    .then(dest => {
        res.status(200).json(dest)
    })
    .catch(err => {
        res.status(500)
    })
} 

exports.getOne = (req, res) => {
    Destinations.findOne({_id:req.params.id}).then(
        destination=>{
            res.send(destination)
        }
    ).catch(error => {
        res.status(500).send({ message: error.message || 'Error de conexión' })
    })
}