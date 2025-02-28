// import React from 'react';
// import { useState, useEffect, useRef } from 'react';
// import { Input, Spin } from 'antd';
// import { X, Send, Bot, GraduationCap, User } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { motion, AnimatePresence } from 'framer-motion';

// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// const ChatBox = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   // Determine chatbot role based on the current page
//   const getChatbotRole = (page) => {
//     if (page === '/' || page === '') {
//       return 'a versatile study assistant ready to help with any topic';
//     } else if (page.toLowerCase().includes('ai') || page.toLowerCase().includes('ml')) {
//       return 'an expert in AI/ML, providing deep insights and explanations on artificial intelligence and machine learning';
//     } else if (page.toLowerCase().includes('web')) {
//       return 'a seasoned web development instructor, offering guidance on modern web technologies and best practices';
//     } else {
//       return 'a knowledgeable study assistant';
//     }
//   };

//   useEffect(() => {
//     if (isChatOpen) {
//       // Set the current page to the URL pathname
//       const path = window.location.pathname;
//       setCurrentPage(path);
//       // Add initial welcome message if no messages exist
//       if (messages.length === 0) {
//         setIsTyping(true);
//         setTimeout(() => {
//           setMessages([{
//             text: "Hello! I'm your study assistant. Ask me anything about this course or your current page.",
//             isUser: false
//           }]);
//           setIsTyping(false);
//         }, 1000);
//       }
//       // Focus the input when chat opens
//       setTimeout(() => {
//         inputRef.current?.focus();
//       }, 300);
//     }
//   }, [isChatOpen, messages.length]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const generateResponse = async (userInput) => {
//     try {
//       setIsLoading(true);
//       // Determine the chatbot role based on the current page
//       const role = getChatbotRole(currentPage);
//       // Compose a detailed and context-aware prompt
//       const context = `You are ${role}. The current page is "${currentPage}". The student asks: "${userInput}". Please provide a clear, concise, and informative response that is tailored to this context.`;
      
//       const result = await model.generateContent(context);
//       const response = await result.response;
//       return response.text();
//     } catch (error) {
//       console.error("Error generating response:", error);
//       return "Sorry, I'm having trouble understanding. Could you rephrase that?";
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     // Add user message
//     const userMessage = { text: inputMessage, isUser: true };
//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');

//     // Show typing indicator
//     setIsTyping(true);
    
//     // Generate and add bot response
//     const botResponse = await generateResponse(inputMessage);
//     setIsTyping(false);
//     setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {/* Chat toggle button with animation */}
//       <AnimatePresence mode="wait">
//         {!isChatOpen && (
//           <motion.button
//             initial={{ scale: 0, rotate: -90 }}
//             animate={{ scale: 1, rotate: 0 }}
//             exit={{ scale: 0, rotate: 90 }}
//             transition={{ type: "spring", stiffness: 300, damping: 15 }}
//             onClick={() => setIsChatOpen(true)}
//             className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0088CC] text-white shadow-lg hover:shadow-xl transition-all duration-300"
//             style={{
//               boxShadow: "0 0 15px rgba(0, 136, 204, 0.5)"
//             }}
//             aria-label="Open chat"
//           >
//             <GraduationCap size={32} className="hover:animate-bounce" />
//           </motion.button>
//         )}
//       </AnimatePresence>

//       {/* Chat modal with animation */}
//       <AnimatePresence>
//         {isChatOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
//             style={{ boxShadow: "0 10px 30px rgba(0, 136, 204, 0.15)" }}
//           >
//             {/* Header */}
//             <div className="bg-[#0088CC] px-5 py-4 flex items-center justify-between relative overflow-hidden">
//               {/* Animated gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#0088CC]/20 to-[#0088CC] opacity-70"></div>
              
//               <div className="flex items-center gap-3 z-10">
//                 {/* Profile picture with shining animated border */}
//                 <div className="relative">
//                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center z-20 relative">
//                     <Bot className="text-[#0088CC]" size={28} />
//                   </div>
//                   {/* Animated shining border */}
//                   <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white via-[#0088CC] to-white z-10 animate-spin-slow opacity-80"></div>
//                 </div>
//                 <div>
//                   <h3 className="text-white text-lg font-bold">Study Assistant</h3>
//                   <div className="flex items-center text-white/80 text-xs">
//                     <span className="relative flex h-2 w-2">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                     </span>
//                     <span className="ml-2">Online</span>
//                   </div>
//                 </div>
//               </div>
              
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsChatOpen(false)}
//                 className="text-white hover:bg-white/10 rounded-full p-2 z-10 transition-colors"
//                 aria-label="Close chat"
//               >
//                 <X size={20} />
//               </motion.button>
//             </div>

