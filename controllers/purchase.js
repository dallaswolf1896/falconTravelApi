const Purchase = require('../models/purchase');

exports.create = (req, res)=>{
    if(!req.body){
        return res.status(400).send({message: 'Todos los campos son requeridos'})
    }

    const purchaseNew = new Purchase({
        paymentMethod: req.body.paymentMethod,
        totalPrice:req.body.totalPrice,
        takeoffDay:req.body.takeoffDay,
        arrivalDay:req.body.arrivalDay,
        transportation:req.body.transportation,
        destinationId:req.body.destinationId,
        userId:req.body.paymentuserIdMethod,
    })
    
    purchaseNew.save().then(
        data=>{
            res.send(data)
        }
    ).catch(
        error=>{
            res.status(500).send({message: error.message || 'Error al procesar la compra'})
        }
    )
}
