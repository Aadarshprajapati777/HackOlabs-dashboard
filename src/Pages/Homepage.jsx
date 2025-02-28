import React from "react";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Maincontent  from "../components/MainContent/MainContent";
import ChatBox from "../components/Chatbot/Chatbot";
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navigation />
      <Maincontent />
      <ChatBox />
    </div>
  );
};

export default HomePage;