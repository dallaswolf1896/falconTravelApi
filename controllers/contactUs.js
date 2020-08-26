const ContactUs = require('../models/contactUs')

exports.create =  (req, res) => {
    console.log('aca esta llegando');
    if(!req.body){
        return res.status(400).send({message: 'Todos los campos son requeridos'})
    }

    const contact = new ContactUs ({
        eventType: req.body.eventType,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone
    })

    contact.save()
    .then(data =>{
        res.send(data)
    })
    .catch(error =>{
        res.status(500).send({message: error.message || 'Error al enviar el formulario'})
    })
}
