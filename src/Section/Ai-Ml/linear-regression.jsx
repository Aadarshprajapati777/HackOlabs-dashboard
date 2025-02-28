import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Code, Play, HelpCircle, Library, MessageSquare, Check, ChevronRight } from 'lucide-react';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';

const LinearRegressionSection = () => {
  const [activeSection, setActiveSection] = useState('theory');
  const navigate = useNavigate();

  const Theory = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="flex items-center space-x-3 text-blue-600 mb-2">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Linear Regression Fundamentals</h2>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed">
          Linear regression is a statistical method for modeling the relationship between a dependent variable and one or more independent variables. 
          It finds the line of best fit through your data by minimizing the sum of squared residuals.
        </p>
        
        <div className="my-6 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Concepts</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>Equation</strong>: y = β₀ + β₁x + ε</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>Cost Function</strong>: Mean Squared Error (MSE)</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-blue-900"><strong>Optimization</strong>: Gradient Descent or Normal Equation</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h3>
          <pre className="bg-white p-4 rounded-lg overflow-x-auto border border-gray-200">
            {`import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
y = np.array([2, 4, 5, 4, 5])

# Create and fit model
model = LinearRegression()
model.fit(X, y)

# Predict new value
prediction = model.predict([[6]])
print(f"Slope: {model.coef_[0]:.2f}, Intercept: {model.intercept_:.2f}")
print(f"Prediction for x=6: {prediction[0]:.2f}")`}
          </pre>
        </div>
      </div>
    </div>
  );

  const Procedure = () => (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center space-x-3 text-orange-600 mb-6">
        <Code className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Implementing Linear Regression</h2>
      </div>

      <div className="space-y-6">
        {[
          {
            title: "Prepare the Data",
            code: "import numpy as np\nX = np.array([1, 2, 3, 4, 5])\ny = np.array([2, 4, 5, 4, 5])",
            description: "Create feature matrix (X) and target vector (y)"
          },
          {
            title: "Calculate Parameters",
            code: "x_mean = np.mean(X)\ny_mean = np.mean(y)\nbeta1 = np.sum((X - x_mean)*(y - y_mean)) / np.sum((X - x_mean)**2)\nbeta0 = y_mean - beta1*x_mean",
            description: "Compute slope (β₁) and intercept (β₀) using least squares"
          },
          {
            title: "Make Predictions",
            code: "def predict(x):\n    return beta0 + beta1 * x\nprint(predict(6))",
            description: "Use the regression equation for new predictions"
          },
          {
            title: "Evaluate Model",
            code: "from sklearn.metrics import mean_squared_error\ny_pred = beta0 + beta1 * X\nmse = mean_squared_error(y, y_pred)",
            description: "Calculate Mean Squared Error (MSE)"
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
        <h2 className="text-xl font-semibold">Regression Knowledge Check</h2>
      </div>

      <div className="space-y-8">
        {[
          {
            question: "What does the coefficient β₁ represent in y = β₀ + β₁x?",
            options: ["Y-intercept", "Slope of the line", "Error term", "Variance"],
            correct: 1
          },
          {
            question: "Which metric is commonly used to evaluate regression models?",
            options: ["Accuracy", "Mean Squared Error", "Precision", "F1 Score"],
            correct: 1
          },
          {
            question: "What does a residual represent?",
            options: [
              "Difference between actual and predicted",
              "Model parameters",
              "Input feature",
              "Standard deviation"
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
            title: "Introduction to Statistical Learning",
            description: "Comprehensive guide to regression techniques",
            type: "Textbook"
          },
          {
            title: "Linear Regression Mathematics",
            description: "Deep dive into the underlying mathematics",
            type: "Video Lecture"
          },
          {
            title: "Python Regression Tutorial",
            description: "Hands-on coding exercises with scikit-learn",
            type: "Interactive Tutorial"
          },
          {
            title: "Case Studies",
            description: "Real-world applications of regression analysis",
            type: "Research Paper"
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
    { id: 'procedure', label: 'Implementation', icon: Code, color: 'text-orange-600' },
    { id: 'simulator', label: 'Visualization', icon: Play, color: 'text-green-600' },
    { id: 'evaluation', label: 'Quiz', icon: HelpCircle, color: 'text-purple-600' },
    { id: 'resources', label: 'Resources', icon: Library, color: 'text-gray-600' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, color: 'text-blue-600' }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'simulator') {
      navigate('/simulator-linear-regression');
    } else {
      setActiveSection(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-sm text-gray-500">
            you are here &gt; home &gt; machine learning &gt; regression &gt; linear regression
          </div>
        </div>
      </div> */}
      <Header />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Understanding Linear Regression</h1>
        
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

export default LinearRegressionSection;