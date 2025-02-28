import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Code, Play, HelpCircle, Library, MessageSquare, Check, ChevronRight } from 'lucide-react';
import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';

const WebDevSection = () => {
  const [activeSection, setActiveSection] = useState('theory');
  const navigate = useNavigate();

  
  const Theory = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="flex items-center space-x-3 text-blue-600 mb-2">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Web Development Fundamentals</h2>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed">
          Web development consists of three core technologies that work together to create modern websites:
        </p>
        
        <div className="my-6 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">The Web Triad</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>HTML</strong> - Structure and content</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>CSS</strong> - Presentation and styling</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>JavaScript</strong> - Behavior and interactivity</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Web Page Example</h3>
          <pre className="bg-white p-4 rounded-lg overflow-x-auto border border-gray-200">
            {`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <style>
    body { font-family: Arial; }
    .header { color: blue; }
  </style>
</head>
<body>
  <h1 class="header">Hello World</h1>
  <script>
    document.querySelector('h1').addEventListener('click', () => {
      alert('Hello from JavaScript!');
    });
  </script>
</body>
</html>`}
          </pre>
        </div>
      </div>
    </div>
  );

  const Procedure = () => (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 text-orange-600 mb-6">
        <Code className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Building a Web Page</h2>
      </div>

      <div className="space-y-6">
        {[
          {
            title: "Create HTML Structure",
            code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n</body>\n</html>",
            description: "Start with basic HTML5 document structure"
          },
          {
            title: "Add Content with HTML",
            code: "<h1>Welcome</h1>\n<p>This is my first paragraph</p>\n<button>Click Me</button>",
            description: "Use semantic HTML tags to structure content"
          },
          {
            title: "Style with CSS",
            code: "body { padding: 20px; }\nh1 { color: darkblue; }\nbutton { padding: 10px 20px; }",
            description: "Add styles to elements using CSS selectors"
          },
          {
            title: "Add Interactivity with JavaScript",
            code: "document.querySelector('button').addEventListener('click', () => {\n  alert('Button clicked!');\n});",
            description: "Use JavaScript to handle user interactions"
          }
        ].map((step, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{step.description}</p>
            <pre className="bg-white p-4 rounded-lg border border-gray-200 overflow-x-auto">
              {step.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );

  const SelfEvaluation = () => (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 text-purple-600 mb-6">
        <HelpCircle className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Test Your Knowledge</h2>
      </div>

      <div className="space-y-8">
        {[
          {
            question: "Which HTML tag is used for paragraph?",
            options: ["<para>", "<p>", "<paragraph>", "<text>"],
            correct: 1
          },
          {
            question: "How do you select an element by ID in CSS?",
            options: [
              ".className",
              "#idName",
              "tagName",
              "*"
            ],
            correct: 1
          },
          {
            question: "Which JavaScript method converts a string to number?",
            options: [
              "Number()",
              "String()",
              "ParseInt()",
              "ToString()"
            ],
            correct: 0
          }
        ].map((q, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-6">
            <p className="font-medium text-gray-900 mb-4">{`${idx + 1}. ${q.question}`}</p>
            <div className="space-y-3">
              {q.options.map((option, optIdx) => (
                <label key={optIdx} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-purple-200 transition-colors">
                  <input 
                    type="radio" 
                    name={`q${idx}`} 
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Resources = () => (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 text-gray-600 mb-6">
        <Library className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Learning Resources</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "HTML5 Reference",
            description: "Complete guide to HTML elements and attributes",
            type: "MDN Docs"
          },
          {
            title: "CSS Flexbox Guide",
            description: "Master modern layout techniques with Flexbox",
            type: "Interactive Tutorial"
          },
          {
            title: "JavaScript Basics",
            description: "Learn fundamental programming concepts",
            type: "Video Course"
          },
          {
            title: "Web Projects",
            description: "Practice with real-world project ideas",
            type: "Project Ideas"
          }
        ].map((resource, idx) => (
          <div key={idx} className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900">{resource.title}</h3>
              <span className="text-sm text-gray-500">{resource.type}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
              Access Resource
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Feedback component remains the same


  const Feedback = () => (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 text-blue-600 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Share Your Feedback</h2>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How helpful was this lesson?
          </label>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What could we improve?
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Share your thoughts..."
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'theory': return <Theory />;
      case 'procedure': return <Procedure />;
      case 'evaluation': return <SelfEvaluation />;
      case 'resources': return <Resources />;
      case 'feedback': return <Feedback />;
      default: return <Theory />;
    }
  };

  const tabs = [
    { id: 'theory', label: 'Theory', icon: BookOpen, color: 'text-blue-600' },
    { id: 'procedure', label: 'Step-by-Step', icon: Code, color: 'text-orange-600' },
    { id: 'simulator', label: 'Code Playground', icon: Play, color: 'text-green-600' },
    { id: 'evaluation', label: 'Quiz', icon: HelpCircle, color: 'text-purple-600' },
    { id: 'resources', label: 'Resources', icon: Library, color: 'text-gray-600' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, color: 'text-blue-600' }
  ];

  // Rest of the component remains the same with updated titles


  const handleTabClick = (tabId) => {
    if (tabId === 'simulator') {
      navigate('/simulator-webdevelopment');
    } else {
      setActiveSection(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-sm text-gray-500">
            you are here &gt; home &gt; web development &gt; fundamentals &gt; html-css-js
          </div>
        </div>
      </div> */}
      <Header />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Introduction to Web Development: HTML, CSS, and JavaScript</h1>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all
                ${activeSection === tab.id 
                  ? 'bg-white shadow-sm border-t-2 border-t-blue-600' 
                  : 'bg-white/60 hover:bg-white'}`}
            >
              <tab.icon className={`w-5 h-5 ${tab.color}`} />
              <span className={activeSection === tab.id ? 'font-medium' : ''}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
};

export default WebDevSection;