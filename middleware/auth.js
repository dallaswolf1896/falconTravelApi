
const services = require('../services')

exports.isAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes permisos, por favor incia sesión' })
    }
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVsZW5hIiwiaWF0IjoxNTE2MjM5MDIyfQ.XizCOyDJPHZ6dUUiKZ5GvuRJSXtat1Wppzg5bS7_mCk
    const token = req.headers.authorization.split(' ')[1]
    services.decodeToken(token).then(response => {
        req.user = response
        next()
    }).catch(error => {
        res.status(error.status).send({ message: error.message })
    })

}