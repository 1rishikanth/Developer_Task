import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/InvoiceForm.css'; // Ensure the CSS import for styling

const InvoiceForm = () => {
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleItemChange = (index, event) => {
        const newItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, [event.target.name]: event.target.value };
            }
            return item;
        });
        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([...items, { name: '', quantity: 1, price: 0 }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
             await axios.post('http://localhost:5000/api/invoices/create', {
                customerPhone,
                customerName,
                items
            });
            setSuccessMessage('Invoice created successfully!');
            setTimeout(() => {
                navigate('/invoice-search');
            }, 2000); // Redirect after 2 seconds to show the success message
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Invoice Form</h1>
                <input
                    type="text"
                    placeholder="Customer Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                {items.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Item Name"
                            name="name"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                        <label>Quantity:</label>
                        <input
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                        <label>Price:</label>
                        <input
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddItem}>Add Item</button>
                <button type="submit">Create Invoice</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default InvoiceForm;
