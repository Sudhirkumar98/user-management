import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserForm from './components/UserForm';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const addUser = newUser => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    setUsers(updatedUsers);
  };

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Router>
      <div className="container m-6 mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home users={users} setUsers={setUsers} deleteUser={deleteUser} />} />
          <Route path="/edit/:id" element={<UserForm users={users} updateUser={updateUser} />} />
          <Route path="/create" element={<UserForm addUser={addUser}  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
