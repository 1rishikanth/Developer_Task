import React, { useState } from 'react';
import axios from 'axios';
import '../styles/InvoiceSearchPage.css'; // Import the CSS file

const InvoiceSearchPage = () => {
    const [searchType, setSearchType] = useState('customer'); // 'customer', 'id', 'status'
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('paid');
    const [invoices, setInvoices] = useState([]);
    const [invoice, setInvoice] = useState(null);

    const handleSearch = async () => {
        try {
            let response;
            if (searchType === 'customer') {
                response = await axios.get(`http://localhost:5000/api/invoices/customer/${searchQuery}`);
                setInvoices(response.data);
            } else if (searchType === 'id') {
                response = await axios.get(`http://localhost:5000/api/invoices/${searchQuery}`);
                setInvoice(response.data);
            } else if (searchType === 'status') {
                response = await axios.get(`http://localhost:5000/api/invoices/status/${status}`);
                setInvoices(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleMarkAsPaid = async (invoiceId) => {
        try {
            await axios.patch(`http://localhost:5000/api/invoices/${invoiceId}/pay`);
            handleSearch(); // Refresh the list after marking as paid
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2>Invoice Search</h2>
            <div className="search-options">
                <label>
                    <input
                        type="radio"
                        value="customer"
                        checked={searchType === 'customer'}
                        onChange={() => setSearchType('customer')}
                    />
                    Search by Customer Number
                </label>
                <label>
                    <input
                        type="radio"
                        value="id"
                        checked={searchType === 'id'}
                        onChange={() => setSearchType('id')}
                    />
                    Search by Invoice ID
                </label>
                <label>
                    <input
                        type="radio"
                        value="status"
                        checked={searchType === 'status'}
                        onChange={() => setSearchType('status')}
                    />
                    Search by Status
                </label>
                <a href='/itemwise-revenue'>Click here to check ItemWise revenue</a>
                <a href='/invoices'>Click here to see previous invoices</a>
            </div>

            {searchType === 'status' ? (
                <div className="search-form">
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                    <button onClick={handleSearch}>Search</button>
                </div>
            ) : (
                <div className="search-form">
                    <input
                        type="text"
                        placeholder={searchType === 'customer' ? 'Customer Number' : 'Invoice ID'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            )}

            {searchType === 'id' && invoice && (
                <div className="results">
                    <h3>Invoice Details</h3><br></br>
                    <p>ID: {invoice._id}</p>
                    <p>Customer Phone: {invoice.customerPhone}</p>
                    <p>Customer Name: {invoice.customerName}</p>
                    <p>Total Amount: {invoice.totalAmount}</p>
                    <p>Status: {invoice.status}</p>
                    <p>Created At: {new Date(invoice.createdAt).toLocaleString()}</p>
                </div>
            )}

            {searchType !== 'id' && (
                <div className="results">
                    <h3>Invoices</h3>
                    {invoices.length === 0 ? (
                        <p className="no-data">No data available</p>
                    ) : (
                        <ul>
                            {invoices.map(invoice => (
                                <li key={invoice._id}>
                                    <div>
                                        ID: {invoice._id}, Date: {new Date(invoice.createdAt).toLocaleString()}, 
                                        Customer Phone: {invoice.customerPhone}, Total Amount: {invoice.totalAmount}, 
                                        Status: {invoice.status}
                                    </div>
                                    {searchType === 'status' && invoice.status === 'unpaid' && (
                                        <button onClick={() => handleMarkAsPaid(invoice._id)}>Mark as Paid</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default InvoiceSearchPage;
