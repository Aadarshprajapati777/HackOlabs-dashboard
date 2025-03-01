import React, { useState, useEffect } from 'react';
import { Slider, Button, Collapse, Statistic, Tooltip, Progress, Alert } from 'antd';
import { 
  RefreshCw, Plus, Rocket, Calculator, 
  Info, Sigma, TrendingUp, ClipboardList, Code,
  School, Lightbulb, LineChart
} from 'lucide-react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LinearRegressionSimulator = () => {
  const [points, setPoints] = useState([]);
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);
  const [mse, setMSE] = useState(0);
  const [learningRate, setLearningRate] = useState(0.01);
  const [iterations, setIterations] = useState(100);
  const [activeSteps, setActiveSteps] = useState(['1']);
  const [currentStep, setCurrentStep] = useState(1);

  // Generate regression line coordinates
  const generateRegressionLine = () => {
    const xValues = points.map(p => p.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept }
    ];
  };

  // Calculate Mean Squared Error
  const calculateMSE = () => {
    if (points.length === 0) return 0;
    const errors = points.map(p => (p.y - (slope * p.x + intercept)) ** 2);
    return errors.reduce((a, b) => a + b, 0) / points.length;
  };

  useEffect(() => {
    setMSE(calculateMSE().toFixed(2));
  }, [points, slope, intercept]);

  // Handle clicking on chart to add points
  const handleCanvasClick = (e) => {
    const canvas = e.chart.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = e.x - rect.left;
    const y = e.y - rect.top;
    
    const newPoint = {
      x: Math.round((x / canvas.width * 10) * 10) / 10,
      y: Math.round(((canvas.height - y) / canvas.height * 10) * 10) / 10
    };
    
    setPoints([...points, newPoint]);
  };

  // Chart configuration
  const chartData = {
    datasets: [
      {
        label: 'Your Data Points',
        data: points,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        pointRadius: 8,
      },
      {
        label: 'Best Fit Line',
        data: generateRegressionLine(),
        type: 'line',
        borderColor: 'rgba(54, 162, 235, 0.8)',
        borderWidth: 2,
        pointRadius: 0,
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 10,
        title: { display: true, text: 'X-axis (Input)' }
      },
      y: {
        type: 'linear',
        min: 0,
        max: 10,
        title: { display: true, text: 'Y-axis (Output)' }
      }
    },
    onClick: handleCanvasClick,
    maintainAspectRatio: false
  };

  // Learning Steps
  const learningSteps = [
    {
      key: '1',
      title: '🌟 Welcome to Line Master!',
      icon: <School />,
      content: (
        <div className="space-y-4">
          <Alert
            message="Let's learn how to find the best fitting line through points!"
            type="info"
            showIcon
          />
          <div className="space-y-2">
            <p><strong>Today you'll learn:</strong></p>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>What a line of best fit is</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>How to measure line accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span>Automatically find the perfect line</span>
            </div>
          </div>
          <Button 
            type="primary" 
            onClick={() => setCurrentStep(2)}
            icon={<Lightbulb size={16} />}
          >
            Start Learning →
          </Button>
        </div>
      )
    },
    {
      key: '2',
      title: '📌 Add Your Data Points',
      icon: <Plus />,
      content: (
        <div className="space-y-4">
          <p><strong>Let's collect some data!</strong></p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p>1. Click anywhere on the graph to add points</p>
            <p>2. Try to make a rough line pattern</p>
            <p>3. Add at least 5 points to continue</p>
          </div>
          <div className="flex items-center space-x-2">
            <Progress 
              type="circle" 
              percent={(points.length/5)*20} 
              width={50} 
              format={() => `${points.length}/5`}
            />
            <span>Points collected</span>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => setCurrentStep(1)}
              icon={<RefreshCw size={16} />}
            >
              Back
            </Button>
            <Button 
              type="primary" 
              onClick={() => setCurrentStep(3)}
              disabled={points.length < 5}
              icon={<LineChart size={16} />}
            >
              Next: Draw Line →
            </Button>
          </div>
        </div>
      )
    },
    {
      key: '3',
      title: '🎚 Adjust Your Line',
      icon: <Sigma />,
      content: (
        <div className="space-y-4">
          <p><strong>Make the line fit your points!</strong></p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p>✨ Pro Tip: Watch the Error Score go down as your line fits better</p>
            <Statistic
              title="Current Error Score (MSE)"
              value={mse}
              valueStyle={{ color: mse < 5 ? '#52c41a' : '#ff4d4f' }}
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">
                <Sigma className="inline mr-2" />
                Slope (Steepness): {slope.toFixed(2)}
              </label>
              <Slider
                min={-2}
                max={5}
                step={0.1}
                value={slope}
                onChange={setSlope}
              />
            </div>
            <div>
              <label className="block mb-2">
                <TrendingUp className="inline mr-2" />
                Intercept (Starting Height): {intercept.toFixed(2)}
              </label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={intercept}
                onChange={setIntercept}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => setCurrentStep(2)}>Back</Button>
            <Button 
              type="primary" 
              onClick={() => setCurrentStep(4)}
              icon={<Rocket size={16} />}
            >
              Next: Auto-Magic Line →
            </Button>
          </div>
        </div>
      )
    },
    {
      key: '4',
      title: '⚡ Auto-Magic Line Finder',
      icon: <Rocket />,
      content: (
        <div className="space-y-4">
          <p><strong>Let the computer find the perfect line!</strong></p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p>How it works:</p>
            <ol className="list-decimal pl-4">
              <li>Computer makes random guesses</li>
              <li>Checks how good each guess is</li>
              <li>Slowly improves the guesses</li>
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Learning Speed</label>
              <Slider
                min={0.001}
                max={0.1}
                step={0.001}
                value={learningRate}
                onChange={setLearningRate}
              />
              <span className="text-sm">{learningRate.toFixed(3)}</span>
            </div>
            <div>
              <label>Number of Guesses</label>
              <Slider
                min={10}
                max={500}
                step={10}
                value={iterations}
                onChange={setIterations}
              />
              <span className="text-sm">{iterations}</span>
            </div>
          </div>
          <Button 
            type="primary" 
            block
            icon={<Rocket size={16} />}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Start Smart Search!
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center space-x-3">
            <LineChart className="text-blue-600" />
            <span>Line Master: Smart Line Finder</span>
          </h1>
          <p className="text-gray-600">A fun way to learn about lines and predictions!</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Graph */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200">
              <div className="h-96">
                <Scatter data={chartData} options={chartOptions} />
              </div>
              <div className="text-center mt-4">
                <Button 
                  icon={<Plus />}
                  onClick={() => {
                    const newPoints = Array.from({ length: 5 }, () => ({
                      x: Number((Math.random() * 10).toFixed(1)),
                      y: Number((Math.random() * 10).toFixed(1))
                    }));
                    setPoints(newPoints);
                  }}
                >
                  Add Random Points
                </Button>
              </div>
            </div>

            {/* Current Line Info */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Calculator className="mr-2" />
                Your Current Line Equation
              </h3>
              <div className="text-2xl font-mono bg-white p-3 rounded-lg">
                y = {slope.toFixed(2)}x + {intercept.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Right Side - Learning Steps */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  {learningSteps[currentStep-1].icon}
                  <span className="ml-2">{learningSteps[currentStep-1].title}</span>
                </h3>
                <div className="text-gray-500">Step {currentStep}/4</div>
              </div>
              {learningSteps[currentStep-1].content}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl">
                <Statistic
                  title="Data Points"
                  value={points.length}
                  prefix={<ClipboardList className="text-green-600" />}
                />
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <Statistic
                  title="Error Score"
                  value={mse}
                  prefix={<Sigma className="text-red-600" />}
                  valueStyle={{ color: mse < 5 ? '#52c41a' : '#ff4d4f' }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-yellow-50 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">Quick Tools</h4>
              <div className="flex space-x-2">
                <Tooltip title="Start Over">
                  <Button 
                    icon={<RefreshCw />}
                    onClick={() => {
                      setPoints([]);
                      setSlope(1);
                      setIntercept(0);
                      setCurrentStep(1);
                    }}
                  />
                </Tooltip>
                <Button icon={<Code />}>
                  Show Computer Code
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Footer */}
        <div className="mt-8">
          <Progress 
            percent={(currentStep/4)*100} 
            showInfo={false}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <div className="flex justify-between mt-2">
            <span>Learning Progress</span>
            <span>{Math.round((currentStep/4)*100)}% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearRegressionSimulator;