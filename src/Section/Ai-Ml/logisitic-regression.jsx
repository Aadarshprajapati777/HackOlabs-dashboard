import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Code, Play, HelpCircle, Library, MessageSquare, Check, ChevronRight } from 'lucide-react';
import Navigation from '../../components/Navigation/Navigation';
import Header from '../../components/Header/Header';

const LogisticRegressionSection = () => {
  const [activeSection, setActiveSection] = useState('theory');
  const navigate = useNavigate();

  const Theory = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="flex items-center space-x-3 text-blue-600 mb-2">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Understanding Logistic Regression</h2>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed">
          Logistic Regression helps us predict yes/no or true/false outcomes. It's like a smart guessing game that tells us the probability of something happening.
        </p>
        
        <div className="my-6 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Concepts Made Simple</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>Sigmoid Function</strong>: Squishes values between 0 and 1 (like a probability meter)</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>Decision Boundary</strong>: The line that separates yes from no</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>Probability</strong>: Chance of something happening (0% to 100%)</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-life Example</h3>
          <div className="space-y-4">
            <p>Will a student pass the exam based on study hours?</p>
            <pre className="bg-white p-4 rounded-lg overflow-x-auto border border-gray-200">
              {`import pandas as pd
from sklearn.linear_model import LogisticRegression

# Sample data: Study hours vs Pass (1)/Fail (0)
data = [[2, 0], [3, 0], [4, 1], [5, 1]]
X = pd.DataFrame(data, columns=['Hours', 'Pass'])

# Create and train model
model = LogisticRegression()
model.fit(X[['Hours']], X['Pass'])

# Predict for 3.5 hours
prediction = model.predict([[3.5]])
print(f"Pass prediction: {'Yes' if prediction[0] else 'No'}")`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const Procedure = () => (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 text-orange-600 mb-6">
        <Code className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Step-by-Step Implementation</h2>
      </div>

      <div className="space-y-6">
        {[
          {
            title: "Prepare Your Data",
            code: `# Format: [Study Hours, Passed (0/1)]
data = [
  [2, 0], [3, 0],
  [4, 1], [5, 1]
]`,
            description: "Organize your data with features (hours) and outcome (pass/fail)"
          },
          {
            title: "Train the Model",
            code: `from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(hours_data, results)`,
            description: "Teach the computer patterns in your data"
          },
          {
            title: "Make Predictions",
            code: `# Predict for 3.5 hours\nmodel.predict([[3.5]])`,
            description: "Ask the model to guess outcomes for new data"
          },
          {
            title: "Check Accuracy",
            code: `from sklearn.metrics import accuracy_score\naccuracy = accuracy_score(true_results, predictions)`,
            description: "See how often the model is correct"
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
        <h2 className="text-xl font-semibold">Quick Knowledge Check</h2>
      </div>

      <div className="space-y-8">
        {[
          {
            question: "What does logistic regression predict?",
            options: ["Exact numbers", "Categories (Yes/No)", "Future dates", "Colors"],
            correct: 1
          },
          {
            question: "What shape does the sigmoid function make?",
            options: ["Straight line", "S-shape", "Circle", "Zig-zag"],
            correct: 1
          },
          {
            question: "Which metric is best for yes/no predictions?",
            options: ["Accuracy", "MSE", "Temperature", "Speed"],
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
        <h2 className="text-xl font-semibold">Learning Materials</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Interactive Sigmoid Demo",
            description: "Play with the S-curve visualization",
            type: "Web Tool"
          },
          {
            title: "Classification Basics",
            description: "Video explaining yes/no predictions",
            type: "YouTube Video"
          },
          {
            title: "Practice Dataset",
            description: "Real-world yes/no scenarios to try",
            type: "CSV File"
          },
          {
            title: "Cheat Sheet",
            description: "Key terms and formulas at a glance",
            type: "PDF Download"
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

  const Feedback = () => (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 text-blue-600 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Your Feedback Matters!</h2>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How clear was this lesson?
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
            What was confusing?
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Help us improve..."
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send Feedback
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
    { id: 'theory', label: 'Basics', icon: BookOpen, color: 'text-blue-600' },
    { id: 'procedure', label: 'Steps', icon: Code, color: 'text-orange-600' },
    { id: 'simulator', label: 'Try It', icon: Play, color: 'text-green-600' },
    { id: 'evaluation', label: 'Quiz', icon: HelpCircle, color: 'text-purple-600' },
    { id: 'resources', label: 'Materials', icon: Library, color: 'text-gray-600' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, color: 'text-blue-600' }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'simulator') {
      navigate('/simulator-logistic-regression');
    } else {
      setActiveSection(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-sm text-gray-500">
            you are here &gt; home &gt; machine learning &gt; classification &gt; logistic regression
          </div>
        </div>
      </div> */}
      <Header />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Learning Logistic Regression</h1>
        
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

        {renderContent()}
      </div>
    </div>
  );
};

export default LogisticRegressionSection;