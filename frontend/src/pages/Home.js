import React, { useEffect } from 'react';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged out successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }
    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";

            const headers = {
                'Authorization': localStorage.getItem('token')
            }
            const response = await fetch(url, { headers });
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);



    return (
        <div>
            <center><h1> HELLO THERE ! I AM {loggedInUser}</h1> </center>
            <button onClick={handleLogout}> Want to log  in again ? Logout</button>

            <div>
                <h2>Products</h2>
                {products.length > 0 ? (
                    <ul>
                        {products.map((item, index) => (
                            <li key={index}>
                                <span>{item.name}</span> - <span>₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products available</p>
                )}
            </div>

            <ToastContainer />

        </div>
    );
}

export default Home;