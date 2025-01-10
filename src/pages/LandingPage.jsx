import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to React Dashboard!</h2>
        <p>Explore the dashboard to view and manage data interactively.</p>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
