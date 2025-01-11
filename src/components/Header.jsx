import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto d-flex justify-content-center">
        {/* <Link className="mx-2" to="/">
          React Dashboard
        </Link> */}
        <nav>
          <Link to="/" className="mr-4 mx-2">
            Home
          </Link>
          <Link className="mr-4 mx-2" to="/dashboard">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
