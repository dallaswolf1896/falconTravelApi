const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'miTokenSecreto'

exports.createToken = (dataUser) => {
    const payload = {
        sub: dataUser._id, //Identificación del usuario
        iat: moment().unix(), //Fecha en la que se creó el token. (fecha actual)
        exp: moment().add('1', 'hour').unix(), //Fecha en la que expira el token. (fecha actual + 1 hora)
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        email: dataUser.email,
        phone: dataUser.phone,
        photo: dataUser.photo,
        nationality: dataUser.nationality,
        address: dataUser.address,
        idDocument: dataUser.idDocument,
    }
    return jwt.encode(payload, secret) //Encriptamos la información que tenemos en la constante payload y la firmamos con lo que tenemos en la constante secret.
}

exports.decodeToken = (token) => {
    /**
     * resolve => Cuando todo salió bien en nuestra promesa.
     * reject => Algo salió mal.
     */
    const decode = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, secret)
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub)
        } catch {
            reject({
                status: 500,
                message: 'El token es invalido'
            })
        }
    })
    return decode
}