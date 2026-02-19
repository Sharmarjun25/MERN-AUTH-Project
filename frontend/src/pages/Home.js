import React, { useEffect } from 'react';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
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
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);



    return (
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <ToastContainer />

        </div>
    );
}

export default Home;