import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Login() {
    return (
        <div className='container'>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder='Enter your email...'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder='Enter your password...'
                    />
                </div>
                <button type="submit">Login</button>
                <span>Don't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;