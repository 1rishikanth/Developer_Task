const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Create Invoice
router.post('/create', async (req, res) => {
    try {
        const { customerPhone, customerName, items } = req.body;
        let totalAmount = 0;
        items.forEach(item => {
            totalAmount += item.price * item.quantity;
        });
        const newInvoice = new Invoice({
            customerPhone,
            customerName,
            items,
            totalAmount
        });
        const savedInvoice = await newInvoice.save();
        res.json(savedInvoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// View All Invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// View Customer Specific Invoices
router.get('/customer/:phone', async (req, res) => {
    try {
        const invoices = await Invoice.find({ customerPhone: req.params.phone });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// View Item Wise Revenue
router.get('/itemwise-revenue', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        console.log(invoices);
        const itemWiseRevenue = {};
        invoices.forEach(invoice => {
            invoice.items.forEach(item => {
                if (!itemWiseRevenue[item.name]) {
                    itemWiseRevenue[item.name] = { quantity: 0, revenue: 0 };
                }
                itemWiseRevenue[item.name].quantity += item.quantity;
                itemWiseRevenue[item.name].revenue += item.price * item.quantity;
            });
        });
        res.json(itemWiseRevenue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// View Invoice by ID
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// View Invoices by Status and Change Status
router.get('/status/:status', async (req, res) => {
    try {
        const invoices = await Invoice.find({ status: req.params.status });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/status/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        invoice.status = 'paid';
        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
