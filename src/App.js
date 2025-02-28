import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Homepage';
import SkillsPage from './Pages/SkillsPage';
import TopicsWebDevelopmentPage from './Pages/TopicsWebDevelopment';
import WebDevSection from './Section/WebDev/webdev';
import LinearRegressionSection from './Section/Ai-Ml/linear-regression';
import WebSimulator from './Pages/WebSimulator';
import LogisticRegressionSection from './Section/Ai-Ml/logisitic-regression';
import TopicsAiMlPage from './Pages/TopicsAiMLPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route from="*" to="/" />
        <Route path="/SkillsPage" element={<SkillsPage />} />
        <Route path="/topics-ai" element={<TopicsAiMlPage />} />
        <Route path="/topics-webdevelopment" element={<TopicsWebDevelopmentPage />} /> 
        <Route path="/simulator-webdevelopment" element={<WebSimulator />} />
        <Route path = "/section-webdev" element={<WebDevSection />} />
        <Route path = "/section-linear-regression" element={<LinearRegressionSection />} />
        <Route path = "/section-logistic-regression" element={<LogisticRegressionSection />} />








      </Routes>
    </div>
  );
}

export default App;

