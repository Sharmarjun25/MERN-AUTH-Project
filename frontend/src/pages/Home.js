import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess, API_URL } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged out successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = `${API_URL}/products`;
            const headers = {
                'Authorization': localStorage.getItem('token')
            };
            const response = await fetch(url, { headers });
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="home-page">
            <nav className="home-navbar">
                <div className="home-navbar-brand">
                    MERN <span>AUTH</span>
                </div>
                <div className="home-navbar-welcome">
                    Welcome back, <strong>{loggedInUser}</strong>
                </div>
                <button className="home-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>


            <div className="home-content">


                <div className="home-stats-grid">
                    <div className="home-stat-card">
                        <span className="home-stat-icon"></span>
                        <span className="home-stat-value">{loggedInUser}</span>
                        <span className="home-stat-label">Logged In User</span>
                    </div>
                    <div className="home-stat-card">
                        <span className="home-stat-icon"></span>
                        <span className="home-stat-value">{products.length}</span>
                        <span className="home-stat-label">Total Products</span>
                    </div>
                    <div className="home-stat-card">
                        <span className="home-stat-icon"></span>
                        <span className="home-stat-value">{formatTime(currentTime)}</span>
                        <span className="home-stat-label">{formatDate(currentTime)}</span>
                    </div>
                </div>

                <div className="home-section-header">
                    <h2>Products</h2>
                    <div className="home-section-line"></div>
                </div>

                {products.length > 0 ? (
                    <div className="home-products-grid">
                        {products.map((item, index) => (
                            <div className="home-product-card" key={index}
                                style={{ animationDelay: `${0.1 * index}s` }}>
                                <span className="home-product-index">#{index + 1}</span>
                                <div className="home-product-name">{item.name}</div>
                                <div className="home-product-price">₹{item.price}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="home-empty-state">
                        <span></span>
                        No products available
                    </div>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;