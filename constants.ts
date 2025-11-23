import { Scheme } from './types';

export const INITIAL_SCHEMES: Scheme[] = [
  {
    id: '1',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'A central sector scheme with 100% funding from Government of India. It aims to provide income support to all landholding farmer families across the country.',
    benefits: 'Financial benefit of Rs. 6000/- per year in three equal installments, directly into the bank accounts of farmers.',
    eligibility: 'All landholding farmer families having cultivable landholding in their names are eligible. Institutional landholders are not eligible.',
    documentsNeeded: '1. Aadhar Card\n2. Land Holding Documents (RTC/Pahani)\n3. Bank Account Passbook\n4. Mobile Number linked with Aadhar',
    contactDetails: {
      phone: '155261 / 011-24300606',
      office: 'Local Agriculture Department Office or Common Service Centers (CSC)',
      website: 'https://pmkisan.gov.in'
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Krishi Bhagya Scheme (Karnataka)',
    description: 'This scheme focuses on improving rain-fed agriculture through efficient rainwater conservation and water management techniques to ensure sustainable farming.',
    benefits: 'Subsidies for constructing farm ponds (Krishi Honda), polythene lining, diesel pump sets, and micro-irrigation systems (drip/sprinkler).',
    eligibility: 'Farmers located in the 5 major dry-land zones of Karnataka. Preference given to small and marginal farmers.',
    documentsNeeded: '1. Farmer ID (FID)\n2. Pahani (RTC)\n3. Caste Certificate (if applicable)\n4. Bank Account Details\n5. Aadhar Card',
    contactDetails: {
      phone: '080-22212269',
      office: 'Raitha Samparka Kendra (RSK) or Assistant Director of Agriculture Office',
      website: 'https://raitamitra.karnataka.gov.in'
    },
    lastUpdated: new Date().toISOString()
  }
];