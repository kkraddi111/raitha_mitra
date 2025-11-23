import React from 'react';
import { Scheme } from '../types';
import { IconButton } from './IconButton';

interface SchemeCardProps {
  scheme: Scheme;
  isAdmin?: boolean;
  onEdit?: (scheme: Scheme) => void;
  onDelete?: (id: string) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#FADCD9] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-3">
             <div className="bg-[#F9F1F0] p-2 rounded-lg text-[#E6694C] mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
             </div>
             <div>
               <h3 className="text-xl font-bold text-[#333333] leading-tight mb-1">{scheme.title}</h3>
               <p className="text-gray-500 text-xs">Last Updated: {new Date(scheme.lastUpdated).toLocaleDateString()}</p>
             </div>
          </div>
          
          {isAdmin && (
            <div className="flex space-x-1 flex-shrink-0">
               <IconButton onClick={() => onEdit?.(scheme)} title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </IconButton>
              <IconButton onClick={() => onDelete?.(scheme.id)} variant="danger" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </IconButton>
            </div>
          )}
        </div>
        
        <div className="mb-6">
           <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-1">Description</h4>
           <p className="text-gray-600 text-sm leading-relaxed">{scheme.description}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#F9F1F0] p-4 rounded-lg">
             <h5 className="font-semibold text-[#E6694C] text-sm flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Benefits
             </h5>
             <p className="text-[#333333] text-sm">{scheme.benefits}</p>
          </div>

          <div className="bg-[#F9F1F0] p-4 rounded-lg">
             <h5 className="font-semibold text-[#E6694C] text-sm flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Eligibility
             </h5>
             <p className="text-[#333333] text-sm">{scheme.eligibility}</p>
          </div>

          <div className="bg-white border border-[#FADCD9] p-4 rounded-lg">
             <h5 className="font-semibold text-[#E6694C] text-sm flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documents Needed
             </h5>
             <div className="text-[#333333] text-sm whitespace-pre-line">{scheme.documentsNeeded || 'Contact office for details.'}</div>
          </div>
        </div>
      </div>

      <div className="bg-[#FADCD9] p-4 mt-auto border-t border-[#F8AFA6]">
        <h5 className="font-bold text-[#E6694C] text-xs uppercase tracking-wider mb-2">Contact & Support</h5>
        <div className="space-y-2 text-sm">
          {scheme.contactDetails?.phone && (
            <div className="flex items-start text-gray-700">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 text-[#E6694C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
               <span>{scheme.contactDetails.phone}</span>
            </div>
          )}
           {scheme.contactDetails?.website && (
            <div className="flex items-start text-gray-700">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 text-[#E6694C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
               <a href={scheme.contactDetails.website} target="_blank" rel="noreferrer" className="hover:text-[#E6694C] underline break-all">
                 {scheme.contactDetails.website}
               </a>
            </div>
          )}
          {scheme.contactDetails?.office && (
            <div className="flex items-start text-gray-700">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 text-[#E6694C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
               <span>{scheme.contactDetails.office}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};