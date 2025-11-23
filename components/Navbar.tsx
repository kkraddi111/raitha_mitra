import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';
import { Button } from './Button';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="bg-[#FADCD9] shadow-sm sticky top-0 z-50 border-b border-[#F8AFA6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white p-2 rounded-full shadow-sm text-[#E6694C] group-hover:bg-[#E6694C] group-hover:text-white transition-colors duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <span className="text-2xl font-bold text-[#E6694C]">Raitha Mitra</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center space-x-2 bg-white/50 py-1 px-3 rounded-full">
                  <div className="h-8 w-8 bg-[#E6694C] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#E6694C] leading-none">
                      {user.role === UserRole.ADMIN ? 'Administrator' : 'Farmer'}
                    </span>
                    <span className="text-sm font-medium text-[#333333] leading-none">
                      {user.username}
                    </span>
                  </div>
                </div>
                
                <Button variant="secondary" onClick={onLogout} className="!px-3 !py-1 text-sm flex items-center space-x-1">
                  <span>Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </Button>
              </>
            ) : (
              /* Public Navigation (Home/Login Toggle) */
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-[#FADCD9]">
                <Link 
                  to="/" 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/' 
                      ? 'bg-[#E6694C] text-white shadow-sm' 
                      : 'text-gray-500 hover:text-[#E6694C]'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/login" 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/login' 
                      ? 'bg-[#E6694C] text-white shadow-sm' 
                      : 'text-gray-500 hover:text-[#E6694C]'
                  }`}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};