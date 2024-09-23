const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
);

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        adjective: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        }
    );

module.exports = mongoose.model('Product', ProductSchema);