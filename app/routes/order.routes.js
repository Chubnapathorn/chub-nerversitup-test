module.exports = (app) => {
    const order = require('../controllers/order.controller');

    // Create a new Note
    app.post('/order/:userId', order.create);

    app.get('/order/:orderId', order.findOrder);

    app.get('/order/history/:userId', order.findOrderHistoryByUser);





}