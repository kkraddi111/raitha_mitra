export enum UserRole {
  FARMER = 'FARMER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  username: string;
  role: UserRole;
}

export interface ContactDetails {
  phone?: string;
  office?: string;
  website?: string;
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  benefits: string;
  eligibility: string;
  documentsNeeded: string;
  contactDetails: ContactDetails;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Declarations for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}