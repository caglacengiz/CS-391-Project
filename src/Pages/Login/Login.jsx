import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [statusMessage, setStatusMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setStatusMessage({ type: 'error', text: 'Both email and password are required.' });
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/users?email=${email}`);
            const data = await response.json();
            if (data.length > 0 && data[0].password === password) {
                setStatusMessage({ type: 'success', text: 'Sign in successful!' });
                setFormData({ email: '', password: '' });
            } else {
                setStatusMessage({ type: 'error', text: 'Sign in failed. Please check your email and password.' });
            }
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'An error occurred while signing in.' });
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-box">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className='icon'/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                        <FaLock className='icon'/>
                    </div>
                    <div className="submit-box">
                        <button type="submit">Login</button>
                    </div>
                    {statusMessage && (
                        <div className={`validation-message ${statusMessage.type}`}>
                            {statusMessage.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;