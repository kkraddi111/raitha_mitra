import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { GeminiService } from '../services/geminiService';
import { Button } from './Button';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: 'Namaskara! I am Raitha Mitra. You can ask me about farming or schemes in Kannada or English.',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null); // Stores ID of message being spoken
  const [language, setLanguage] = useState<'en-US' | 'kn-IN'>('en-US');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await GeminiService.sendMessage(messages, userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Browser does not support voice input. Please use Chrome.");
      return;
    }

    // Stop speaking if currently speaking
    window.speechSynthesis.cancel();
    setIsSpeaking(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.onerror = (event: any) => {
      // 'no-speech' just means silence was detected, clean exit without error log
      if (event.error === 'no-speech') {
        setIsListening(false);
        return;
      }
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Recognition start failed", e);
      setIsListening(false);
    }
  };

  const speakText = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      // If currently speaking this message, stop it
      if (isSpeaking === id) {
        window.speechSynthesis.cancel();
        setIsSpeaking(null);
        return;
      }

      // Stop any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt to detect Kannada characters to switch voice/lang
      const hasKannada = /[\u0C80-\u0CFF]/.test(text);
      utterance.lang = hasKannada ? 'kn-IN' : 'en-US';
      
      utterance.onend = () => {
        setIsSpeaking(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(null);
      };

      setIsSpeaking(id);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-[#FADCD9] overflow-hidden">
      {/* Header */}
      <div className="bg-[#FADCD9] p-4 flex justify-between items-center border-b border-[#F9F1F0]">
        <h3 className="font-bold text-[#E6694C] flex items-center">
          <span className="bg-white p-1.5 rounded-full mr-2 shadow-sm text-[#E6694C]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </span>
          AI Sahayaka (Assistant)
        </h3>
        <div className="flex items-center space-x-2 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-white border border-[#E6694C] text-[#E6694C] rounded px-2 py-1 focus:outline-none text-xs font-medium cursor-pointer"
          >
            <option value="en-US">English</option>
            <option value="kn-IN">Kannada</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9F1F0]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm relative group ${
                msg.role === 'user'
                  ? 'bg-[#E6694C] text-white rounded-br-none'
                  : 'bg-white text-[#333333] border border-[#FADCD9] rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.text}</p>
              
              {msg.role === 'model' && (
                <button 
                  onClick={() => speakText(msg.text, msg.id)}
                  className={`mt-2 p-1.5 rounded-full transition-colors ${
                    isSpeaking === msg.id 
                      ? 'bg-[#FADCD9] text-[#E6694C]' 
                      : 'text-gray-400 hover:text-[#E6694C] hover:bg-[#F9F1F0]'
                  }`}
                  title={isSpeaking === msg.id ? "Stop reading" : "Read aloud"}
                >
                  {isSpeaking === msg.id ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#FADCD9] p-4 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#E6694C] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#E6694C] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#E6694C] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#FADCD9]">
        <div className="flex items-center gap-3">
          <button
            onClick={startListening}
            className={`p-3 rounded-full transition-all duration-300 ${
              isListening 
                ? 'bg-red-50 text-red-500 animate-pulse shadow-inner ring-2 ring-red-200' 
                : 'bg-[#F9F1F0] text-[#E6694C] hover:bg-[#FADCD9] hover:text-[#DA746F]'
            }`}
            title="Voice Input"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'kn-IN' ? "ಇಲ್ಲಿ ಬರೆಯಿರಿ..." : "Type your query..."}
              className="w-full pl-4 pr-4 py-3 border border-[#FADCD9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#E6694C] focus:border-transparent bg-[#F9F1F0] focus:bg-white transition-colors"
            />
          </div>
          
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !inputText.trim()} 
            className="!rounded-full !w-12 !h-12 !p-0 flex items-center justify-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90 translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
