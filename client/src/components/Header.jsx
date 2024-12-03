import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { auth } = useAuth();

  return (
    <header>
      <p>User: {auth?.user.name}</p>
      <div className="user-data">
      <Link to='/'>Home</Link>
      {
        auth?.user.role === 'admin' && <Link to="/dashboard">Dashboard</Link>
      }
      </div>
    </header>
  );
};

export default Header;
