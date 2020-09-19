const User = require('../models/user.model.js');
const { v4: uuidv4 } = require('uuid');

let loginUserIdTemp;
// Create and Save a new Note
exports.create = (req, res) => {
    if (!req.body.username && !req.body.password) {
        return res.status(400).send({
            message: "Username & Password can not be empty"
        });
    }
    let uuid = uuidv4();
    console.log(`UUID : ${uuid}`);
    const user = new User({
        UserID: uuid,
        Username: req.body.username,
        Password: req.body.password,
        Name: req.body.name
    });

    
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId
// exports.findOne = (req, res) => {
//     User.findById(req.params.userId)
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });            
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving user with id " + req.params.userId
//         });
//     });
// };

exports.findOneByUsername = (req, res) => {
    console.log(req.params.username);
    User.findOne({ Username: req.params.username })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.username
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.password) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findOneAndUpdate({ Username: req.params.username }, {
        Password: req.body.password
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.noteId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};

exports.userLogin = (req, res) => {
    User.findOne({ Username: req.body.username }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found : " + req.body.username
            });
        }
        console.log(user);
        if (user.Password == req.body.password) {
            loginUserIdTemp = user.UserID;
            return res.send({ message: "Login Success", userInfo: user })
        } else {
            return res.send({ message: "Login Failed", userInfo: "Password Invalid" })
        }
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with username " + req.body.username
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with username " + req.body.username
        });
    });
};

exports.userLogout = (req, res) => {
    User.findOne({ Username: req.body.username }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found : " + req.body.username
            });
        }
        if (!loginUserIdTemp) {
            loginUserIdTemp = null;
            return res.send({ message: "Logout Success", userInfo: user })
        } else {
            return res.send({ message: "Logout Failed", userInfo: "Password Invalid" })
        }
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with username " + req.body.username
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with username " + req.body.username
        });
    });
};

