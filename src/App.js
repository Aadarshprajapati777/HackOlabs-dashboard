import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Homepage';
import SkillsPage from './Pages/SkillsPage';
import WhiteBoard from './Pages/WhiteBoardPage';
import WhiteboardWithId from './Pages/WhiteBoard';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SkillsPage" element={<SkillsPage />} />
        <Route path="/whiteboardpage" element={<WhiteBoard />} />
        <Route path="/whiteboard/:roomId" element={<WhiteboardWithId />} />

      </Routes>
    </div>
  );
}

export default App;

