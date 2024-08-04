/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [originalName, setOriginalName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

  const handleClick = async () => {
    if (editingUserId) {
      const updatePayload: any = {};
      if (name !== originalName) updatePayload.name = name;
      if (email !== originalEmail) updatePayload.email = email;

      if (Object.keys(updatePayload).length > 0) {
        try {
          const response = await axios.put(
            `http://localhost:1600/users/${editingUserId}`,
            updatePayload
          );
          console.log('response:', response);
          setEditingUserId(null); // Clear the editing state
          setOriginalName('');
          setOriginalEmail('');
        } catch (error) {
          console.error('Error:', error);
        }
      }
    } else {
      try {
        const response = await axios.post('http://localhost:1600/users', {
          name,
          email,
        });
        console.log('response:', response);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setName('');
    setEmail('');
    getUsersData(); // Refresh the list of users after adding/updating a user
  };

  const getUsersData = async () => {
    try {
      const response = await axios.get('http://localhost:1600/users');
      console.log('response:', response);
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:1600/users/${id}`);
      console.log('response:', response);
      getUsersData(); // Refresh the list of users after deleting one
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (user: any) => {
    setName(user.name);
    setEmail(user.email);
    setOriginalName(user.name);
    setOriginalEmail(user.email);
    setEditingUserId(user._id);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="app-container">
      <h1>My Simple Component</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <button onClick={handleClick} className="submit-button">
          {editingUserId ? 'Update' : 'Submit'}
        </button>
      </div>
      <div className="user-list-container">
        <h2>User List</h2>
        <ul className="user-list">
          {users.map((user: any) => (
            <li key={user._id} className="user-list-item">
              {user.name} - {user.email}
              <div className="user-actions">
                <button
                  onClick={() => handleEdit(user)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
