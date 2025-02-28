import React from 'react';
import SubjectCard from '../components/Model/SubjectCard'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import  Chatbot from "../components/Chatbot/Chatbot"
const SkillPage = () => {
  const navigate = useNavigate(); 
  const subjects = [
    { 
      name: 'Web Development', 
      backgroundColor: '#FF6B00', 
      route: '/topics-webdevelopment',
      imageUrl: '/assets/web-development.svg' 
    },
    { 
      name: 'AI/ML', 
      backgroundColor: '#0088CC', 
      route: '/topics-ai',
      imageUrl: '/assets/ai-ml.png' 
    },
    { 
      name: 'Collaborative Whiteboard', 
      backgroundColor: '#8CC63F', 
      route: '/whiteboardpage',
      imageUrl: '/assets/collab-learn.png' 
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);  
  };

  return (
    <main className="flex-grow">
      <Header />
      <Navigation />
      <Chatbot />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Heading Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Learn Skills
          </h1>
          <h2 className="text-3xl font-bold text-[#0088CC]">Click to learn.</h2>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <div key={index} onClick={() => handleCardClick(subject.route)}>
              <SubjectCard
                subject={subject.name}
                imageUrl={subject.imageUrl}
                backgroundColor={subject.backgroundColor}
                // Don't pass path prop since we're handling navigation in the parent
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SkillPage;
