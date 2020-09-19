module.exports = (app) => {
    const products = require('../controllers/product.controller');

    app.post('/products', products.create);

    app.get('/products', products.findAll);

    app.get('/products/:name', products.findOneByProductName);

    app.put('/products/:name', products.update);

    app.delete('/products/:noteId', products.delete);
}