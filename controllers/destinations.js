const Destinations = require('../models/destinations');


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
        cityId: req.body.cityId
    })

    destino.save().then(
        data => {
            res.send(data)

        }
    ).catch(
        error => {
            res.status(500).send({ message: error.message || 'Error subiendo el destino' })
        }
    )

}