import React from "react";
import Header from "../components/Header/Header";
import MainContent from '../components/MainContent/MainContent'
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <MainContent />
    </div>
  );
};

export default HomePage;