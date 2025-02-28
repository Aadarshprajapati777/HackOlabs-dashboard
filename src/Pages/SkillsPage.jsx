import React from 'react';
import SubjectCard from '../components/Model/SubjectCard';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';

const SkillsPage = () => {
  const navigate = useNavigate(); 
  const subjects = [
    { name: 'Web Development', color: 'bg-blue-600', route: '/topics-webdevelopment' },
    { name: 'AI/ML', color: 'bg-blue-700', route: '/topics-ai' }
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
            Learn Skills
          </h1>
          <h2 className="text-3xl font-bold text-blue-800">Click to learn.</h2>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <div key={index} onClick={() => handleCardClick(subject.route)}>
              <SubjectCard
                subject={subject.name}
                color={subject.color}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SkillsPage;
