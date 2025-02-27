import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Task Manager</Link>
        <Link to="/create-task" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
          Add New Task
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;