//             {/* Messages container */}
//             <div className="flex flex-col h-[calc(100%-138px)] overflow-y-auto px-4 py-4 bg-gray-50">
//               <AnimatePresence initial={false}>
//                 {messages.map((message, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4`}
//                   >
//                     {!message.isUser && (
//                       <div className="min-w-8 h-8 rounded-full bg-[#0088CC] flex items-center justify-center mr-2 mt-1 shadow-md">
//                         <Bot className="text-white" size={16} />
//                       </div>
//                     )}
//                     <div
//                       className={`max-w-[75%] rounded-2xl p-3 ${
//                         message.isUser
//                           ? "bg-[#0088CC] text-white"
//                           : "bg-white text-gray-800 shadow-md border border-gray-100"
//                       }`}
//                     >
//                       <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
//                       <div className="text-[10px] opacity-70 text-right mt-1">
//                         {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                     {message.isUser && (
//                       <div className="min-w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 mt-1 shadow-sm">
//                         <User className="text-[#0088CC]" size={16} />
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
                
//                 {/* Typing indicator */}
//                 {isTyping && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-start mb-4"
//                   >
//                     <div className="min-w-8 h-8 rounded-full bg-[#0088CC] flex items-center justify-center mr-2 shadow-md">
//                       <Bot className="text-white" size={16} />
//                     </div>
//                     <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
//                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
//                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input area */}
//             <div className="bg-white border-t border-gray-100 px-4 py-3">
//               <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 focus-within:border-[#0088CC] focus-within:shadow-md transition-all px-4 py-2">
//                 <Input
//                   ref={inputRef}
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onPressEnter={handleSendMessage}
//                   placeholder="Ask your study question..."
//                   className="flex-1 border-0 bg-transparent focus:shadow-none"
//                   disabled={isLoading}
//                   suffix={null}
//                   bordered={false}
//                 />
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={handleSendMessage}
//                   className="flex items-center justify-center h-10 w-10 rounded-full bg-[#0088CC] text-white"
//                   disabled={isLoading || !inputMessage.trim()}
//                 >
//                   {isLoading ? (
//                     <Spin className="text-white" size="small" />
//                   ) : (
//                     <Send size={18} />
//                   )}
//                 </motion.button>
//               </div>
//               <div className="text-center text-xs text-gray-400 mt-2">
//                 Powered by Gemini Pro
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Add the necessary CSS for the spinning animation */}
//       <style jsx global>{`
//         @keyframes spin-slow {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 3s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatBox;
// import { useState, useEffect, useRef } from 'react';
// import { Input, Spin } from 'antd';
// import { X, Send, Bot, GraduationCap, User } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { motion, AnimatePresence } from 'framer-motion';

// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// const ChatBox = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   // Determine chatbot role based on the current page
//   const getChatbotRole = (page) => {
//     if (page === '/' || page === '') {
//       return 'a versatile study assistant ready to help with any topic';
//     } else if (page.toLowerCase().includes('ai') || page.toLowerCase().includes('ml')) {
//       return 'an expert in AI/ML, providing deep insights and explanations on artificial intelligence and machine learning';
//     } else if (page.toLowerCase().includes('web')) {
//       return 'a seasoned web development instructor, offering guidance on modern web technologies and best practices';
//     } else {
//       return 'a knowledgeable study assistant';
//     }
//   };

//   useEffect(() => {
//     if (isChatOpen) {
//       // Set the current page to the URL pathname
//       const path = window.location.pathname;
//       setCurrentPage(path);
//       // Add initial welcome message if no messages exist
//       if (messages.length === 0) {
//         setIsTyping(true);
//         setTimeout(() => {
//           setMessages([{
//             text: "Hello! I'm your study assistant. Ask me anything about this course or your current page.",
//             isUser: false
//           }]);
//           setIsTyping(false);
//         }, 1000);
//       }
//       // Focus the input when chat opens
//       setTimeout(() => {
//         inputRef.current?.focus();
//       }, 300);
//     }
//   }, [isChatOpen, messages.length]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const generateResponse = async (userInput) => {
//     try {
//       setIsLoading(true);
//       // Determine the chatbot role based on the current page
//       const role = getChatbotRole(currentPage);
//       // Compose a detailed and context-aware prompt
//       const context = `You are ${role}. The current page is "${currentPage}". The student asks: "${userInput}". Please provide a clear, concise, and informative response that is tailored to this context.`;
      
