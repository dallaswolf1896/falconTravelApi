const User = require('../models/user')

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Todos los campos son requeridos'
        })
    }
    const usuario = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.phone.phone,
        password: req.password,
        photo: req.photo,
        nacionality: req.nacionality,
        address: req.address,
        idDocument: req.idDocument
    })
    usuario.save().then(
            data => {
                res.send(data)
            }
        )
        .catch(
            error => {
                res.status(500).send({
                    message: error.message || 'Error al crear'
                })
            }
        )
}