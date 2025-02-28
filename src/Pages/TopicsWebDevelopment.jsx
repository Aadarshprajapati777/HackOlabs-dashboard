
import React from 'react';
import SubjectCard from '../components/Model/SubjectCard';
// import SubjectCard from '../components/MainContent/SubjectCard'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';

const WebDevPage = () => {
  const navigate = useNavigate(); 
  const subjects = [
    { 
      name: 'Basic Web Dev', 
      backgroundColor: '#2563EB', // blue-600 equivalent
      route: '/section-webdev',
      imageUrl: '/assets/amritalogo.png' // Add your image path here
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);  // Navigate to the corresponding route
  };

  return (
    <main className="flex-grow">
      <Header />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Heading Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Learn Web Development
          </h1>
          <h2 className="text-3xl font-bold text-blue-800">Click to learn.</h2>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <div key={index} onClick={() => handleCardClick(subject.route)}>
              <SubjectCard
                subject={subject.name}
                imageUrl={subject.imageUrl}
                backgroundColor={subject.backgroundColor}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WebDevPage;
