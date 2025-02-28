import React from "react";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navigation />
      
    </div>
  );
};

export default HomePage;