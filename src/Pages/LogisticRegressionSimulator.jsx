import React, { useState, useEffect } from 'react';
import { Slider, Button, Collapse, Statistic, Tooltip, Progress, Alert, Switch } from 'antd';
import { 
  RefreshCw, Plus, Rocket, Calculator, 
  Info, Sigma, TrendingUp, ClipboardList, Code,
  School, Lightbulb, Divide, Zap
} from 'lucide-react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Navigation from '../components/Navigation/Navigation';

const LogisticRegressionSimulator = () => {
  const [points, setPoints] = useState([]);
  const [coef, setCoef] = useState(1);
  const [intercept, setIntercept] = useState(0);
  const [isClassA, setIsClassA] = useState(true);
  const [accuracy, setAccuracy] = useState(0);
  const [learningRate, setLearningRate] = useState(0.1);
  const [iterations, setIterations] = useState(100);
  const [currentStep, setCurrentStep] = useState(1);

  const sigmoid = (x) => 1 / (1 + Math.exp(-x));

  const calculateAccuracy = () => {
    if (points.length === 0) return 0;
    const correct = points.filter(p => {
      const prediction = sigmoid(coef * p.x + intercept) > 0.5 ? 1 : 0;
      return prediction === p.class;
    }).length;
    return (correct / points.length * 100).toFixed(0);
  };

  useEffect(() => {
    setAccuracy(calculateAccuracy());
  }, [points, coef, intercept]);

  const handleCanvasClick = (e) => {
    const canvas = e.chart.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = e.x - rect.left;
    const y = e.y - rect.top;
    
    const newPoint = {
      x: (x / canvas.width * 10).toFixed(1),
      y: (y / canvas.height * 10).toFixed(1),
      class: isClassA ? 0 : 1
    };
    
    setPoints([...points, newPoint]);
  };

  const chartData = {
    datasets: [
      {
        label: 'Class A',
        data: points.filter(p => p.class === 0),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        pointRadius: 8,
      },
      {
        label: 'Class B',
        data: points.filter(p => p.class === 1),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        pointRadius: 8,
      },
      {
        label: 'Decision Boundary',
        data: Array.from({ length: 100 }, (_, i) => ({
          x: i/10,
          y: (-intercept - coef * i/10) / 0.001 // Approximation for visualization
        })),
        type: 'line',
        borderColor: 'rgba(0, 200, 0, 0.8)',
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
        title: { display: true, text: 'Feature X' }
      },
      y: {
        type: 'linear',
        min: 0,
        max: 10,
        title: { display: true, text: 'Feature Y' }
      }
    },
    onClick: handleCanvasClick,
    maintainAspectRatio: false
  };

  const learningSteps = [
    {
      key: 1,
      title: '🎯 Understanding Classification',
      content: (
        <div className="space-y-4">
          <Alert message="Let's learn to separate groups!" type="info" showIcon />
          <div className="bg-blue-50 p-4 rounded-lg">
            <p><strong>What you'll learn:</strong></p>
            <ul className="list-disc pl-4">
              <li>How computers separate different groups</li>
              <li>The magic S-curve (sigmoid function)</li>
              <li>Making yes/no predictions</li>
            </ul>
          </div>
          <Button 
            type="primary" 
            onClick={() => setCurrentStep(2)}
            icon={<Lightbulb size={16} />}
          >
            Next: Collect Data →
          </Button>
        </div>
      )
    },
    {
      key: 2,
      title: '📌 Add Your Data Points',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p><strong>Click the graph to add points:</strong></p>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Class A (Click below line)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Class B (Click above line)</span>
            </div>
            <Switch
              checkedChildren="Class B"
              unCheckedChildren="Class A"
              checked={isClassA}
              onChange={() => setIsClassA(!isClassA)}
              className="mt-2"
            />
          </div>
          <Progress 
            percent={(points.length/8)*12.5} 
            format={() => `${points.length}/8 points`}
          />
          <div className="flex space-x-2">
            <Button onClick={() => setCurrentStep(1)}>Back</Button>
            <Button 
              type="primary" 
              onClick={() => setCurrentStep(3)}
              disabled={points.length < 4}
            >
              Next: Adjust Boundary →
            </Button>
          </div>
        </div>
      )
    },
    {
      key: 3,
      title: '🎚 Tune the Boundary',
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <Statistic
              title="Current Accuracy"
              value={`${accuracy}%`}
              valueStyle={{ color: accuracy > 75 ? '#52c41a' : '#ff4d4f' }}
            />
          </div>
          <div>
            <label className="block mb-2">
              <Zap className="inline mr-2" />
              Separation Power: {coef.toFixed(1)}
            </label>
            <Slider
              min={-5}
              max={5}
              step={0.1}
              value={coef}
              onChange={setCoef}
            />
          </div>
          <div>
            <label className="block mb-2">
              <TrendingUp className="inline mr-2" />
              Position Adjust: {intercept.toFixed(1)}
            </label>
            <Slider
              min={-10}
              max={10}
              step={0.1}
              value={intercept}
              onChange={setIntercept}
            />
          </div>
          <Button 
            type="primary" 
            onClick={() => setCurrentStep(4)}
            icon={<Rocket size={16} />}
          >
            Next: Auto-Tune →
          </Button>
        </div>
      )
    },
    {
      key: 4,
      title: '⚡ Auto-Tune Boundary',
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p>How it works:</p>
            <ol className="list-decimal pl-4">
              <li>Computer tries different boundaries</li>
              <li>Checks which works best</li>
              <li>Gradually improves guesses</li>
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Learning Speed</label>
              <Slider
                min={0.01}
                max={1}
                step={0.01}
                value={learningRate}
                onChange={setLearningRate}
              />
            </div>
            <div>
              <label>Attempts</label>
              <Slider
                min={10}
                max={200}
                step={10}
                value={iterations}
                onChange={setIterations}
              />
            </div>
          </div>
          <Button 
            type="primary" 
            block
            icon={<Rocket size={16} />}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Start Smart Learning!
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center space-x-3">
            <Divide className="text-blue-600" />
            <span>Group Master: Smart Classifier</span>
          </h1>
          <p className="text-gray-600">Learn how computers separate different groups!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200">
              <div className="h-96">
                <Scatter data={chartData} options={chartOptions} />
              </div>
              <div className="text-center mt-4">
                <Button 
                  icon={<Plus />}
                  onClick={() => {
                    const newPoints = Array.from({ length: 4 }, () => ({
                      x: (Math.random() * 10).toFixed(1),
                      y: (Math.random() * 10).toFixed(1),
                      class: Math.random() > 0.5 ? 1 : 0
                    }));
                    setPoints(newPoints);
                  }}
                >
                  Add Random Points
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Calculator className="mr-2" />
                Decision Boundary Formula
              </h3>
              <div className="text-xl font-mono bg-white p-3 rounded-lg">
                z = {coef.toFixed(1)}x + {intercept.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {learningSteps.find(s => s.key === currentStep).title}
                </h3>
                <div className="text-gray-500">Step {currentStep}/4</div>
              </div>
              {learningSteps.find(s => s.key === currentStep).content}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl">
                <Statistic
                  title="Total Points"
                  value={points.length}
                  prefix={<ClipboardList className="text-green-600" />}
                />
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <Statistic
                  title="Accuracy"
                  value={`${accuracy}%`}
                  prefix={<Sigma className="text-red-600" />}
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">Quick Tools</h4>
              <div className="flex space-x-2">
                <Tooltip title="Reset">
                  <Button 
                    icon={<RefreshCw />}
                    onClick={() => {
                      setPoints([]);
                      setCoef(1);
                      setIntercept(0);
                      setCurrentStep(1);
                    }}
                  />
                </Tooltip>
                <Button icon={<Code />}>
                  Show Prediction Code
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Progress 
            percent={(currentStep/4)*100} 
            showInfo={false}
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
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

export default LogisticRegressionSimulator;