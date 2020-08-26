const User = require('../models/user')
const crypto = require('crypto')


const passwordEncryption=(password)=>{
    const algoritmo = 'aes-256-cbc'
    let key = crypto.createCipher(algoritmo, password)
    let passCrypto = key.update(password, 'utf8', 'hex')
    passCrypto += key.final('hex')
    return passCrypto
}

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
        phone: req.body.phone,
        password: passwordEncryption(req.body.password),
        photo: req.body.photo,
        nationality: req.body.nationality,
        address: req.body.address,
        idDocument: req.body.idDocument
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