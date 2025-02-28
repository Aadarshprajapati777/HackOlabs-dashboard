import { useState, useEffect, useRef } from 'react';
import { Card, Input, Button, Spin } from 'antd';
import { MessageCircle, X, Send, Bot, GraduationCap } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const messagesEndRef = useRef(null);

  // Determine chatbot role based on the current page
  const getChatbotRole = (page) => {
    if (page === '/' || page === '') {
      return 'a versatile study assistant ready to help with any topic';
    } else if (page.toLowerCase().includes('ai') || page.toLowerCase().includes('ml')) {
      return 'an expert in AI/ML, providing deep insights and explanations on artificial intelligence and machine learning';
    } else if (page.toLowerCase().includes('web')) {
      return 'a seasoned web development instructor, offering guidance on modern web technologies and best practices';
    } else {
      return 'a knowledgeable study assistant';
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      // Set the current page to the URL pathname (e.g., "/" or "/ai-ml")
      const path = window.location.pathname;
      setCurrentPage(path);
      // Add initial welcome message if no messages exist
      if (messages.length === 0) {
        setMessages([{
          text: "Hello! I'm your study assistant. Ask me anything about this course or your current page.",
          isUser: false
        }]);
      }
    }
  }, [isChatOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateResponse = async (userInput) => {
    try {
      setIsLoading(true);
      // Determine the chatbot role based on the current page
      const role = getChatbotRole(currentPage);
      // Compose a detailed and context-aware prompt
      const context = `You are ${role}. The current page is "${currentPage}". The student asks: "${userInput}". Please provide a clear, concise, and informative response that is tailored to this context.`;
      
      const result = await model.generateContent(context);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I'm having trouble understanding. Could you rephrase that?";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate and add bot response
    const botResponse = await generateResponse(inputMessage);
    setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 ${
          isChatOpen ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
        }`}
        aria-label="Open chat"
      >
        <GraduationCap size={28} className="hover:animate-bounce" />
      </button>

      {/* Chat modal */}
      {isChatOpen && (
        <Card
          style={{
            width: 380,
            height: 560,
            position: 'fixed',
            bottom: '5rem',
            right: '1.5rem',
          }}
          className="shadow-2xl rounded-xl border-0"
          headStyle={{ borderBottom: 0, padding: '16px' }}
          title={
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 -mx-4 -mt-4 p-4 rounded-t-xl">
              <div className="flex items-center gap-3">
                <Bot className="text-white" size={24} />
                <span className="text-white text-lg font-bold">Study Assistant</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          }
        >
          <div className="flex flex-col h-full">
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {!message.isUser && (
                    <Bot className="text-gray-400 mt-2" size={20} />
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                      message.isUser
                        ? 'bg-blue-600 text-white ml-8'
                        : 'bg-gray-50 text-gray-800 shadow-sm border mr-8'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.isUser && (
                    <GraduationCap className="text-blue-600 mt-2" size={20} />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="flex gap-2 items-center">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onPressEnter={handleSendMessage}
                placeholder="Ask your study question..."
                className="flex-1 rounded-xl py-2 px-4 border-2 border-gray-200 focus:border-blue-500"
                disabled={isLoading}
              />
              <Button
                type="primary"
                onClick={handleSendMessage}
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spin className="text-white" />
                ) : (
                  <Send className="text-white" size={18} />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatBox;
