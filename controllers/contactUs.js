const ContactUs = require('../models/contactUs');
const nodemailer = require('nodemailer')

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
            res.send(data),
            requirements(data)
        })
        .catch(error => {
            res.status(500).send({ message: error.message || 'Error al enviar el formulario' })
        })
}
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Todos los campos son requeridos' });
    }
    const contactUs = {
        eventType: req.body.eventType,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone
    }

    ContactUs.findOneAndUpdate(req.params.id, contactUs, { new: true }).then(contactUs => {
        if (!contactUs) {
            return res.status(480).send({ message: 'No se encontro un destino conese Id' })
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

const envioEmail = (receiverEmail, subject, contentEmail, contentTxt = '')=>{
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'falcontravelvip@gmail.com',
            pass: 'falcontravel2020+',
         }
    })
    const configEmail = {
        from: 'Contacto FalconTravel',
        to: receiverEmail,
        subject: subject,
        text: contentTxt,
        html: contentEmail
    }
    transport.sendMail(configEmail, (err, info)=>{
        if(err){
            console.log('No se envio el email')
        }else{
            console.log('Correo enviado con exito')
        }
    })
}
const requirements = (dataContacto)=>{
    
   const contentEmail = `<h1>Nuevo requerimiento de usuario</h1>
    <p color="red"> ${dataContacto.eventType}</p>
    <p> ${dataContacto.description}</p>
    <p> ${dataContacto.email}</p>
    <p> ${dataContacto.phone}</p>`

    envioEmail('falcontravelvip@gmail.com', 'Nuevo usuario', contentEmail)
}