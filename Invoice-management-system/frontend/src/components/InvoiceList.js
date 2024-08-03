import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/invoices');
                setInvoices(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchInvoices();
    }, []);

    return (
        <div>
            <h2>Invoices</h2>
            <ul>
                {invoices.map(invoice => (
                    <li key={invoice._id}>
                        ID: {invoice._id}, Date: {new Date(invoice.createdAt).toLocaleString()}, 
                        Customer Phone: {invoice.customerPhone}, Total Amount: {invoice.totalAmount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoiceList;
