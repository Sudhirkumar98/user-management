import React from "react";
import { Link } from "react-router-dom";

function Home({ users, deleteUser }) {
  const displayUsers =
    users &&
    users.map((user) => (
      <tr key={user.id}>
        <td className="border px-4 py-2">{user.name}</td>
        <td className="border px-4 py-2">{user.email}</td>
        <td className="border px-4 py-2">{user.phone}</td>
        <td className="border px-4 py-2 flex justify-center">
          <Link
            to={`/edit/${user.id}`}
            className="btn bg-green-500 text-white p-2 px-3 rounded mr-3"
          >
            Edit
          </Link>
          <button
            className="btn bg-red-500 text-white p-2 rounded"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <div>
      <div className="flex justify-between items-center">

        <h1 className="uppercase font-bold">Users List</h1>
      <Link
        to="/create"
        className="btn bg-blue-500 text-white p-2 rounded"
      >
        Add User
      </Link>

      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left py-2 ">Name</th>
            <th className="text-left py-2">Email</th>
            <th className="text-left py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
      </table>
    </div>
  );
}

export default Home;
