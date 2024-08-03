import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemWiseRevenue = () => {
    const [itemWiseRevenue, setItemWiseRevenue] = useState({});

    useEffect(() => {
        const fetchItemWiseRevenue = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/invoices/itemwise-revenue');
                setItemWiseRevenue(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchItemWiseRevenue();
    }, []);

    return (
        <div>
            <h2>Item Wise Revenue</h2>
            <ul>
                {Object.keys(itemWiseRevenue).map(item => (
                    <li key={item}>
                        Item: {item}, Quantity Sold: {itemWiseRevenue[item].quantity}, Revenue: {itemWiseRevenue[item].revenue}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemWiseRevenue;
