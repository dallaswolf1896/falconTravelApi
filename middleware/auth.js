export.isAuth = (req, res, nezt) => {

    if (!req.headers.authorization){
        return res.status(403).send({message:'No tienes permisos, por favor inicia sesion'})

    }
    const token =req.header.authorization.split('')[1]
}