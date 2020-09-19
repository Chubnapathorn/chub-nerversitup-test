const Order = require('../models/order.model.js');
const { v4: uuidv4 } = require('uuid');

let uuid = uuidv4();

// Create and Save a new Note
exports.create = (req, res) => {

    console.log(req.params.userId);
    
    console.log(req.body);

    const order = new Order({
        OrderID: uuid,
        UserID: req.params.userId,
        Amount: req.body.amount,
        Status: req.body.status || "Active",
        Item: req.body.item
    });

    order.save()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

exports.findOrderHistoryByUser = (req, res) => {
    Order.find({ UserID: req.params.userId })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.order
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.order
            });
        });
};

    exports.Y
    findOrder = (req, res) => {
    Order.findOne({ OrderID: req.params.orderId })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.userId
            });
        });
};