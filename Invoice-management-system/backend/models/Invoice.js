const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
});

const invoiceSchema = new mongoose.Schema({
    customerPhone: String,
    customerName: String,
    items: [itemSchema],
    totalAmount: Number,
    status: { type: String, default: 'unpaid' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
