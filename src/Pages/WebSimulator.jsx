import React, { useState } from 'react';
import { Code, Play, Save, RotateCcw, Layout, Cpu, FileJson, Book, Star, Users } from 'lucide-react';
import Navigation from '../components/Navigation/Navigation';
import Header from '../components/Header/Header';

const CodeLab = () => {
  const [activeTab, setActiveTab] = useState('html');
  const [previewKey, setPreviewKey] = useState(0);
  
  const [htmlCode, setHtmlCode] = useState(
`<!-- Write your HTML here -->
<div class="container">
  <h1>Welcome to My Page</h1>
  <p class="description">Start editing to see your changes!</p>
  <button id="clickMe">Click Me!</button>
  <div id="counter">0</div>
</div>`
  );

  const [cssCode, setCssCode] = useState(
`/* Write your CSS here */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2563eb;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  color: #4b5563;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1d4ed8;
}

#counter {
  font-size: 2rem;
  margin-top: 1rem;
  color: #2563eb;
  font-weight: bold;
}`
  );

  const [jsCode, setJsCode] = useState(
`// Write your JavaScript here
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('clickMe');
  const counter = document.getElementById('counter');
  let count = 0;

  button.addEventListener('click', () => {
    count++;
    counter.textContent = count;
    
    if (count % 10 === 0) {
      alert('Wow! You reached ' + count + ' clicks!');
    }
  });
});`
  );

  const combinedCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeLab Project</title>
    <style>
      ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
      ${jsCode}
    </script>
</body>
</html>
  `;

  const handleRunCode = () => {
    setPreviewKey(prev => prev + 1);
  };

  const handleSaveCode = () => {
    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codelab-project.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Header />
      <Navigation />
      {/* <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Cpu className="text-blue-600 h-8 w-8" />
              <span className="text-2xl font-bold text-blue-600">Olabs</span>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 flex items-center gap-2">
                <Star className="h-4 w-4" /> Pro Features
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 flex items-center gap-2">
                <Users className="h-4 w-4" /> Community
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 flex items-center gap-2">
                <Book className="h-4 w-4" /> Tutorials
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Code className="text-blue-500" /> Code Editor
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleRunCode}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Play className="h-4 w-4" /> Run
                  </button>
                  <button 
                    onClick={handleSaveCode}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Save className="h-4 w-4" /> Save Project
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    activeTab === 'html' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Layout className="h-4 w-4" /> HTML
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    activeTab === 'css' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Code className="h-4 w-4" /> CSS
                </button>
                <button
                  onClick={() => setActiveTab('js')}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    activeTab === 'js' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FileJson className="h-4 w-4" /> JavaScript
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode}
                onChange={(e) => {
                  if (activeTab === 'html') setHtmlCode(e.target.value);
                  if (activeTab === 'css') setCssCode(e.target.value);
                  if (activeTab === 'js') setJsCode(e.target.value);
                }}
                className="w-full h-[500px] p-4 font-mono text-sm focus:outline-none resize-none border rounded-md"
                spellCheck="false"
                placeholder={`Write your ${activeTab.toUpperCase()} code here...`}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-gray-800">Live Preview</h2>
            </div>
            <div className="h-[600px] overflow-auto bg-white">
              <iframe
                key={previewKey}
                srcDoc={combinedCode}
                title="preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-500 mb-4">
              <Layout className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">HTML Editor</h3>
            <p className="text-gray-600">
              Build the structure of your web pages with our intuitive HTML editor. 
              Perfect for beginners and experts alike.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-500 mb-4">
              <Code className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">CSS Styling</h3>
            <p className="text-gray-600">
              Design beautiful layouts with our CSS editor. 
              Real-time preview helps you see changes instantly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-500 mb-4">
              <FileJson className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">JavaScript Magic</h3>
            <p className="text-gray-600">
              Add interactivity to your projects with our JavaScript editor. 
              Debug and test your code in real-time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeLab;
