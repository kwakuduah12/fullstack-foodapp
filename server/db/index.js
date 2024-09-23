const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/food-ordering-app', { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch(err => {
        console.error('Connection error', err.message);
    });

const db = mongoose.connection;
module.exports = db;
ddjd