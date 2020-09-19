const Product = require('../models/product.model.js');
const { v4: uuidv4 } = require('uuid');

let uuid = uuidv4();
// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.name && !req.body.sku) {
        return res.status(400).send({
            message: "Product can not be empty"
        });
    }

    const product = new Product({
        ProductID : uuid,
        Name: req.body.name, 
        Description: req.body.description,
        NumberOfUnit: req.body.numberofunit,
        Price: req.body.price,
        Active: req.body.active
    });

    product.save()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Product."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

exports.findOneByProductName = (req, res) => {
    Product.findOne({ Name : req.params.name})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.name
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.name
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.name
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Product can not be empty"
        });
    }

    // Find note and update it with the request body
    Product.findOneAndUpdate({ Name : req.params.name}, {
        Name: req.body.name, 
        Description: req.body.description,
        SKU: req.body.sku,
        Price: req.body.price,
        Active: req.body.active || true,
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with name " + req.params.name
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with name " + req.params.name
            });                
        }
        return res.status(500).send({
            message: "Error updating product with name " + req.params.name
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findOneAndRemove({ Name : req.params.name})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.name
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.name
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.name
        });
    });
};