//       const result = await model.generateContent(context);
//       const response = await result.response;
//       return response.text();
//     } catch (error) {
//       console.error("Error generating response:", error);
//       return "Sorry, I'm having trouble understanding. Could you rephrase that?";
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     // Add user message
//     const userMessage = { text: inputMessage, isUser: true };
//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');

//     // Show typing indicator
//     setIsTyping(true);
    
//     // Generate and add bot response
//     const botResponse = await generateResponse(inputMessage);
//     setIsTyping(false);
//     setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {/* Chat toggle button with animation */}
//       <AnimatePresence mode="wait">
//         {!isChatOpen && (
//           <motion.button
//             initial={{ scale: 0, rotate: -90 }}
//             animate={{ scale: 1, rotate: 0 }}
//             exit={{ scale: 0, rotate: 90 }}
//             transition={{ type: "spring", stiffness: 300, damping: 15 }}
//             onClick={() => setIsChatOpen(true)}
//             className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0088CC] text-white shadow-lg hover:shadow-xl transition-all duration-300"
//             style={{
//               boxShadow: "0 0 15px rgba(0, 136, 204, 0.5)"
//             }}
//             aria-label="Open chat"
//           >
//             <GraduationCap size={32} className="hover:animate-bounce" />
//           </motion.button>
//         )}
//       </AnimatePresence>

//       {/* Chat modal with animation */}
//       <AnimatePresence>
//         {isChatOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
//             style={{ boxShadow: "0 10px 30px rgba(0, 136, 204, 0.15)" }}
//           >
//             {/* Header */}
//             <div className="bg-[#0088CC] px-5 py-4 flex items-center justify-between relative overflow-hidden">
//               {/* Animated gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#0088CC]/20 to-[#0088CC] opacity-70"></div>
              
//               <div className="flex items-center gap-3 z-10">
//                 {/* Profile picture with shining animated border */}
//                 <div className="relative">
//                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center z-20 relative">
//                     <Bot className="text-[#0088CC]" size={28} />
//                   </div>
//                   {/* Animated shining border */}
//                   <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white via-[#0088CC] to-white z-10 animate-spin-slow opacity-80"></div>
//                 </div>
//                 <div>
//                   <h3 className="text-white text-lg font-bold">Study Assistant</h3>
//                   <div className="flex items-center text-white/80 text-xs">
//                     <span className="relative flex h-2 w-2">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                     </span>
//                     <span className="ml-2">Online</span>
//                   </div>
//                 </div>
//               </div>
              
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsChatOpen(false)}
//                 className="text-white hover:bg-white/10 rounded-full p-2 z-10 transition-colors"
//                 aria-label="Close chat"
//               >
//                 <X size={20} />
//               </motion.button>
//             </div>

//             {/* Messages container */}
//             <div className="flex flex-col h-[calc(100%-138px)] overflow-y-auto px-4 py-4 bg-gray-50">
//               <AnimatePresence initial={false}>
//                 {messages.map((message, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4`}
//                   >
//                     {!message.isUser && (
//                       <div className="min-w-8 h-8 rounded-full bg-[#0088CC] flex items-center justify-center mr-2 mt-1 shadow-md">
//                         <Bot className="text-white" size={16} />
//                       </div>
//                     )}
//                     <div
//                       className={`max-w-[75%] rounded-2xl p-3 ${
//                         message.isUser
//                           ? "bg-[#0088CC] text-white"
//                           : "bg-white text-gray-800 shadow-md border border-gray-100"
//                       }`}
//                     >
//                       <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
//                       <div className="text-[10px] opacity-70 text-right mt-1">
//                         {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                     {message.isUser && (
//                       <div className="min-w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 mt-1 shadow-sm">
//                         <User className="text-[#0088CC]" size={16} />
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
                
//                 {/* Typing indicator */}
//                 {isTyping && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-start mb-4"
//                   >
//                     <div className="min-w-8 h-8 rounded-full bg-[#0088CC] flex items-center justify-center mr-2 shadow-md">
//                       <Bot className="text-white" size={16} />
//                     </div>
//                     <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
//                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
//                         <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input area */}
//             <div className="bg-white border-t border-gray-100 px-4 py-3">
//               <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 focus-within:border-[#0088CC] focus-within:shadow-md transition-all px-4 py-2">
//                 <Input
//                   ref={inputRef}
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onPressEnter={handleSendMessage}
//                   placeholder="Ask your study question..."
//                   className="flex-1 border-0 bg-transparent focus:shadow-none"
//                   disabled={isLoading}
//                   suffix={null}
//                   bordered={false}
//                 />
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={handleSendMessage}
//                   className="flex items-center justify-center h-10 w-10 rounded-full bg-[#0088CC] text-white"
//                   disabled={isLoading || !inputMessage.trim()}
//                 >
//                   {isLoading ? (
//                     <Spin className="text-white" size="small" />
//                   ) : (
//                     <Send size={18} />
//                   )}
//                 </motion.button>
//               </div>
//               <div className="text-center text-xs text-gray-400 mt-2">
//                 Powered by Gemini Pro
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Add the necessary CSS for the spinning animation */}
//       <style jsx global>{`
//         @keyframes spin-slow {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 3s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatBox;

