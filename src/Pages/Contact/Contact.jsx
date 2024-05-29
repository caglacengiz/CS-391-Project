import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isUserExist = async (email) => {
        try {
            const response = await fetch(`http://localhost:3001/users?email=${email}`);
            const data = await response.json();
            return data.length > 0;
        } catch (error) {
            console.error('Error checking user existence:', error);
            return false;
        }
    };

    const saveMessage = async (email, message) => {
        if (!await isUserExist(email)) {
            setStatusMessage({ type: 'error', text: 'User does not exist. Cannot send message.' });
            return false;
        }

        if (!email || !message) {
            setStatusMessage({ type: 'error', text: 'Please fill in all fields.' });
            return false;
        }

        try {
            const response = await fetch('http://localhost:3001/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            });

            if (response.ok) {
                return true;
            } else {
                console.error('Error saving message:', response.statusText);
                setStatusMessage({ type: 'error', text: 'Failed to send message.' });
                return false;
            }
        } catch (error) {
            console.error('Error saving message:', error);
            setStatusMessage({ type: 'error', text: 'An error occurred while sending the message.' });
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (await saveMessage(formData.email, formData.message)) {
            setStatusMessage({ type: 'success', text: 'Your message has been sent successfully!' });
            setFormData({
                email: '',
                message: ''
            });
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-form-box">
                <form onSubmit={handleSubmit}>
                    <h1>Contact With Me!</h1>
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
                    </div>
                    <div className="input-box">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="What's Up?"
                            required
                        ></textarea>
                    </div>
                    <div className="submit-box">
                        <button type="submit">Send</button>
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

export default Contact;
