import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#4C143B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-f8196ba00896?q=80&w=1920&auto=format&fit=crop" 
            alt="Agriculture background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4C143B]/90 to-[#E6694C]/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="animate-fadeIn">
             <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-[#F9F1F0] text-sm font-semibold mb-4 border border-white/30">
               Welcome to Raitha Mitra
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-slideUp">
            Empowering Farmers <br/>
            <span className="text-[#FDBAB2]">Building the Future</span>
          </h1>
          <p className="max-w-2xl text-xl text-gray-100 mb-10 animate-slideUp delay-200 leading-relaxed">
            Your one-stop digital companion for government schemes, expert agricultural advice, and AI-powered farming assistance in Kannada & English.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slideUp delay-300">
            <Button 
              onClick={() => navigate('/login')} 
              className="!px-8 !py-4 !text-lg shadow-xl hover:scale-105 transform transition-transform"
            >
              Login / Register
            </Button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-lg font-medium text-white border-2 border-white/30 hover:bg-white/10 transition-all hover:border-white"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#333333]">Why Choose Raitha Mitra?</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              We bridge the gap between technology and tradition to help you yield better results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-white border border-[#FADCD9] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FADCD9] rounded-2xl flex items-center justify-center text-[#E6694C] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-3">Government Schemes</h3>
              <p className="text-gray-600 leading-relaxed">
                Direct access to the latest state and central government subsidies. We simplify eligibility criteria and documentation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-white border border-[#FADCD9] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FADCD9] rounded-2xl flex items-center justify-center text-[#E6694C] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-3">AI Assistant</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat with our smart assistant in Kannada or English. Ask about crops, weather, or pests and get instant answers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-white border border-[#FADCD9] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
               <div className="w-14 h-14 bg-[#FADCD9] rounded-2xl flex items-center justify-center text-[#E6694C] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-3">Farmer Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Designed specifically for the farming community with an easy-to-use interface and local language support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-[#F9F1F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full">
            <div className="relative">
               <div className="absolute top-4 -left-4 w-full h-full bg-[#E6694C] rounded-2xl opacity-20"></div>
               <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000&auto=format&fit=crop" 
                alt="Farmer in field" 
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#333333] mb-6">Dedicated to Farmer's Prosperity</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At Raitha Mitra, we believe that technology should be accessible to everyone. Our platform bridges the gap between complex government procedures and the hard-working farmers who feed the nation.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Simplified Scheme Information
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Voice-Enabled AI Support
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Real-time Updates
              </li>
            </ul>
            <Button onClick={() => navigate('/login')}>Join Our Community</Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-12 mt-auto border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
               <div className="bg-white p-1.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E6694C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <span className="text-xl font-bold text-white">Raitha Mitra</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering farmers with information, technology, and community support.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#F79489]">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Login</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Register</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#F79489]">Contact Us</h4>
            <p className="text-gray-400 text-sm mb-2">Helpline: 1800-123-4567</p>
            <p className="text-gray-400 text-sm">Email: support@raithamitra.in</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Raitha Mitra. All rights reserved.
        </div>
      </footer>
    </div>
  );
};