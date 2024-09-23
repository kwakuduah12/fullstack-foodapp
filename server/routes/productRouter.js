const express = require('express');

const router = express.Router();

const Product = require('../models/productModel');
const { model } = require('mongoose');

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({data : products});
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

model.exports = router;