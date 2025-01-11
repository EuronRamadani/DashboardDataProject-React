import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto d-flex justify-center items-center">
        {/* <h1 className="text-xl font-bold"> */}
        <Link to="/">React Dashboard</Link>
        {/* </h1> */}
        <nav>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
