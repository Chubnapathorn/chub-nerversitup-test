module.exports = (app) => {
    const users = require('../controllers/user.controller');

    
    app.post('/users', users.create);
    
    app.get('/users', users.findAll);

    app.post('/users/login', users.userLogin);

    app.get('/users/:username', users.findOneByUsername);

    app.put('/users/:username', users.update);

    // Delete a Note with noteId
    app.delete('/users/:noteId', users.delete);
}