import { useState, useEffect, useRef } from 'react';
import { Input, Spin } from 'antd';
import { X, Send, Bot, GraduationCap, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
      // Set the current page to the URL pathname
      const path = window.location.pathname;
      setCurrentPage(path);
      // Add initial welcome message if no messages exist
      if (messages.length === 0) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([{
            text: "Hello! I'm your study assistant. Ask me anything about this course or your current page.",
            isUser: false
          }]);
          setIsTyping(false);
        }, 1000);
      }
      // Focus the input when chat opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  }, [isChatOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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

    // Show typing indicator
    setIsTyping(true);
    
    // Generate and add bot response
    const botResponse = await generateResponse(inputMessage);
    setIsTyping(false);
    setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Chat toggle button with animation */}
      <AnimatePresence mode="wait">
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => setIsChatOpen(true)}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0088CC] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              boxShadow: "0 0 15px rgba(0, 136, 204, 0.5)",
              position: 'absolute',
              right: '0',
              bottom: '0'
            }}
            aria-label="Open chat"
          >
            <GraduationCap size={32} className="hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat modal with animation */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            style={{ 
              boxShadow: "0 10px 30px rgba(0, 136, 204, 0.15)",
              position: 'absolute',
              right: '0',
              bottom: '70px',
              width: '380px',
              height: '600px'
            }}
          >
            {/* Header */}
            <div className="bg-[#0088CC] px-5 py-4 flex items-center justify-between relative overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0088CC]/20 to-[#0088CC] opacity-70"></div>
              
              <div className="flex items-center gap-3 z-10">
                {/* Profile picture with shining animated border */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center z-20 relative">
                    {/* <Bot className="text-[#0088CC]" size={28} /> */}
                      <img 
                              src="/assets/prit_ai.png" 
                              alt="Bot Icon" 
                              className="w-12 h-12" 
                     />

                    
                  </div>
                  {/* Animated shining border */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white via-[#0088CC] to-white z-10 animate-spin-slow opacity-80"></div>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Study Assistant</h3>
                  <div className="flex items-center text-white/80 text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="ml-2">Online</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/10 rounded-full p-2 z-10 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages container */}
            <div className="flex flex-col h-[calc(100%-138px)] overflow-y-auto px-4 py-4 bg-gray-50" style={{ height: 'calc(100% - 138px)' }}>
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4`}
                  >
                    {!message.isUser && (
                      <div className="min-w-8 h-8 rounded-full bg-[#0088CC] flex items-center justify-center mr-2 mt-1 shadow-md">
                        <Bot className="text-white" size={16} />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 ${
                        message.isUser
                          ? "bg-[#0088CC] text-white"
                          : "bg-white text-gray-800 shadow-md border border-gray-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <div className="text-[10px] opacity-70 text-right mt-1">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.isUser && (
                      <div className="min-w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 mt-1 shadow-sm">
                        <User className="text-[#0088CC]" size={16} />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start mb-4"
                  >
                    <div className="min-w-8 h-8 rounded-full bg-[#0088CC] flex items-center justify-center mr-2 shadow-md">
                      <Bot className="text-white" size={16} />
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="bg-white border-t border-gray-100 px-4 py-3" style={{ position: 'absolute', bottom: '0', width: '100%' }}>
              <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-200 focus-within:border-[#0088CC] focus-within:shadow-md transition-all px-4 py-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  placeholder="Ask your study question..."
                  className="flex-1 border-0 bg-transparent focus:shadow-none"
                  disabled={isLoading}
                  suffix={null}
                  bordered={false}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-[#0088CC] text-white"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  {isLoading ? (
                    <Spin className="text-white" size="small" />
                  ) : (
                    <Send size={18} />
                  )}
                </motion.button>
              </div>
              <div className="text-center text-xs text-gray-400 mt-2">
                Powered by Gemini Pro
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add the necessary CSS for the spinning animation */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatBox;