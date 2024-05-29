import React, { useState } from 'react';
import './Register.css';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setStatusMessage({ type: 'error', text: 'All fields are required.' });
            return;
        }

        if (password !== confirmPassword) {
            setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        const validateEmail = (email) => {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(email);
        };

        if (!validateEmail(email)) {
            setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        try {
            const emailCheckResponse = await fetch(`http://localhost:3001/users?email=${email}`);
            const emailCheckData = await emailCheckResponse.json();

            if (emailCheckData.length > 0) {
                setStatusMessage({ type: 'error', text: 'Email is already registered. Please use a different email.' });
                return;
            }

            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setStatusMessage({ type: 'success', text: 'Registration successful!' });
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                setStatusMessage({ type: 'error', text: 'Failed to register.' });
            }
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'An error occurred while registering.' });
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-box">
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength="2"
                        />
                        <FaUser className='icon'/>
                    </div>
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
                    <div className="input-box">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                        <FaLock className='icon'/>
                    </div>
                    <div className="submit-box">
                        <button type="submit">Register</button>
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

export default Register;
