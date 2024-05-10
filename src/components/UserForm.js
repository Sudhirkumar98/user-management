import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserForm({ addUser, updateUser, users }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (id) {
      const existingUser = users.find(user => user.id.toString() === id);
      if (existingUser) setUser(existingUser);
    }
  }, [id, users]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const method = id ? 'put' : 'post';
    const url = `https://jsonplaceholder.typicode.com/users/${id || ''}`;

    axios[method](url, user)
      .then(response => {
        alert(`User ${id ? 'updated' : 'created'}`);
        if (id) {
          updateUser({...response.data, id: parseInt(id)});
        } else {
      
          addUser({...response.data, id: response.data.id}); // Simulating a new ID
        }
        navigate('/');
      })
    //  .catch(error => alert(`Failed to ${id ? 'update' : 'create'} user`));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="text"
          placeholder="Phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {id ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
}

export default UserForm;
