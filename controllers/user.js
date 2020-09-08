const User = require('../models/user')
const crypto = require('crypto')
const service = require('../services')


const passwordEncryption = (password) => {
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

    User.countDocuments({ email: req.body.email }).then(userEmail => {
        if (userEmail >= 1) {
            return res.status(400).send({ message: 'Señor usuario, el email ya existe' })
        }
    })



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

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'todos los campos son requeridos' })
    }
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        photo: req.body.photo,
        nationality: req.body.nationality,
        address: req.body.address,
        idDocument: req.body.idDocument
    }
    User.findByIdAndUpdate(req.params.id, user, { new: true }).then(usuario => {
        if (!usuario) {
            return res.status(400).send({ message: 'No se encontro usuario con ese ID' })
        }
        res.send(usuario)

    }).catch(error => {
        if (error.kind == 'ObjectId') {
            return res.status(404).send({ message: 'No se encontro un usuario con el Id indicado' })
        }
        return res.status(500).send({ message: 'Error al actualizar el usuario ' })
    })
}


exports.getAll = (req, res) => {
    let search = {};
    if (req.query.searchBy != undefined && req.query.searchBy != '') {
        search = { firstName: new RegExp(`.*${req.query.searchBy}.*`, 'i') }
    }
    User.find(search).then(users => {
        res.send(users)
    }).catch(error => {
        res.status(500).send({ message: error.message || 'Error de conexion con el servidor' })
    })
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, (error, dataUser) => {
        if (dataUser != null) {
            //console.log(req.body.password)
            //console.log(passwordEncryption(req.body.password));
            //console.log(dataUser.password)
            if (passwordEncryption(req.body.password) != dataUser.password) {
                return res.status(400).send({ message: 'Los datos no coinciden' })
            } else {
                res.send({ jwt: service.createToken(dataUser) })
            }
        } else {
            return res.status(500).send({ message: 'Error al iniciar sesión' })
        }
    })
}

exports.getOne = (req, res) => {
    User.findOne({ _id: req.params.id }).then(
        user => {
            if (!user) {
                return res.status(404).send({
                    message: 'El usuario no existe'
                })
            }
            console.log(user);
            res.send(user)

        }
    ).catch(error => {
        return res.status(500).send({
            message: 'Error'
        })
    })
}