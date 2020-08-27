const ContactUs = require('../models/contactUs');
const { restart, reset } = require('nodemon');


exports.create = (req, res) => {
    console.log('aca esta llegando');
    if (!req.body) {
        return res.status(400).send({ message: 'Todos los campos son requeridos' })
    }

    const contact = new ContactUs({
        eventType: req.body.eventType,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone
    })

    contact.save()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({ message: error.message || 'Error al enviar el formulario' })
        })
}
exports.update = (req, res) => {
    if (!req.body) {
        return restart.status(400).send({ message: 'Todos los campos son requeridos' });
    }
    const contactUs = {
        eventType: req.body.eventType,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone
    }

    ContactUs.findOneAndUpdate(req.params.id, contactUs, { new: true }).then(contactUs => {
        if (!contactUs) {
            return reset.status(480).send({ message: 'No se encontro un destino conese Id' })
        }
        res.send(contactUs)


    }).catch(error => {
        if (error.kind == 'objectId') {
            return res.status(404).send({ messege: 'No se encontro un destino con el Id' })

        }
        return res.status(500).send({ message: 'error: Actualizar el destion' })
    })
}

exports.getAll = (req, res) => {

    const type = new RegExp(`.*${req.query.searchBy}.*`, 'i')

    ContactUs.find({ eventType: type }).then(contactUs => {
        res.send(contactUs)

    }).catch(error => {
        res.status(500).send({ message: error.message || 'Error de conexión' })

    })

}