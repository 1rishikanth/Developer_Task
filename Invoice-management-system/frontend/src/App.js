import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import ItemWiseRevenue from './components/ItemWiseRevenue';
import InvoiceSearchPage from './pages/InvoiceSearchPage'; // Import the new page

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<InvoiceForm />} />
                    <Route path="/invoices" element={<InvoiceList />} />
                    <Route path="/itemwise-revenue" element={<ItemWiseRevenue />} />
                    <Route path="/invoice-search" element={<InvoiceSearchPage />} /> {/* Add the new route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
