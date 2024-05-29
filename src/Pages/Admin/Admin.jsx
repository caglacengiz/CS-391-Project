import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
    const [view, setView] = useState(null);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [deleteEmail, setDeleteEmail] = useState('');

    useEffect(() => {
        
        listAllMembers();
        listAllMessages();
    }, []);

    const listAllMembers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const listAllMessages = async () => {
        try {
            const response = await fetch('http://localhost:3001/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const updateUserEmail = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users?email=${oldEmail}`);
            const data = await response.json();
            if (data.length > 0) {
                const userId = data[0].id;
                await fetch(`http://localhost:3001/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: newEmail }),
                });
                alert('User email updated successfully!');
                setOldEmail('');
                setNewEmail('');
                listAllMembers(); // Refresh the list of members
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error('Error updating user email:', error);
        }
    };

    const deleteUser = async () => {
        if (!deleteEmail) {
            alert('Please enter an email to delete a user.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/users?email=${deleteEmail}`);
            const data = await response.json();
            if (data.length > 0) {
                const userId = data[0].id;
                await fetch(`http://localhost:3001/users/${userId}`, {
                    method: 'DELETE',
                });
                alert('User deleted successfully!');
                setDeleteEmail('');
                listAllMembers(); // Refresh the list of members
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div id="admin-container">
            <div id="side-menu">
                <div className="menu-item" onClick={() => setView('members')}>List All Members</div>
                <div className="menu-item" onClick={() => setView('messages')}>List All Messages</div>
                <div className="menu-item" onClick={() => setView('updateEmail')}>Update User's Email</div>
                <div className="menu-item" onClick={() => setView('deleteUser')}>Delete A User</div>
            </div>

            <div id="content">
                
                {view === 'updateEmail' && (
                    <div id="updateEmailForm" className="form-style">
                        <input
                            type="email"
                            id="oldEmail"
                            placeholder="Old Email"
                            value={oldEmail}
                            onChange={(e) => setOldEmail(e.target.value)}
                        />
                        <input
                            type="email"
                            id="newEmail"
                            placeholder="New Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button onClick={updateUserEmail}>Update Email</button>
                    </div>
                )}

                {view === 'deleteUser' && (
                    <div id="deleteForm" className="form-style">
                        <input
                            type="email"
                            id="deleteEmail"
                            placeholder="User's Email"
                            value={deleteEmail}
                            onChange={(e) => setDeleteEmail(e.target.value)}
                        />
                        <button onClick={deleteUser}>Delete User</button>
                    </div>
                )}

                {view === 'members' && (
                    <div id="membersList">
                        <h2>Members List</h2>
                        <ul>
                            {members.map(member => (
                                <li key={member.id}>{member.email}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {view === 'messages' && (
                    <div id="messagesList">
                        <h2>Messages List</h2>
                        <ul>
                            {messages.map(message => (
                                <li key={message.id}>{message.email}: {message.message}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
