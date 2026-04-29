export interface InvestmentRoute {
  name: string;
  amount: number;
  label?: string;
  icon?: string;
}

export interface CostBreakdown {
  // Investment routes (mutually exclusive options)
  investmentRoutes?: InvestmentRoute[];
  
  // Legacy fields (for backward compatibility)
  donationAmount?: number;
  realEstateMin?: number;
  
  // Mandatory fees (apply to all routes)
  dueDiligence: number;
  processingFees: number;
  passportFee: number;
  
  // Shared fees that apply to all routes (legal fees, govt admin, etc.)
  sharedFees?: { name: string; amount: number }[];
  
  // Legacy - kept for backwards compatibility but NOT added to totals
  otherFees?: { name: string; amount: number }[];
}

export interface EligibilityRequirement {
  age: string;
  character: string;
  health: string;
  fundsProof: string;
}

export interface DocumentCategory {
  category: string;
  documents: string[];
}

export interface VisaFreeRegion {
  region: string;
  countries: { name: string; type: 'VF' | 'VoA' | 'eTA' }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TimelineStep {
  step: number;
  title: string;
  duration: string;
  description: string;
}

export interface Program {
  id: string;
  country: string;
  region: 'caribbean' | 'europe' | 'middle-east' | 'pacific' | 'americas' | 'africa' | 'asia';
  flag: string;
  minInvestment: number;
  investmentType: string;
  processingTime: string;
  visaFreeCountries: number;
  familyInclusion: boolean;
  dualCitizenship: boolean;
  physicalPresence: string;
  highlights: string[];
  description: string;
  programType: 'citizenship' | 'residency';
  image: string;
  isCryptoFriendly?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  comingSoon?: boolean;
  // Extended detailed fields
  tagline?: string;
  timezone?: string;
  language?: string;
  currency?: string;
  population?: string;
  passportValidity?: string;
  aboutCountry?: string;
  legalFramework?: string;
  keyBenefits?: { title: string; description: string; icon: string }[];
  costBreakdown?: CostBreakdown;
  eligibility?: EligibilityRequirement;
  requiredDocuments?: DocumentCategory[];
  visaFreeByRegion?: VisaFreeRegion[];
  faqs?: FAQ[];
  timeline?: TimelineStep[];
}

export const programs: Program[] = [
  // Caribbean
  {
    id: 'dominica',
    country: 'Dominica',
    region: 'caribbean',
    flag: '🇩🇲',
    minInvestment: 100000,
    investmentType: 'Donation or Real Estate',
    processingTime: '3-4 months',
    visaFreeCountries: 144,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Most affordable', 'Fast processing', 'No visit required'],
    description: 'One of the most established and affordable CBI programs in the world.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1589982158636-64ef041959d6?w=800&q=80',
    isPopular: true,
    tagline: 'The Nature Island - Most affordable Caribbean citizenship',
    timezone: 'UTC-4 (AST)',
    language: 'English',
    currency: 'East Caribbean Dollar (XCD)',
    population: '72,000',
    passportValidity: '10 years',
    aboutCountry: 'Dominica, known as the "Nature Island," is a lush Caribbean paradise with pristine rainforests, hot springs, and the famous Boiling Lake. The country offers one of the most established and respected citizenship by investment programs, launched in 1993.',
    legalFramework: 'Citizenship by Investment Act of 1993, amended 2014',
    keyBenefits: [
      { title: 'Most Affordable', description: 'Lowest investment threshold in the Caribbean at $100,000', icon: 'DollarSign' },
      { title: 'Fast Processing', description: 'Citizenship granted in 3-4 months with no interview required', icon: 'Zap' },
      { title: 'Global Mobility', description: 'Visa-free access to 144+ countries including UK, EU Schengen, Singapore', icon: 'Globe' },
    ],
    costBreakdown: {
      donationAmount: 100000,
      dueDiligence: 7500,
      processingFees: 1000,
      passportFee: 1000,
      otherFees: [
        { name: 'Certificate of Naturalization', amount: 550 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record with no convictions',
      health: 'Good health status (medical certificate required)',
      fundsProof: 'Legitimate source of funds documentation',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (certified copy)', 'Birth certificate', 'Passport-sized photos (6)', 'National ID card'],
      },
      {
        category: 'Background Check',
        documents: ['Police clearance certificate', 'Military records (if applicable)', 'Professional reference letters (2)'],
      },
      {
        category: 'Financial Documents',
        documents: ['Bank reference letter', 'Bank statements (12 months)', 'Source of funds declaration', 'Proof of address'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'France', type: 'VF' }, { name: 'Germany', type: 'VF' },
          { name: 'Spain', type: 'VF' }, { name: 'Italy', type: 'VF' }, { name: 'Switzerland', type: 'VF' },
          { name: 'Netherlands', type: 'VF' }, { name: 'Austria', type: 'VF' }, { name: 'Ireland', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Singapore', type: 'VF' }, { name: 'Hong Kong', type: 'VF' }, { name: 'Malaysia', type: 'VF' },
          { name: 'South Korea', type: 'VF' }, { name: 'Philippines', type: 'VF' }, { name: 'Indonesia', type: 'VoA' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' },
          { name: 'Colombia', type: 'VF' }, { name: 'Costa Rica', type: 'VF' }, { name: 'Panama', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'Review eligibility and program options' },
      { step: 2, title: 'Document Collection', duration: '2-4 weeks', description: 'Gather and prepare required documents' },
      { step: 3, title: 'Application Submission', duration: '1-2 weeks', description: 'Submit application with fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence', duration: '6-8 weeks', description: 'Government background verification' },
      { step: 5, title: 'Approval & Investment', duration: '2-4 weeks', description: 'Receive approval and complete investment' },
      { step: 6, title: 'Citizenship Granted', duration: '1-2 weeks', description: 'Receive certificate and passport' },
    ],
    faqs: [
      { question: 'Do I need to visit Dominica to apply?', answer: 'No, the entire application process can be completed remotely. There is no requirement to visit or reside in Dominica before, during, or after obtaining citizenship.' },
      { question: 'Can I include my family in the application?', answer: 'Yes, you can include your spouse, dependent children under 30, parents/grandparents over 65, and siblings aged 18-25 who are unmarried and financially dependent.' },
      { question: 'Is dual citizenship allowed?', answer: 'Yes, Dominica fully recognizes dual citizenship. You are not required to renounce your current citizenship.' },
      { question: 'How long is the passport valid?', answer: 'The Dominican passport is valid for 10 years and can be renewed from anywhere in the world.' },
    ],
  },
  {
    id: 'st-kitts',
    country: 'St. Kitts & Nevis',
    region: 'caribbean',
    flag: '🇰🇳',
    minInvestment: 250000,
    investmentType: 'Donation or Real Estate',
    processingTime: '4-6 months',
    visaFreeCountries: 156,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Oldest CBI program', 'Premium passport', 'Strong reputation'],
    description: 'The pioneer of citizenship by investment, established in 1984.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&q=80',
    isPopular: true,
    tagline: 'The Pioneer - World\'s oldest citizenship by investment program',
    timezone: 'UTC-4 (AST)',
    language: 'English',
    currency: 'East Caribbean Dollar (XCD)',
    population: '53,000',
    passportValidity: '10 years',
    aboutCountry: 'St. Kitts and Nevis, a dual-island nation in the Caribbean, pioneered the citizenship by investment industry in 1984. Known for its pristine beaches, volcanic landscapes, and historic sugar plantations, the federation offers the world\'s most established and respected CBI program with an impeccable 40-year track record.',
    legalFramework: 'Citizenship Act 1984, Section 3(5)',
    keyBenefits: [
      { title: 'Pioneer Program', description: 'World\'s oldest and most reputable CBI program with 40 years of proven success', icon: 'Award' },
      { title: 'Premium Passport', description: 'Access to 156 countries including UK, EU Schengen, Singapore, and Hong Kong', icon: 'Globe' },
      { title: 'Tax Advantages', description: 'No personal income tax, capital gains tax, or inheritance tax', icon: 'TrendingUp' },
    ],
    costBreakdown: {
      donationAmount: 250000,
      realEstateMin: 400000,
      dueDiligence: 7500,
      processingFees: 1500,
      passportFee: 350,
      otherFees: [
        { name: 'Government Fee', amount: 35050 },
        { name: 'Spouse Fee', amount: 25000 },
        { name: 'Per Dependent', amount: 15000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'No criminal record, no prior visa denials to countries with CBI treaties',
      health: 'Good health with no communicable diseases (medical exam required)',
      fundsProof: 'Verifiable legal source of investment funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (all pages)', 'Birth certificate (apostilled)', 'Passport photos (8)', 'Marriage certificate (if applicable)', 'National ID card'],
      },
      {
        category: 'Background Verification',
        documents: ['Police clearance certificate', 'Military records (if applicable)', 'Professional reference letters (3)', 'Personal reference letters (2)'],
      },
      {
        category: 'Financial Documentation',
        documents: ['Bank reference letter', 'Bank statements (12 months)', 'Source of funds declaration', 'Proof of address (utility bills)', 'Tax clearance certificate'],
      },
      {
        category: 'Professional & Business',
        documents: ['CV/Resume', 'Educational certificates', 'Employment verification', 'Business ownership documents (if applicable)'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' }, { name: 'France', type: 'VF' },
          { name: 'Germany', type: 'VF' }, { name: 'Spain', type: 'VF' }, { name: 'Italy', type: 'VF' },
          { name: 'Switzerland', type: 'VF' }, { name: 'Netherlands', type: 'VF' }, { name: 'Austria', type: 'VF' },
          { name: 'Portugal', type: 'VF' }, { name: 'Greece', type: 'VF' }, { name: 'Sweden', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Singapore', type: 'VF' }, { name: 'Hong Kong', type: 'VF' }, { name: 'Malaysia', type: 'VF' },
          { name: 'South Korea', type: 'VF' }, { name: 'Taiwan', type: 'VF' }, { name: 'Philippines', type: 'VF' },
          { name: 'Indonesia', type: 'VoA' }, { name: 'Thailand', type: 'VoA' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' },
          { name: 'Colombia', type: 'VF' }, { name: 'Costa Rica', type: 'VF' }, { name: 'Panama', type: 'VF' },
          { name: 'Mexico', type: 'VF' }, { name: 'Peru', type: 'VF' },
        ],
      },
      {
        region: 'Oceania',
        countries: [
          { name: 'Fiji', type: 'VF' }, { name: 'Vanuatu', type: 'VF' }, { name: 'Samoa', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'Assess eligibility and choose investment option' },
      { step: 2, title: 'Document Collection', duration: '3-4 weeks', description: 'Gather and authenticate all required documents' },
      { step: 3, title: 'Application Submission', duration: '1-2 weeks', description: 'Submit application with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence Review', duration: '8-12 weeks', description: 'Comprehensive government background checks' },
      { step: 5, title: 'Approval & Investment', duration: '2-4 weeks', description: 'Complete donation or real estate purchase upon approval' },
      { step: 6, title: 'Citizenship Granted', duration: '2-3 weeks', description: 'Receive citizenship certificate and passport' },
    ],
    faqs: [
      { question: 'Why choose St. Kitts & Nevis over other programs?', answer: 'St. Kitts & Nevis offers the world\'s oldest and most reputable CBI program with a 40-year track record. The premium passport provides access to 156 countries, and the program enjoys strong international recognition.' },
      { question: 'What is the difference between donation and real estate options?', answer: 'The donation option requires $250,000 and is non-refundable. The real estate option requires $400,000+ investment which can be sold after 7 years, potentially recovering most of your investment.' },
      { question: 'Can I include my family members?', answer: 'Yes, you can include your spouse, dependent children under 30, parents over 55, and unmarried siblings under 30. Additional government fees apply per dependent.' },
      { question: 'Is there a physical presence requirement?', answer: 'No, there is no requirement to visit, reside in, or physically appear in St. Kitts & Nevis at any stage of the application or after receiving citizenship.' },
      { question: 'How long does the passport remain valid?', answer: 'The St. Kitts & Nevis passport is valid for 10 years and can be renewed from any St. Kitts & Nevis embassy or consulate worldwide.' },
    ],
  },
  {
    id: 'grenada',
    country: 'Grenada',
    region: 'caribbean',
    flag: '🇬🇩',
    minInvestment: 150000,
    investmentType: 'Donation or Real Estate',
    processingTime: '4-6 months',
    visaFreeCountries: 147,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['E-2 Treaty with USA', 'China visa-free', 'Includes siblings'],
    description: 'Only Caribbean CBI with access to USA E-2 investor visa treaty.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1580193483760-13c92f95c00e?w=800&q=80',
    tagline: 'Gateway to USA - The only Caribbean CBI with E-2 Treaty access',
    timezone: 'UTC-4 (AST)',
    language: 'English',
    currency: 'East Caribbean Dollar (XCD)',
    population: '113,000',
    passportValidity: '5 years',
    aboutCountry: 'Grenada, known as the "Spice Island," is famous for its nutmeg production and stunning beaches. Most importantly, Grenada is the only Caribbean CBI country with a treaty with the United States that allows citizens to apply for E-2 investor visas, providing a legitimate pathway to live and work in the USA.',
    legalFramework: 'Grenada Citizenship by Investment Act 2013',
    keyBenefits: [
      { title: 'USA E-2 Treaty', description: 'Only Caribbean CBI with access to US E-2 investor visa for living and working in America', icon: 'Flag' },
      { title: 'China Visa-Free', description: 'One of few Caribbean passports offering visa-free travel to China', icon: 'Globe' },
      { title: 'Family Inclusive', description: 'Include siblings aged 18-30 and extended family members in your application', icon: 'Users' },
    ],
    costBreakdown: {
      donationAmount: 150000,
      realEstateMin: 350000,
      dueDiligence: 5000,
      processingFees: 1500,
      passportFee: 500,
      otherFees: [
        { name: 'Government Processing', amount: 1500 },
        { name: 'Spouse Fee (donation)', amount: 50000 },
        { name: 'Per Child Under 18', amount: 25000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record, no visa denials, good character references',
      health: 'Medical certificate confirming good health',
      fundsProof: 'Documentary evidence of legitimate source of funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (certified copies)', 'Birth certificate (apostilled)', 'Passport photos (10)', 'National ID card', 'Marriage certificate'],
      },
      {
        category: 'Background Check',
        documents: ['Police clearance from all countries of residence', 'Military service records', 'Professional references (2)', 'Personal character references (2)'],
      },
      {
        category: 'Financial Documents',
        documents: ['Bank reference letter', 'Bank statements (12 months)', 'Source of funds declaration', 'Proof of address', 'Tax returns (2 years)'],
      },
      {
        category: 'Dependents Documentation',
        documents: ['Birth certificates of dependents', 'School enrollment letters', 'Proof of financial dependency', 'Medical certificates'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' }, { name: 'France', type: 'VF' },
          { name: 'Germany', type: 'VF' }, { name: 'Spain', type: 'VF' }, { name: 'Italy', type: 'VF' },
          { name: 'Switzerland', type: 'VF' }, { name: 'Russia', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'China', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'Hong Kong', type: 'VF' },
          { name: 'Malaysia', type: 'VF' }, { name: 'Philippines', type: 'VF' }, { name: 'Indonesia', type: 'VoA' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' },
          { name: 'Cuba', type: 'VF' }, { name: 'Colombia', type: 'VF' }, { name: 'Peru', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'E-2 visa strategy discussion and eligibility review' },
      { step: 2, title: 'Document Preparation', duration: '3-4 weeks', description: 'Collect and authenticate all required documents' },
      { step: 3, title: 'Application Submission', duration: '1-2 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence', duration: '8-12 weeks', description: 'Thorough government background verification' },
      { step: 5, title: 'Approval & Investment', duration: '2-4 weeks', description: 'Complete donation or real estate investment' },
      { step: 6, title: 'Citizenship Issued', duration: '2-3 weeks', description: 'Receive certificate and passport' },
    ],
    faqs: [
      { question: 'How does the E-2 Treaty with USA work?', answer: 'As a Grenadian citizen, you can apply for a US E-2 investor visa which allows you to live, work, and run a business in the United States. The E-2 visa is renewable indefinitely as long as your business operates.' },
      { question: 'Can I travel to China visa-free?', answer: 'Yes, Grenada is one of the few Caribbean countries offering visa-free access to China for up to 30 days, making it ideal for business travelers.' },
      { question: 'Can I include my siblings in the application?', answer: 'Yes, unmarried siblings aged 18-30 who are financially dependent can be included, making Grenada\'s program more family-inclusive than most Caribbean options.' },
      { question: 'What is the real estate investment option?', answer: 'You can invest $350,000+ in an approved real estate project. This investment can be sold after 5 years, potentially recovering a significant portion of your investment.' },
      { question: 'Is dual citizenship permitted?', answer: 'Yes, Grenada fully allows dual citizenship. Your current citizenship is not affected, and Grenada does not report new citizenships to other countries.' },
    ],
  },
  {
    id: 'antigua',
    country: 'Antigua & Barbuda',
    region: 'caribbean',
    flag: '🇦🇬',
    minInvestment: 100000,
    investmentType: 'Donation or Real Estate',
    processingTime: '3-4 months',
    visaFreeCountries: 151,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: '5 days in 5 years',
    highlights: ['Family-friendly pricing', 'University program', 'Fast track option'],
    description: 'Excellent value for families with competitive pricing structure.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80',
    tagline: 'Family Paradise - Best value for families',
    timezone: 'UTC-4 (AST)',
    language: 'English',
    currency: 'East Caribbean Dollar (XCD)',
    population: '98,000',
    passportValidity: '5 years',
    aboutCountry: 'Antigua and Barbuda, with its 365 beaches (one for each day of the year), is a premier Caribbean destination known for sailing and luxury resorts. The country offers one of the most family-friendly CBI programs with special pricing for families and a unique university funding option.',
    legalFramework: 'Antigua and Barbuda Citizenship by Investment Act 2013',
    keyBenefits: [
      { title: 'Family Discounts', description: 'Best family pricing in the Caribbean with $100K covering families up to 4 members', icon: 'Users' },
      { title: 'University Option', description: 'Unique $150K donation to University of West Indies includes tuition for one family member', icon: 'GraduationCap' },
      { title: 'Fast Processing', description: 'Citizenship granted in 3-4 months with optional accelerated processing available', icon: 'Zap' },
    ],
    costBreakdown: {
      donationAmount: 100000,
      realEstateMin: 300000,
      dueDiligence: 7500,
      processingFees: 3000,
      passportFee: 300,
      otherFees: [
        { name: 'Government Processing', amount: 5000 },
        { name: 'Family of 4 (donation)', amount: 100000 },
        { name: 'University Option', amount: 150000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'No criminal record, not subject to criminal investigation',
      health: 'No infectious diseases (medical exam required)',
      fundsProof: 'Legal source of investment funds verified',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (all pages certified)', 'Birth certificate (apostilled)', 'Passport photos (8)', 'National ID', 'Marriage/divorce certificates'],
      },
      {
        category: 'Background Verification',
        documents: ['Police clearance (all countries lived 6+ months)', 'Court records clearance', 'Reference letters (3)', 'Military records'],
      },
      {
        category: 'Financial Requirements',
        documents: ['Bank statement (12 months)', 'Bank reference letter', 'Source of wealth declaration', 'Tax clearance', 'Proof of address'],
      },
      {
        category: 'Family Documentation',
        documents: ['Spouse passport and documents', 'Children birth certificates', 'Proof of relationship', 'School enrollment letters'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' }, { name: 'France', type: 'VF' },
          { name: 'Germany', type: 'VF' }, { name: 'Spain', type: 'VF' }, { name: 'Italy', type: 'VF' },
          { name: 'Switzerland', type: 'VF' }, { name: 'Austria', type: 'VF' }, { name: 'Portugal', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Singapore', type: 'VF' }, { name: 'Hong Kong', type: 'VF' }, { name: 'Malaysia', type: 'VF' },
          { name: 'South Korea', type: 'VF' }, { name: 'Philippines', type: 'VF' }, { name: 'Indonesia', type: 'VoA' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' },
          { name: 'Mexico', type: 'VF' }, { name: 'Panama', type: 'VF' }, { name: 'Costa Rica', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'Discuss family needs and choose best investment option' },
      { step: 2, title: 'Document Collection', duration: '2-3 weeks', description: 'Gather documents for all family members' },
      { step: 3, title: 'Application Submission', duration: '1-2 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence', duration: '6-8 weeks', description: 'Government background verification' },
      { step: 5, title: 'Approval & Investment', duration: '2-3 weeks', description: 'Complete donation or real estate purchase' },
      { step: 6, title: 'Citizenship Granted', duration: '1-2 weeks', description: 'Receive citizenship and passports for family' },
    ],
    faqs: [
      { question: 'What makes Antigua & Barbuda good for families?', answer: 'The program offers the best family pricing in the Caribbean - $100,000 covers a family of up to 4 members. Larger families pay only $15,000 per additional dependent.' },
      { question: 'What is the University of West Indies option?', answer: 'A unique $150,000 donation that includes tuition at University of West Indies for one family member, combining citizenship with education benefits.' },
      { question: 'What is the residency requirement?', answer: 'Antigua requires just 5 days of physical presence over the first 5 years of citizenship - one of the most flexible requirements among CBI programs.' },
      { question: 'Can I work in other CARICOM countries?', answer: 'Yes, as an Antiguan citizen you have the right to live and work in any CARICOM member state under the free movement provisions.' },
      { question: 'How long is the passport valid?', answer: 'The Antiguan passport is valid for 5 years and can be renewed remotely through any Antiguan embassy or consulate.' },
    ],
  },
  {
    id: 'st-lucia',
    country: 'St. Lucia',
    region: 'caribbean',
    flag: '🇱🇨',
    minInvestment: 100000,
    investmentType: 'Donation or Real Estate',
    processingTime: '3-4 months',
    visaFreeCountries: 146,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Government bonds option', 'No interview', 'Lifetime citizenship'],
    description: 'Flexible investment options including government bonds.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800&q=80',
    tagline: 'Flexible Options - Multiple investment pathways',
    timezone: 'UTC-4 (AST)',
    language: 'English',
    currency: 'East Caribbean Dollar (XCD)',
    population: '184,000',
    passportValidity: '5 years',
    aboutCountry: 'St. Lucia, famous for its iconic Pitons and luxury resorts, offers one of the most flexible CBI programs with multiple investment pathways including government bonds, enterprise projects, and real estate. The program is known for its straightforward process and lifetime citizenship guarantee.',
    legalFramework: 'St. Lucia Citizenship by Investment Act 2015',
    keyBenefits: [
      { title: 'Government Bonds', description: 'Unique option to invest $300K in government bonds for 5 years with partial recovery', icon: 'FileText' },
      { title: 'No Interview', description: 'Entirely paper-based process with no interview or physical presence required', icon: 'CheckCircle' },
      { title: 'Lifetime Citizenship', description: 'Irrevocable citizenship passed to future generations automatically', icon: 'Shield' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Donation', amount: 100000, icon: 'Heart' },
        { name: 'Enterprise', amount: 250000, icon: 'Briefcase', label: 'Enterprise Project' },
        { name: 'Real Estate', amount: 300000, icon: 'Home' },
        { name: 'Govt Bonds', amount: 300000, icon: 'Landmark', label: 'Government Bonds (5 years)' },
      ],
      dueDiligence: 7500,
      processingFees: 2000,
      passportFee: 500,
      sharedFees: [],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal background, not under investigation',
      health: 'Good health certified by licensed physician',
      fundsProof: 'Legal and verifiable source of investment funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (certified)', 'Birth certificate (apostilled)', 'Passport photos (10)', 'National ID card', 'CV/Resume'],
      },
      {
        category: 'Background Check',
        documents: ['Police clearance (all residences)', 'Declaration of no criminal proceedings', 'Professional references (2)', 'Personal references (2)'],
      },
      {
        category: 'Financial Documents',
        documents: ['Bank statements (12 months)', 'Bank reference letter', 'Source of funds affidavit', 'Proof of address', 'Tax returns'],
      },
      {
        category: 'Family Documents',
        documents: ['Marriage certificate', 'Spouse documents', 'Children birth certificates', 'Dependency declarations'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' }, { name: 'France', type: 'VF' },
          { name: 'Germany', type: 'VF' }, { name: 'Spain', type: 'VF' }, { name: 'Switzerland', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Singapore', type: 'VF' }, { name: 'Hong Kong', type: 'VF' }, { name: 'Malaysia', type: 'VF' },
          { name: 'South Korea', type: 'VF' }, { name: 'Indonesia', type: 'VoA' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' },
          { name: 'Colombia', type: 'VF' }, { name: 'Panama', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'Choose from donation, bonds, real estate, or enterprise options' },
      { step: 2, title: 'Document Collection', duration: '2-3 weeks', description: 'Prepare and authenticate all documents' },
      { step: 3, title: 'Application Submission', duration: '1-2 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence', duration: '6-8 weeks', description: 'Government verification process' },
      { step: 5, title: 'Approval & Investment', duration: '2-3 weeks', description: 'Complete chosen investment option' },
      { step: 6, title: 'Citizenship Granted', duration: '1-2 weeks', description: 'Receive lifetime citizenship and passport' },
    ],
    faqs: [
      { question: 'What is the government bond option?', answer: 'You invest $300,000 in non-interest bearing government bonds held for 5 years. After 5 years, you receive your principal back while retaining citizenship permanently.' },
      { question: 'What is the enterprise project option?', answer: 'Invest $250,000 (or $175,000 each for joint applicants) in an approved enterprise project that creates jobs in St. Lucia.' },
      { question: 'Is citizenship irrevocable?', answer: 'Yes, St. Lucian citizenship acquired through investment is irrevocable and passes to children automatically at birth.' },
      { question: 'Do I need to visit St. Lucia?', answer: 'No, the entire process is paper-based. No interview, oath ceremony, or physical visit is required at any stage.' },
      { question: 'Can I rename after getting citizenship?', answer: 'No, St. Lucia does not allow name changes as part of the CBI process to maintain document integrity.' },
    ],
  },
  // Europe
  {
    id: 'malta',
    country: 'Malta',
    region: 'europe',
    flag: '🇲🇹',
    minInvestment: 690000,
    investmentType: 'Donation + Real Estate + Contribution',
    processingTime: '12-36 months',
    visaFreeCountries: 186,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: '12-36 months residency',
    highlights: ['EU citizenship', 'Schengen access', 'World-class passport'],
    description: 'The only EU citizenship by investment program currently available.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80',
    isPopular: true,
    tagline: 'EU Citizenship - Access to the European Union',
    timezone: 'UTC+1 (CET)',
    language: 'Maltese, English',
    currency: 'Euro (EUR)',
    population: '520,000',
    passportValidity: '10 years',
    aboutCountry: 'Malta, a strategic Mediterranean island nation and EU member since 2004, offers the world\'s only legitimate citizenship by investment program that grants full European Union citizenship. The Maltese passport is one of the most powerful in the world, ranking in the top 10 globally.',
    legalFramework: 'Maltese Citizenship Act (Granting of Citizenship for Exceptional Services by Direct Investment) 2020',
    keyBenefits: [
      { title: 'EU Citizenship', description: 'Only program offering full European Union citizenship with right to live and work in all 27 EU states', icon: 'Star' },
      { title: 'Top 10 Passport', description: 'Access to 186 countries including USA, UK, and entire Schengen zone without visa', icon: 'Globe' },
      { title: 'Generational Wealth', description: 'Citizenship passed to descendants, providing permanent EU access for future generations', icon: 'Users' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: '36-Month Track', amount: 600000, icon: 'Heart', label: 'Direct Investment (36-month residency)' },
        { name: '12-Month Track', amount: 750000, icon: 'Zap', label: 'Direct Investment (12-month fast-track)' },
      ],
      dueDiligence: 15000,
      processingFees: 40000,
      passportFee: 500,
      sharedFees: [
        { name: 'Real Estate (5 years)', amount: 700000 },
        { name: 'Philanthropic Donation', amount: 10000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Exceptional character with no criminal record, extensive due diligence by EU standards',
      health: 'Comprehensive medical examination and health insurance',
      fundsProof: 'Detailed source of wealth documentation meeting EU anti-money laundering standards',
    },
    requiredDocuments: [
      {
        category: 'Identity & Personal',
        documents: ['Valid passport (all pages)', 'Birth certificate (apostilled)', 'Passport photos (12)', 'CV/Resume', 'National ID', 'Marriage/divorce certificates'],
      },
      {
        category: 'Background & Character',
        documents: ['Police clearance (all countries)', 'Court clearance certificates', 'Professional references (5)', 'Personal references (3)', 'Media due diligence'],
      },
      {
        category: 'Financial Evidence',
        documents: ['Bank statements (24 months)', 'Source of wealth declaration', 'Tax returns (5 years)', 'Asset declarations', 'Business ownership documents'],
      },
      {
        category: 'Residency Requirements',
        documents: ['Malta residency permit', 'Lease agreement or property deed', 'Health insurance (EU-wide)', 'Proof of Malta address'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'All EU Countries', type: 'VF' }, { name: 'UK', type: 'VF' }, { name: 'Switzerland', type: 'VF' },
          { name: 'Norway', type: 'VF' }, { name: 'Iceland', type: 'VF' }, { name: 'Liechtenstein', type: 'VF' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'USA', type: 'VF' }, { name: 'Canada', type: 'eTA' }, { name: 'Brazil', type: 'VF' },
          { name: 'Argentina', type: 'VF' }, { name: 'Mexico', type: 'VF' }, { name: 'Chile', type: 'VF' },
        ],
      },
      {
        region: 'Asia & Oceania',
        countries: [
          { name: 'Japan', type: 'VF' }, { name: 'South Korea', type: 'VF' }, { name: 'Singapore', type: 'VF' },
          { name: 'Australia', type: 'eTA' }, { name: 'New Zealand', type: 'VF' }, { name: 'Hong Kong', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1 week', description: 'Eligibility pre-screening and residency planning' },
      { step: 2, title: 'Residency Application', duration: '2-3 months', description: 'Apply for Malta residency permit' },
      { step: 3, title: 'Residency Period', duration: '12-36 months', description: 'Fulfill residency requirement while living in Malta' },
      { step: 4, title: 'Citizenship Application', duration: '1 month', description: 'Submit citizenship application with fees ($450 + 2.5%)' },
      { step: 5, title: 'Due Diligence', duration: '4-6 months', description: 'Comprehensive EU-standard background checks' },
      { step: 6, title: 'EU Citizenship', duration: '1-2 months', description: 'Oath ceremony and passport issuance' },
    ],
    faqs: [
      { question: 'Why is Malta citizenship so valuable?', answer: 'Malta offers the only legitimate EU citizenship by investment, granting full rights to live, work, and do business in all 27 EU countries, plus visa-free access to 186 countries including the USA.' },
      { question: 'What is the residency requirement?', answer: 'You must hold Malta residency for 12 months (€750,000 investment) or 36 months (€600,000 investment) before applying for citizenship. This requires establishing genuine links with Malta.' },
      { question: 'Can I work anywhere in the EU?', answer: 'Yes, as a Maltese/EU citizen, you have the automatic right to live, work, study, and retire in any of the 27 EU member states without additional permits.' },
      { question: 'Is the program legitimate?', answer: 'Yes, Malta\'s program is the only EU citizenship by investment program approved and regulated by the European Union, with strict due diligence standards.' },
      { question: 'Can I pass citizenship to my children?', answer: 'Yes, Maltese citizenship is passed to descendants, providing permanent EU access for future generations born to Maltese citizens.' },
    ],
  },
  {
    id: 'portugal',
    country: 'Portugal',
    region: 'europe',
    flag: '🇵🇹',
    minInvestment: 500000,
    investmentType: 'Investment Fund',
    processingTime: '5+ years for citizenship',
    visaFreeCountries: 186,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: '7 days/year average',
    highlights: ['Path to EU citizenship', 'Golden Visa residency', 'Low stay requirement'],
    description: 'Popular Golden Visa program with path to EU citizenship.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
    tagline: 'Golden Visa - Path to EU citizenship',
    timezone: 'UTC+0 (WET)',
    language: 'Portuguese',
    currency: 'Euro (EUR)',
    population: '10.3 million',
    passportValidity: '5 years',
    aboutCountry: 'Portugal, with its stunning coastline, historic cities, and high quality of life, offers one of Europe\'s most popular Golden Visa programs. The program provides a clear path to EU citizenship in 5 years with minimal physical presence requirements.',
    legalFramework: 'Portuguese Immigration Law (SEF) - Golden Visa Regime',
    keyBenefits: [
      { title: 'Low Stay Requirement', description: 'Only 7 days per year average required to maintain residency', icon: 'Calendar' },
      { title: 'EU Citizenship Path', description: 'Eligible for Portuguese (EU) citizenship after 5 years of residency', icon: 'Flag' },
      { title: 'Schengen Access', description: 'Immediate visa-free travel throughout 27 Schengen countries', icon: 'Globe' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Investment Fund', amount: 500000, icon: 'PiggyBank' },
        { name: 'Research/Cultural', amount: 250000, icon: 'Landmark' },
      ],
      dueDiligence: 2500,
      processingFees: 5500,
      passportFee: 100,
      sharedFees: [
        { name: 'Renewal Fees (2 years)', amount: 2500 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record from all countries of residence',
      health: 'Valid health insurance covering Portugal',
      fundsProof: 'Legitimate source of investment capital',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos', 'Proof of address', 'CV/Resume'],
      },
      {
        category: 'Background Check',
        documents: ['Criminal record certificate', 'Declaration of no investigations', 'Tax compliance certificate'],
      },
      {
        category: 'Financial Documents',
        documents: ['Bank statements (6 months)', 'Proof of investment funds', 'Tax returns', 'Health insurance'],
      },
      {
        category: 'Investment Evidence',
        documents: ['Investment fund subscription', 'Fund documentation', 'Proof of transfer'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'All Schengen', type: 'VF' }, { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'USA', type: 'VF' }, { name: 'Canada', type: 'eTA' }, { name: 'Brazil', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Japan', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'South Korea', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 weeks', description: 'Review investment options and eligibility' },
      { step: 2, title: 'Investment', duration: '4-8 weeks', description: 'Complete qualifying investment' },
      { step: 3, title: 'Application Submission', duration: '2-4 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '6-12 months', description: 'SEF review and approval' },
      { step: 5, title: 'Residency Card', duration: '2-4 weeks', description: 'Biometrics and card issuance' },
      { step: 6, title: 'Path to Citizenship', duration: '5 years', description: 'Maintain residency, then apply for citizenship' },
    ],
    faqs: [
      { question: 'What investment options are available?', answer: 'Current options include €500,000 investment funds, €250,000 cultural/research contributions. Real estate options have been discontinued for new applications.' },
      { question: 'What is the stay requirement?', answer: 'You need to spend an average of 7 days per year in Portugal to maintain your Golden Visa status.' },
      { question: 'How do I get citizenship?', answer: 'After 5 years of legal residency, you can apply for Portuguese citizenship. A basic Portuguese language test (A2 level) is required.' },
      { question: 'Can I work in Portugal?', answer: 'Yes, the Golden Visa allows you to work and do business in Portugal from day one.' },
    ],
  },
  {
    id: 'greece',
    country: 'Greece',
    region: 'europe',
    flag: '🇬🇷',
    minInvestment: 250000,
    investmentType: 'Real Estate',
    processingTime: '7+ years for citizenship',
    visaFreeCountries: 186,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: '7 years for citizenship',
    highlights: ['Lowest EU entry point', 'Schengen residency', 'Beautiful lifestyle'],
    description: 'Most affordable EU residency by investment program.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    tagline: 'Affordable EU Entry - Best value in Europe',
    timezone: 'UTC+2 (EET)',
    language: 'Greek',
    currency: 'Euro (EUR)',
    population: '10.7 million',
    passportValidity: '5 years',
    aboutCountry: 'Greece, the cradle of Western civilization, offers the most affordable Golden Visa in the EU with real estate investments starting at €250,000. With its Mediterranean climate, rich history, and high quality of life, Greece is ideal for investors seeking EU residency.',
    legalFramework: 'Greek Law 4251/2014 - Residence Permit for Property Owners',
    keyBenefits: [
      { title: 'Lowest EU Price', description: 'Most affordable EU Golden Visa starting at €250,000 in select areas', icon: 'DollarSign' },
      { title: 'Real Estate Investment', description: 'Tangible property investment in one of Europe\'s most beautiful countries', icon: 'Home' },
      { title: 'Family Coverage', description: 'Include spouse, children, and parents of both spouses in one application', icon: 'Users' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Regional Property', amount: 250000, icon: 'Home', label: 'Real Estate (Select Areas)' },
        { name: 'Prime Location', amount: 500000, icon: 'Building', label: 'Athens/Thessaloniki/Islands' },
      ],
      dueDiligence: 2000,
      processingFees: 2000,
      passportFee: 100,
      sharedFees: [
        { name: 'Legal Fees', amount: 8000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'No criminal convictions in Greece or country of origin',
      health: 'Valid health insurance for Greece',
      fundsProof: 'Proof of funds for real estate purchase',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos', 'Marriage certificate (if applicable)'],
      },
      {
        category: 'Property Documents',
        documents: ['Property deed', 'Payment receipts', 'Property valuation', 'Tax clearance for property'],
      },
      {
        category: 'Financial & Health',
        documents: ['Bank statements', 'Health insurance policy', 'Proof of address', 'Criminal record certificate'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'All Schengen', type: 'VF' }, { name: 'UK', type: 'VF' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Property Search', duration: '2-4 weeks', description: 'Find qualifying property with our partners' },
      { step: 2, title: 'Purchase & Due Diligence', duration: '4-6 weeks', description: 'Complete purchase with legal review' },
      { step: 3, title: 'Application', duration: '2 weeks', description: 'Submit residency application with fees ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '2-3 months', description: 'Greek authorities review' },
      { step: 5, title: 'Residency Card', duration: '2-4 weeks', description: 'Receive 5-year residence permit' },
      { step: 6, title: 'Citizenship Path', duration: '7 years', description: 'Physical presence required for citizenship' },
    ],
    faqs: [
      { question: 'What is the minimum investment?', answer: 'Minimum is €250,000 in select areas and €500,000 in Athens, Thessaloniki, and popular islands. You can combine multiple properties.' },
      { question: 'Can I rent out my property?', answer: 'Yes, you can rent out your Greek property and earn income while maintaining your Golden Visa status.' },
      { question: 'What is the path to citizenship?', answer: 'After 7 years of continuous residency and passing a Greek language test, you can apply for citizenship.' },
      { question: 'Who can be included?', answer: 'Spouse, children under 21, and parents of both the main applicant and spouse can be included.' },
    ],
  },
  {
    id: 'turkey',
    country: 'Turkey',
    region: 'europe',
    flag: '🇹🇷',
    minInvestment: 400000,
    investmentType: 'Real Estate or Bank Deposit',
    processingTime: '3-6 months',
    visaFreeCountries: 110,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Fast processing', 'E-2 Treaty with USA', 'Strategic location'],
    description: 'Fast-track citizenship with E-2 visa access to the United States.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    tagline: 'Strategic Bridge - Between Europe and Asia',
    timezone: 'UTC+3 (TRT)',
    language: 'Turkish',
    currency: 'Turkish Lira (TRY)',
    population: '85 million',
    passportValidity: '10 years',
    aboutCountry: 'Turkey, straddling Europe and Asia, offers a powerful citizenship program with fast processing and access to the US E-2 investor visa treaty. As a G20 nation with a dynamic economy, Turkey provides strategic positioning for business and travel.',
    legalFramework: 'Turkish Citizenship Law Article 12 - Exceptional Citizenship',
    keyBenefits: [
      { title: 'US E-2 Treaty', description: 'Turkish citizens can apply for US E-2 investor visa to live and work in America', icon: 'Flag' },
      { title: 'Fast Processing', description: 'Citizenship typically granted within 3-6 months', icon: 'Zap' },
      { title: 'G20 Nation', description: 'Passport from a major world economy with growing global influence', icon: 'TrendingUp' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Real Estate', amount: 400000, icon: 'Home' },
        { name: 'Bank Deposit', amount: 500000, icon: 'Building' },
        { name: 'Government Bonds', amount: 500000, icon: 'Landmark' },
      ],
      dueDiligence: 1500,
      processingFees: 2000,
      passportFee: 250,
      sharedFees: [
        { name: 'Legal Fees', amount: 5000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'No criminal record that would affect national security',
      health: 'No specific health requirements',
      fundsProof: 'Legal source of investment funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate (apostilled)', 'Passport photos (10)', 'Marriage certificate', 'Divorce decree (if applicable)'],
      },
      {
        category: 'Investment Documents',
        documents: ['Property deed (TAPU)', 'Valuation report', 'Payment receipts', 'Bank transfer records'],
      },
      {
        category: 'Background',
        documents: ['Criminal record certificate', 'Address verification', 'Tax identification number'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Asia',
        countries: [
          { name: 'Japan', type: 'VF' }, { name: 'South Korea', type: 'VF' }, { name: 'Singapore', type: 'VF' },
          { name: 'Malaysia', type: 'VF' }, { name: 'Thailand', type: 'VoA' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' },
          { name: 'Mexico', type: 'VF' }, { name: 'Colombia', type: 'VF' },
        ],
      },
      {
        region: 'Africa & Middle East',
        countries: [
          { name: 'Qatar', type: 'VF' }, { name: 'Tunisia', type: 'VF' }, { name: 'Morocco', type: 'VF' },
          { name: 'South Africa', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'Choose between real estate, deposit, or bonds' },
      { step: 2, title: 'Investment', duration: '2-4 weeks', description: 'Complete property purchase or bank deposit' },
      { step: 3, title: 'Application', duration: '1-2 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Review', duration: '2-3 months', description: 'Government processing and approval' },
      { step: 5, title: 'Citizenship', duration: '2-4 weeks', description: 'Receive Turkish ID and passport' },
      { step: 6, title: 'E-2 Application', duration: 'Optional', description: 'Apply for US E-2 visa if desired' },
    ],
    faqs: [
      { question: 'How does the E-2 treaty with USA work?', answer: 'Turkish citizens can apply for E-2 investor visas allowing them to live and work in the US by starting or investing in a US business. The visa is renewable indefinitely.' },
      { question: 'Can I sell the property after getting citizenship?', answer: 'You must hold the property for 3 years. After that, you can sell it while retaining your citizenship.' },
      { question: 'Is the process really that fast?', answer: 'Yes, Turkey has one of the fastest CBI processes with citizenship typically granted in 3-6 months from investment completion.' },
      { question: 'Can I include my family?', answer: 'Yes, spouse and children under 18 are included at no additional investment cost. Only additional processing fees apply.' },
    ],
  },
  {
    id: 'spain',
    country: 'Spain',
    region: 'europe',
    flag: '🇪🇸',
    minInvestment: 500000,
    investmentType: 'Real Estate',
    processingTime: '10+ years for citizenship',
    visaFreeCountries: 190,
    familyInclusion: true,
    dualCitizenship: false,
    physicalPresence: '10 years for citizenship',
    highlights: ['Top EU lifestyle', 'Schengen residency', 'Real estate investment'],
    description: 'Golden Visa with excellent quality of life and strong passport.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    tagline: 'Premium Lifestyle - World-class quality of life',
    timezone: 'UTC+1 (CET)',
    language: 'Spanish',
    currency: 'Euro (EUR)',
    population: '47 million',
    passportValidity: '10 years',
    aboutCountry: 'Spain offers one of Europe\'s most desirable lifestyles with its Mediterranean climate, world-renowned cuisine, and rich culture. The Golden Visa program provides a path to living in one of the EU\'s largest economies with access to excellent healthcare and education.',
    legalFramework: 'Spanish Law 14/2013 - Support for Entrepreneurs',
    keyBenefits: [
      { title: 'Premium Lifestyle', description: 'Access to Spain\'s world-class healthcare, education, and Mediterranean lifestyle', icon: 'Sun' },
      { title: 'Strong Passport', description: 'Spanish passport ranks among top 5 globally with 190 countries visa-free', icon: 'Globe' },
      { title: 'Real Estate Market', description: 'Investment in one of Europe\'s most dynamic and recovering property markets', icon: 'Home' },
    ],
    costBreakdown: {
      realEstateMin: 500000,
      dueDiligence: 2000,
      processingFees: 2500,
      passportFee: 150,
      otherFees: [
        { name: 'Legal Fees', amount: 10000 },
        { name: 'Property Transfer Tax', amount: 10 },
        { name: 'NIE Processing', amount: 200 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'No criminal record in Spain or previous countries of residence',
      health: 'Health insurance valid in Spain',
      fundsProof: 'Proof of sufficient financial means and property investment',
    },
    requiredDocuments: [
      {
        category: 'Personal Documents',
        documents: ['Valid passport', 'NIE (tax ID)', 'Passport photos', 'Marriage certificate', 'Birth certificates'],
      },
      {
        category: 'Property Documents',
        documents: ['Property deed', 'Property registry certificate', 'Payment proof', 'Title insurance'],
      },
      {
        category: 'Financial & Health',
        documents: ['Bank statements', 'Private health insurance', 'Criminal record certificate', 'Proof of income/means'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Global Access',
        countries: [
          { name: 'USA', type: 'VF' }, { name: 'Canada', type: 'eTA' }, { name: 'UK', type: 'VF' },
          { name: 'Japan', type: 'VF' }, { name: 'Australia', type: 'eTA' }, { name: 'All EU', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Property Search', duration: '2-8 weeks', description: 'Find qualifying property €500,000+' },
      { step: 2, title: 'Purchase', duration: '4-6 weeks', description: 'Complete property purchase' },
      { step: 3, title: 'Application', duration: '2 weeks', description: 'Submit Golden Visa application ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '2-3 months', description: 'Spanish authorities review' },
      { step: 5, title: 'Residency', duration: '2 weeks', description: 'Receive residence permit' },
      { step: 6, title: 'Citizenship', duration: '10 years', description: 'Apply after 10 years residency' },
    ],
    faqs: [
      { question: 'Does Spain allow dual citizenship?', answer: 'Spain generally requires renouncing previous citizenship for naturalization, with exceptions for citizens of Latin American countries, Portugal, Philippines, and Equatorial Guinea.' },
      { question: 'What is the stay requirement?', answer: 'The Golden Visa has no minimum stay requirement for maintaining residency. However, citizenship requires 10 years of legal residence.' },
      { question: 'Can I work in Spain?', answer: 'Yes, the Golden Visa grants full work and business rights in Spain from day one.' },
      { question: 'What cities are popular?', answer: 'Madrid, Barcelona, Marbella, and Valencia are top choices. Property prices vary significantly by location.' },
    ],
  },
  {
    id: 'hungary',
    country: 'Hungary',
    region: 'europe',
    flag: '🇭🇺',
    minInvestment: 250000,
    investmentType: 'Investment Fund',
    processingTime: '2-3 months',
    visaFreeCountries: 183,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'No minimum stay',
    highlights: ['EU access', 'No minimum stay', 'Fast processing'],
    description: 'New EU Golden Visa with competitive pricing and no stay requirement.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    isNew: true,
    tagline: 'New EU Option - Fast-track to Schengen',
    timezone: 'UTC+1 (CET)',
    language: 'Hungarian',
    currency: 'Hungarian Forint (HUF)',
    population: '9.7 million',
    passportValidity: '10 years',
    aboutCountry: 'Hungary, centrally located in the heart of Europe, has launched a new Guest Investor Program offering one of the most competitive EU residency options. With its rich history, thermal baths, and strategic location, Hungary provides fast access to the Schengen zone.',
    legalFramework: 'Hungarian Guest Investor Visa Program 2024',
    keyBenefits: [
      { title: 'No Stay Requirement', description: 'Maintain EU residency without minimum physical presence obligations', icon: 'Calendar' },
      { title: 'Fast Processing', description: 'Residency granted in just 2-3 months - one of fastest in EU', icon: 'Zap' },
      { title: 'Schengen Access', description: 'Immediate visa-free travel throughout Schengen zone', icon: 'Globe' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Investment Fund', amount: 250000, icon: 'PiggyBank' },
        { name: 'Real Estate', amount: 500000, icon: 'Home' },
        { name: 'Donation', amount: 1000000, icon: 'Heart' },
      ],
      dueDiligence: 5000,
      processingFees: 3000,
      passportFee: 200,
      sharedFees: [
        { name: 'Legal Fees', amount: 5000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record, no security concerns',
      health: 'Valid health insurance',
      fundsProof: 'Legal source of investment capital',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos', 'Proof of address', 'CV/Resume'],
      },
      {
        category: 'Investment Documents',
        documents: ['Fund subscription agreement', 'Proof of funds', 'Bank statements', 'Investment transfer proof'],
      },
      {
        category: 'Background',
        documents: ['Criminal record certificate', 'Health insurance policy', 'Income/wealth declaration'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'All Schengen', type: 'VF' }, { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Mexico', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Choose investment option and review eligibility' },
      { step: 2, title: 'Investment', duration: '2-4 weeks', description: 'Complete fund subscription or property purchase' },
      { step: 3, title: 'Application', duration: '1-2 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '4-8 weeks', description: 'Hungarian authorities review' },
      { step: 5, title: 'Approval', duration: '1-2 weeks', description: 'Receive approval notification' },
      { step: 6, title: 'Residency Card', duration: '1-2 weeks', description: 'Collect residence permit' },
    ],
    faqs: [
      { question: 'Is this a new program?', answer: 'Yes, Hungary launched its Guest Investor Program in 2024, making it one of the newest EU residency options with competitive terms.' },
      { question: 'What are the investment options?', answer: 'You can invest €250,000 in approved investment funds, €500,000 in real estate, or make a €1 million donation to a Hungarian public trust.' },
      { question: 'Is there a path to citizenship?', answer: 'Residency allows you to apply for citizenship after 8 years of continuous legal residence in Hungary.' },
      { question: 'Can I work in Hungary?', answer: 'The investor visa primarily allows you to reside and manage investments. Work rights may be limited without additional permits.' },
    ],
  },
  {
    id: 'latvia',
    country: 'Latvia',
    region: 'europe',
    flag: '🇱🇻',
    minInvestment: 50000,
    investmentType: 'Business Investment',
    processingTime: '1-3 months',
    visaFreeCountries: 180,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Minimal',
    highlights: ['Most affordable EU', 'Fast processing', 'Business-friendly'],
    description: 'One of the most affordable pathways to EU residency.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1507915135761-41a0a222c709?w=800&q=80',
    isNew: true,
    tagline: 'Budget EU Access - Most affordable pathway',
    timezone: 'UTC+2 (EET)',
    language: 'Latvian',
    currency: 'Euro (EUR)',
    population: '1.9 million',
    passportValidity: '10 years',
    aboutCountry: 'Latvia, a Baltic EU member state, offers one of the most affordable pathways to EU residency through its business and investment programs. With its strategic location, digital infrastructure, and startup ecosystem, Latvia is increasingly attractive to entrepreneurs.',
    legalFramework: 'Latvian Immigration Law - Residence Permits',
    keyBenefits: [
      { title: 'Low Entry Point', description: 'Access EU residency from just €50,000 business investment', icon: 'DollarSign' },
      { title: 'Fast Track', description: 'Residence permit issued in 1-3 months', icon: 'Zap' },
      { title: 'Business Hub', description: 'EU startup ecosystem with favorable tax regime for new businesses', icon: 'Briefcase' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Business', amount: 50000, icon: 'Briefcase', label: 'Business Investment' },
        { name: 'Real Estate', amount: 250000, icon: 'Home' },
        { name: 'Bank Deposit', amount: 280000, icon: 'Building', label: 'Subordinated Capital' },
      ],
      dueDiligence: 1500,
      processingFees: 1000,
      passportFee: 100,
      sharedFees: [
        { name: 'Legal Fees', amount: 3000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'No criminal convictions',
      health: 'Valid health insurance',
      fundsProof: 'Legal source of business capital',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos', 'Proof of address'],
      },
      {
        category: 'Business Documents',
        documents: ['Business plan', 'Company registration', 'Investment proof', 'Bank statements'],
      },
      {
        category: 'Background',
        documents: ['Criminal record certificate', 'Health insurance', 'Financial means proof'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'All Schengen', type: 'VF' }, { name: 'UK', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Business Setup', duration: '2-4 weeks', description: 'Establish Latvian company or investment' },
      { step: 2, title: 'Application', duration: '1-2 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 3, title: 'Processing', duration: '4-8 weeks', description: 'Latvian authorities review' },
      { step: 4, title: 'Residency', duration: '1-2 weeks', description: 'Receive temporary residence permit' },
      { step: 5, title: 'Renewal', duration: 'Annually', description: 'Renew residence while maintaining business' },
      { step: 6, title: 'Permanent Residency', duration: '5 years', description: 'Apply for permanent EU residence' },
    ],
    faqs: [
      { question: 'What business activities qualify?', answer: 'You can start any legal business, invest in an existing company, or provide subordinated capital to a Latvian bank. Minimum capital is €50,000.' },
      { question: 'What is the real estate option?', answer: 'Purchase property worth €250,000+ in Riga or €250,000 in other regions. Note: this program has limited annual quotas.' },
      { question: 'Can I travel in the EU?', answer: 'Yes, your Latvian residence permit allows visa-free travel throughout the Schengen zone for up to 90 days in any 180-day period.' },
      { question: 'What is the path to citizenship?', answer: 'After 5 years of permanent residence and passing language tests, you can apply for Latvian (EU) citizenship.' },
    ],
  },
  {
    id: 'serbia',
    country: 'Serbia',
    region: 'europe',
    flag: '🇷🇸',
    minInvestment: 100000,
    investmentType: 'Donation-based',
    processingTime: '6-12 months',
    visaFreeCountries: 136,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Minimal',
    highlights: ['European passport', 'Growing economy', 'Potential EU member'],
    description: 'Emerging citizenship program with future EU potential.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1577939169412-2f21ab6f5419?w=800&q=80',
    isNew: true,
    tagline: 'Emerging Opportunity - Future EU potential',
    timezone: 'UTC+1 (CET)',
    language: 'Serbian',
    currency: 'Serbian Dinar (RSD)',
    population: '6.9 million',
    passportValidity: '10 years',
    aboutCountry: 'Serbia, a candidate for EU membership, offers citizenship through economic contribution. As a rising European economy with strong cultural heritage and strategic location, Serbia presents an opportunity for investors betting on future EU integration.',
    legalFramework: 'Serbian Citizenship Act - Economic Interest Provision',
    keyBenefits: [
      { title: 'EU Candidate', description: 'Serbia is actively negotiating EU membership, potentially adding significant passport value', icon: 'Star' },
      { title: 'Strategic Location', description: 'Gateway between Western Europe and the Balkans with growing economy', icon: 'MapPin' },
      { title: 'Affordable Entry', description: 'Citizenship available at lower cost than Caribbean programs', icon: 'DollarSign' },
    ],
    costBreakdown: {
      donationAmount: 100000,
      dueDiligence: 5000,
      processingFees: 3000,
      passportFee: 300,
      otherFees: [
        { name: 'Legal Fees', amount: 5000 },
        { name: 'Government Administrative', amount: 2000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record internationally',
      health: 'No specific health requirements',
      fundsProof: 'Legal source of contribution funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate (apostilled)', 'Passport photos', 'CV/Resume'],
      },
      {
        category: 'Background',
        documents: ['Police clearance certificates', 'Declaration of source of funds', 'Reference letters'],
      },
      {
        category: 'Financial',
        documents: ['Bank statements', 'Proof of contribution funds', 'Income verification'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'All Schengen', type: 'VF' }, { name: 'Turkey', type: 'VF' }, { name: 'Russia', type: 'VF' },
          { name: 'Belarus', type: 'VF' }, { name: 'Ukraine', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'China', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'Indonesia', type: 'VoA' },
          { name: 'Malaysia', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Review eligibility and program details' },
      { step: 2, title: 'Documentation', duration: '3-4 weeks', description: 'Prepare and authenticate documents' },
      { step: 3, title: 'Application', duration: '2 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence', duration: '3-6 months', description: 'Government review and verification' },
      { step: 5, title: 'Approval', duration: '1-2 months', description: 'Presidential approval and contribution payment' },
      { step: 6, title: 'Citizenship', duration: '2-4 weeks', description: 'Receive Serbian citizenship and passport' },
    ],
    faqs: [
      { question: 'Will Serbia join the EU?', answer: 'Serbia is an official EU candidate country with ongoing accession negotiations. If Serbia joins the EU, Serbian citizenship would become EU citizenship.' },
      { question: 'What is the visa-free access?', answer: 'Serbian passport provides visa-free access to 136 countries including all Schengen zone countries for 90 days, plus Russia and China.' },
      { question: 'Is the process discretionary?', answer: 'Yes, Serbian citizenship through economic contribution is granted on a discretionary basis by Presidential decree.' },
      { question: 'Can I visit the Schengen zone?', answer: 'Yes, Serbian citizens can travel visa-free to all Schengen countries for up to 90 days in any 180-day period.' },
    ],
  },
  // Middle East
  {
    id: 'jordan',
    country: 'Jordan',
    region: 'middle-east',
    flag: '🇯🇴',
    minInvestment: 750000,
    investmentType: 'Bank Deposit + Real Estate',
    processingTime: '3-6 months',
    visaFreeCountries: 52,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Strategic location', 'Stable economy', 'Business-friendly'],
    description: 'Gateway to the Middle East with strong regional connections.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80',
    tagline: 'Middle East Gateway - Strategic regional access',
    timezone: 'UTC+2 (EET)',
    language: 'Arabic',
    currency: 'Jordanian Dinar (JOD)',
    population: '11 million',
    passportValidity: '5 years',
    aboutCountry: 'Jordan, known for Petra and the Dead Sea, is a stable, business-friendly kingdom in the heart of the Middle East. The country offers citizenship through substantial investment, providing access to a stable regional base with strong diplomatic ties worldwide.',
    legalFramework: 'Jordanian Nationality Law - Investment Citizenship',
    keyBenefits: [
      { title: 'Regional Stability', description: 'One of the most stable and secure countries in the Middle East', icon: 'Shield' },
      { title: 'Business Hub', description: 'Free trade agreements with US, EU, and Arab nations', icon: 'Briefcase' },
      { title: 'Strategic Location', description: 'Central position for business across Middle East and North Africa', icon: 'MapPin' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Real Estate + Deposit', amount: 1750000, icon: 'Home', label: 'Property $750K + Bank $1M' },
      ],
      dueDiligence: 10000,
      processingFees: 5000,
      passportFee: 500,
      sharedFees: [
        { name: 'Government Fees', amount: 5000 },
        { name: 'Legal Fees', amount: 10000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record, security clearance required',
      health: 'Good health status',
      fundsProof: 'Verified source of investment capital',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos (12)', 'CV/Resume', 'Marriage certificate'],
      },
      {
        category: 'Investment Documents',
        documents: ['Bank deposit certificate', 'Property deed', 'Investment contracts', 'Source of funds declaration'],
      },
      {
        category: 'Background',
        documents: ['Police clearance', 'Medical certificate', 'Reference letters', 'Security questionnaire'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Middle East',
        countries: [
          { name: 'UAE', type: 'VF' }, { name: 'Qatar', type: 'VF' }, { name: 'Bahrain', type: 'VF' },
          { name: 'Oman', type: 'VF' }, { name: 'Egypt', type: 'VF' }, { name: 'Lebanon', type: 'VF' },
        ],
      },
      {
        region: 'Africa',
        countries: [
          { name: 'Tunisia', type: 'VF' }, { name: 'Morocco', type: 'VF' }, { name: 'Sudan', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Malaysia', type: 'VF' }, { name: 'Indonesia', type: 'VoA' }, { name: 'Turkey', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1 week', description: 'Review investment requirements and options' },
      { step: 2, title: 'Investment', duration: '4-8 weeks', description: 'Complete bank deposit and real estate purchase' },
      { step: 3, title: 'Application', duration: '2-3 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Security Review', duration: '8-12 weeks', description: 'Background and security verification' },
      { step: 5, title: 'Approval', duration: '4-6 weeks', description: 'Royal approval process' },
      { step: 6, title: 'Citizenship', duration: '2-4 weeks', description: 'Receive Jordanian citizenship documents' },
    ],
    faqs: [
      { question: 'What is the total investment required?', answer: 'You need to invest in real estate (minimum $750,000) and maintain a bank deposit ($1 million for 5 years). Combined investment starts at approximately $1.75 million.' },
      { question: 'Can I do business in Jordan?', answer: 'Yes, Jordanian citizenship provides full business rights and access to Jordan\'s free trade agreements with the US, EU, and Arab nations.' },
      { question: 'Is the region safe?', answer: 'Jordan is one of the safest and most stable countries in the Middle East, with strong security forces and excellent diplomatic relations globally.' },
      { question: 'What is the passport strength?', answer: 'The Jordanian passport provides visa-free access to 52 countries, primarily in the Middle East, Africa, and parts of Asia.' },
    ],
  },
  {
    id: 'egypt',
    country: 'Egypt',
    region: 'middle-east',
    flag: '🇪🇬',
    minInvestment: 300000,
    investmentType: 'Deposit or Real Estate',
    processingTime: '6-12 months',
    visaFreeCountries: 51,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Growing economy', 'Historical significance', 'Affordable option'],
    description: 'Emerging CBI program with competitive investment requirements.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80',
    tagline: 'Ancient & Modern - Emerging African opportunity',
    timezone: 'UTC+2 (EET)',
    language: 'Arabic',
    currency: 'Egyptian Pound (EGP)',
    population: '104 million',
    passportValidity: '7 years',
    aboutCountry: 'Egypt, home to the ancient pyramids and a growing modern economy, offers citizenship through investment. As Africa\'s third-largest economy and a bridge between Africa and the Middle East, Egypt provides unique opportunities for business and residency.',
    legalFramework: 'Egyptian Nationality Law - Naturalization by Investment',
    keyBenefits: [
      { title: 'Emerging Economy', description: 'Access to Africa\'s third-largest economy with major infrastructure projects', icon: 'TrendingUp' },
      { title: 'Strategic Position', description: 'Gateway to African and Middle Eastern markets', icon: 'MapPin' },
      { title: 'Affordable Entry', description: 'Citizenship starting at $300,000 - competitive for the region', icon: 'DollarSign' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Donation', amount: 250000, icon: 'Heart', label: 'Non-refundable Deposit' },
        { name: 'Real Estate', amount: 300000, icon: 'Home' },
        { name: 'Bank Deposit', amount: 500000, icon: 'Building', label: 'Bank Deposit (5 years)' },
        { name: 'Treasury Deposit', amount: 750000, icon: 'Landmark', label: 'Treasury (refundable 3 years)' },
      ],
      dueDiligence: 5000,
      processingFees: 3000,
      passportFee: 200,
      sharedFees: [
        { name: 'Legal Fees', amount: 5000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record and security clearance',
      health: 'Good health status',
      fundsProof: 'Legal source of investment funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos', 'CV/Resume', 'Marriage certificate'],
      },
      {
        category: 'Investment Documents',
        documents: ['Bank statements', 'Source of funds', 'Investment proof', 'Property documents'],
      },
      {
        category: 'Background',
        documents: ['Police clearance', 'Medical report', 'Character references'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Africa',
        countries: [
          { name: 'Sudan', type: 'VF' }, { name: 'Kenya', type: 'VoA' }, { name: 'Tanzania', type: 'VoA' },
          { name: 'Morocco', type: 'VF' }, { name: 'Tunisia', type: 'VF' },
        ],
      },
      {
        region: 'Middle East',
        countries: [
          { name: 'Jordan', type: 'VF' }, { name: 'Lebanon', type: 'VoA' }, { name: 'Oman', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Malaysia', type: 'VF' }, { name: 'Indonesia', type: 'VoA' }, { name: 'Maldives', type: 'VoA' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 weeks', description: 'Review investment options and eligibility' },
      { step: 2, title: 'Investment', duration: '4-8 weeks', description: 'Complete qualifying investment' },
      { step: 3, title: 'Application', duration: '2-3 weeks', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Review', duration: '3-6 months', description: 'Government review and security checks' },
      { step: 5, title: 'Approval', duration: '2-3 months', description: 'Presidential/Cabinet approval' },
      { step: 6, title: 'Citizenship', duration: '2-4 weeks', description: 'Receive Egyptian citizenship documents' },
    ],
    faqs: [
      { question: 'What are the investment options?', answer: 'You can make a non-refundable deposit of $250,000, buy property worth $300,000+, make a bank deposit of $500,000 (held 5 years), or a treasury deposit of $750,000 (refundable after 3 years).' },
      { question: 'How strong is the passport?', answer: 'The Egyptian passport provides visa-free access to 51 countries, primarily in Africa and the Middle East. It\'s valuable for regional business access.' },
      { question: 'Is the process discretionary?', answer: 'Yes, Egyptian citizenship by investment is granted at the discretion of the President and Cabinet.' },
      { question: 'Can I do business in Egypt?', answer: 'Yes, citizenship provides full rights to live, work, and do business in Egypt, Africa\'s third-largest economy.' },
    ],
  },
  {
    id: 'uae',
    country: 'UAE Golden Visa',
    region: 'middle-east',
    flag: '🇦🇪',
    minInvestment: 50000,
    investmentType: 'Real Estate or Business',
    processingTime: '2-4 weeks',
    visaFreeCountries: 180,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Visit once every 6 months',
    highlights: ['No income tax', 'World-class lifestyle', 'Fastest processing'],
    description: 'The most accessible Golden Visa with world-class benefits.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
    isPopular: true,
    isCryptoFriendly: true,
    tagline: 'Tax-Free Haven - World-class lifestyle in days',
    timezone: 'UTC+4 (GST)',
    language: 'Arabic, English',
    currency: 'UAE Dirham (AED)',
    population: '9.9 million',
    passportValidity: 'N/A (Residency)',
    aboutCountry: 'The UAE, home to Dubai and Abu Dhabi, offers one of the world\'s most attractive residency programs with its Golden Visa. The country provides a tax-free lifestyle, world-class infrastructure, and is increasingly crypto-friendly with regulated virtual asset frameworks.',
    legalFramework: 'UAE Golden Visa Program (Amended 2022)',
    keyBenefits: [
      { title: 'Zero Income Tax', description: 'No personal income tax, capital gains tax, or inheritance tax on worldwide income', icon: 'DollarSign' },
      { title: 'Crypto-Friendly', description: 'Regulated crypto framework with major exchanges licensed in UAE', icon: 'Coins' },
      { title: 'Ultra-Fast Processing', description: 'Golden Visa issued in just 2-4 weeks - fastest in the world', icon: 'Zap' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Remote Work', amount: 50000, icon: 'Briefcase', label: 'Remote Work Visa (1 year)' },
        { name: 'Property', amount: 545000, icon: 'Home', label: 'Real Estate (10-year visa)' },
        { name: 'Company', amount: 15000, icon: 'Building', label: 'Company Setup + Trade License' },
      ],
      dueDiligence: 1000,
      processingFees: 3000,
      passportFee: 0,
      sharedFees: [
        { name: 'Medical & Emirates ID', amount: 2000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record, good character',
      health: 'Pass medical fitness test',
      fundsProof: 'Proof of investment or income',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (6+ months validity)', 'Passport photos', 'CV/Resume', 'Current visa copy (if any)'],
      },
      {
        category: 'Investment/Work Documents',
        documents: ['Property deed', 'Company trade license', 'Employment contract', 'Bank statements'],
      },
      {
        category: 'Medical & Insurance',
        documents: ['Medical fitness certificate', 'Health insurance', 'Emirates ID application'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Global (as UAE Resident)',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'Schengen', type: 'VF' }, { name: 'Russia', type: 'VF' },
          { name: 'Japan', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'China', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Choose visa category and investment option' },
      { step: 2, title: 'Investment/Setup', duration: '1-3 weeks', description: 'Complete property purchase or company setup' },
      { step: 3, title: 'Application', duration: '1-3 days', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '5-10 days', description: 'UAE immigration review' },
      { step: 5, title: 'Medical & Biometrics', duration: '1-2 days', description: 'Medical test and fingerprinting' },
      { step: 6, title: 'Golden Visa Issued', duration: '1-3 days', description: 'Receive 10-year Golden Visa' },
    ],
    faqs: [
      { question: 'What are the Golden Visa categories?', answer: 'You can qualify through real estate investment ($545,000+), company ownership, specialist talent, or as a remote worker earning $50,000+/year.' },
      { question: 'Is cryptocurrency income tax-free?', answer: 'Yes, the UAE has no personal income tax, which applies to crypto gains. The UAE also has a regulated virtual asset framework with licensed exchanges.' },
      { question: 'How long is the visa valid?', answer: 'The Golden Visa is valid for 10 years and is automatically renewable as long as you maintain your qualifying investment or employment.' },
      { question: 'Can I get UAE citizenship?', answer: 'UAE citizenship is extremely rare but possible through naturalization after 30 years or by exceptional nomination. The Golden Visa provides long-term residency, not citizenship.' },
      { question: 'What is the physical presence requirement?', answer: 'You need to visit the UAE at least once every 6 months to maintain your residency status.' },
    ],
  },
  // Pacific
  {
    id: 'vanuatu',
    country: 'Vanuatu',
    region: 'pacific',
    flag: '🇻🇺',
    minInvestment: 130000,
    investmentType: 'Donation',
    processingTime: '1-2 months',
    visaFreeCountries: 96,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Fastest in the world', 'No tax', 'Bitcoin accepted'],
    description: 'The fastest citizenship program globally, processing in weeks.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    isPopular: true,
    isCryptoFriendly: true,
    tagline: 'Speed Champion - Fastest citizenship in the world',
    timezone: 'UTC+11 (VUT)',
    language: 'English, French, Bislama',
    currency: 'Vanuatu Vatu (VUV)',
    population: '314,000',
    passportValidity: '10 years',
    aboutCountry: 'Vanuatu, a Pacific island nation of 83 islands, offers the world\'s fastest citizenship by investment program. Known for its pristine beaches, active volcanoes, and zero-tax regime, Vanuatu is a pioneer in accepting cryptocurrency for citizenship payments.',
    legalFramework: 'Citizenship Act Cap 112 - Development Support Program',
    keyBenefits: [
      { title: 'Fastest Processing', description: 'Citizenship granted in just 30-60 days - fastest in the world', icon: 'Zap' },
      { title: 'Zero Tax', description: 'No income tax, capital gains tax, wealth tax, or inheritance tax', icon: 'DollarSign' },
      { title: 'Bitcoin Accepted', description: 'Pay for citizenship in BTC, ETH, and other cryptocurrencies', icon: 'Coins' },
    ],
    costBreakdown: {
      donationAmount: 130000,
      dueDiligence: 5000,
      processingFees: 3000,
      passportFee: 230,
      otherFees: [
        { name: 'Spouse Addition', amount: 20000 },
        { name: 'Per Child (under 18)', amount: 15000 },
        { name: 'Per Child (18-25)', amount: 20000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record, not on international sanction lists',
      health: 'General good health (no medical exam required)',
      fundsProof: 'Legitimate source of donation funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (certified)', 'Birth certificate (apostilled)', 'Passport photos (8)', 'National ID card'],
      },
      {
        category: 'Background Verification',
        documents: ['Police clearance certificate', 'Proof of address', 'Reference letter from bank', 'Personal reference letter'],
      },
      {
        category: 'Financial Documents',
        documents: ['Bank statement (3 months)', 'Source of funds declaration', 'Proof of donation funds'],
      },
      {
        category: 'Family Documents',
        documents: ['Marriage certificate', 'Spouse passport', 'Children birth certificates', 'Dependency declarations'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' }, { name: 'Russia', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Hong Kong', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'Malaysia', type: 'VF' },
          { name: 'Philippines', type: 'VF' }, { name: 'Indonesia', type: 'VoA' }, { name: 'Thailand', type: 'VoA' },
        ],
      },
      {
        region: 'Oceania',
        countries: [
          { name: 'Fiji', type: 'VF' }, { name: 'Papua New Guinea', type: 'VoA' }, { name: 'Solomon Islands', type: 'VoA' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Costa Rica', type: 'VF' }, { name: 'Ecuador', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1 day', description: 'Quick eligibility check and crypto payment options' },
      { step: 2, title: 'Document Preparation', duration: '1-2 weeks', description: 'Gather minimal document requirements' },
      { step: 3, title: 'Application Submission', duration: '1-2 days', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence', duration: '2-3 weeks', description: 'Fast-track background verification' },
      { step: 5, title: 'Approval & Donation', duration: '1 week', description: 'Pay donation upon approval (crypto accepted)' },
      { step: 6, title: 'Citizenship Issued', duration: '1-2 weeks', description: 'Receive certificate, oath, and passport' },
    ],
    faqs: [
      { question: 'Why is Vanuatu the fastest?', answer: 'Vanuatu has streamlined its process with efficient due diligence and no physical presence requirements. Most applications complete in 30-60 days total.' },
      { question: 'Can I really pay in Bitcoin?', answer: 'Yes, Vanuatu was one of the first countries to accept cryptocurrency for citizenship. You can pay in BTC, ETH, and other major cryptocurrencies.' },
      { question: 'What is the tax situation?', answer: 'Vanuatu has zero income tax, capital gains tax, wealth tax, and inheritance tax. There is no requirement to report worldwide income.' },
      { question: 'Is Schengen access included?', answer: 'No, Vanuatu passport does not include Schengen visa-free access. However, it provides access to UK, Singapore, Hong Kong, and about 96 countries.' },
      { question: 'Do I need to visit Vanuatu?', answer: 'No physical visit is required at any stage. The oath of allegiance can be administered at a Vanuatu embassy or consulate.' },
    ],
  },
  // Americas
  {
    id: 'el-salvador',
    country: 'El Salvador',
    region: 'americas',
    flag: '🇸🇻',
    minInvestment: 1000000,
    investmentType: 'Bitcoin or Fiat Donation',
    processingTime: '3-6 weeks',
    visaFreeCountries: 130,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Bitcoin-native', 'Crypto capital gains exempt', 'Fast track'],
    description: 'The world\'s first crypto-friendly citizenship program.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1622495966027-e0173192c728?w=800&q=80',
    isNew: true,
    isCryptoFriendly: true,
    tagline: 'Bitcoin Nation - World\'s first crypto citizenship',
    timezone: 'UTC-6 (CST)',
    language: 'Spanish',
    currency: 'US Dollar (USD), Bitcoin (BTC)',
    population: '6.5 million',
    passportValidity: '5 years',
    aboutCountry: 'El Salvador made history in 2021 as the first country to adopt Bitcoin as legal tender. The country now offers the world\'s first truly crypto-native citizenship program, allowing investors to obtain citizenship through Bitcoin donations with zero tax on crypto capital gains.',
    legalFramework: 'El Salvador Freedom Visa / Citizenship by Investment 2023',
    keyBenefits: [
      { title: 'Bitcoin Legal Tender', description: 'Only country where Bitcoin is official legal tender alongside USD', icon: 'Coins' },
      { title: 'Zero Crypto Tax', description: 'No capital gains tax on Bitcoin or cryptocurrency profits', icon: 'DollarSign' },
      { title: 'Ultra-Fast', description: 'Citizenship processed in 3-6 weeks - among fastest globally', icon: 'Zap' },
    ],
    costBreakdown: {
      donationAmount: 1000000,
      dueDiligence: 10000,
      processingFees: 5000,
      passportFee: 500,
      otherFees: [
        { name: 'Bitcoin Donation Option', amount: 1000000 },
        { name: 'Family Processing', amount: 15000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record, not on sanction lists',
      health: 'No specific health requirements',
      fundsProof: 'Source of crypto or fiat funds verified',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos', 'Proof of address', 'CV/Resume'],
      },
      {
        category: 'Background',
        documents: ['Police clearance', 'Declaration of no sanctions', 'Reference letters'],
      },
      {
        category: 'Financial/Crypto',
        documents: ['Source of funds/Bitcoin', 'Wallet verification (for crypto)', 'Bank statements (for fiat)'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Americas',
        countries: [
          { name: 'All Central America', type: 'VF' }, { name: 'Mexico', type: 'VF' }, { name: 'Brazil', type: 'VF' },
          { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' }, { name: 'Colombia', type: 'VF' },
        ],
      },
      {
        region: 'Europe',
        countries: [
          { name: 'Spain', type: 'VF' }, { name: 'Portugal', type: 'VF' }, { name: 'Italy', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Japan', type: 'VF' }, { name: 'South Korea', type: 'VF' }, { name: 'Taiwan', type: 'VF' },
          { name: 'Philippines', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1 day', description: 'Discuss Bitcoin vs fiat payment options' },
      { step: 2, title: 'Documentation', duration: '1-2 weeks', description: 'Minimal document requirements' },
      { step: 3, title: 'Application', duration: '1-2 days', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Due Diligence', duration: '2-3 weeks', description: 'Background verification' },
      { step: 5, title: 'Donation', duration: '1-3 days', description: 'Transfer BTC or USD upon approval' },
      { step: 6, title: 'Citizenship', duration: '1-2 weeks', description: 'Receive Salvadoran citizenship and passport' },
    ],
    faqs: [
      { question: 'Can I pay entirely in Bitcoin?', answer: 'Yes, El Salvador accepts the full $1 million donation in Bitcoin. The country has official government Bitcoin wallets for receiving citizenship investments.' },
      { question: 'Is there really no tax on crypto gains?', answer: 'Correct. El Salvador has zero capital gains tax on Bitcoin and other cryptocurrency profits. This applies to residents and citizens.' },
      { question: 'What is the passport strength?', answer: 'The Salvadoran passport provides visa-free access to 130 countries including Spain, Japan, South Korea, and all of Latin America.' },
      { question: 'Is this program legitimate?', answer: 'Yes, it\'s an official government program launched as part of El Salvador\'s Bitcoin adoption strategy. The program is regulated and transparent.' },
      { question: 'Do I need to live in El Salvador?', answer: 'No physical presence is required. You can obtain and maintain citizenship without visiting or residing in El Salvador.' },
    ],
  },
  {
    id: 'paraguay',
    country: 'Paraguay',
    region: 'americas',
    flag: '🇵🇾',
    minInvestment: 75000,
    investmentType: 'Bank Deposit + Business',
    processingTime: '3-6 months',
    visaFreeCountries: 142,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Minimal',
    highlights: ['Lowest investment', 'Path to Mercosur', 'Tax-friendly'],
    description: 'Most affordable residency with path to citizenship in South America.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=800&q=80',
    isNew: true,
    tagline: 'South American Gateway - Path to Mercosur',
    timezone: 'UTC-4 (PYT)',
    language: 'Spanish, Guarani',
    currency: 'Paraguayan Guarani (PYG)',
    population: '7.4 million',
    passportValidity: '10 years',
    aboutCountry: 'Paraguay, at the heart of South America, offers one of the most affordable residency programs with a fast path to citizenship. As a Mercosur member, Paraguayan citizens enjoy living and working rights across South America with visa-free access to Europe\'s Schengen zone.',
    legalFramework: 'Paraguayan Immigration Law - Investment Residency',
    keyBenefits: [
      { title: 'Most Affordable', description: 'Residency from just $75,000 - lowest in the Americas', icon: 'DollarSign' },
      { title: 'Fast Citizenship', description: 'Path to citizenship in just 3 years of residency', icon: 'Clock' },
      { title: 'Mercosur Access', description: 'Live and work rights in Brazil, Argentina, Uruguay, and more', icon: 'Globe' },
    ],
    costBreakdown: {
      donationAmount: 75000,
      dueDiligence: 1500,
      processingFees: 2000,
      passportFee: 150,
      otherFees: [
        { name: 'Bank Deposit', amount: 5000 },
        { name: 'Legal Fees', amount: 3000 },
        { name: 'Cedula (ID) Processing', amount: 500 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record',
      health: 'Medical certificate showing good health',
      fundsProof: 'Proof of regular income or investment funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport (apostilled)', 'Birth certificate (apostilled)', 'Passport photos (10)', 'Marriage certificate (if applicable)'],
      },
      {
        category: 'Background',
        documents: ['Police clearance (apostilled)', 'INTERPOL clearance', 'Character references'],
      },
      {
        category: 'Financial',
        documents: ['Bank statement showing $5,000+', 'Proof of income', 'Business plan (if applicable)', 'Investment proof'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'All Schengen', type: 'VF' }, { name: 'UK', type: 'VF' }, { name: 'Ireland', type: 'VF' },
          { name: 'Russia', type: 'VF' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'All Mercosur', type: 'VF' }, { name: 'USA (B1/B2)', type: 'VF' }, { name: 'Canada', type: 'eTA' },
          { name: 'Mexico', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Japan', type: 'VF' }, { name: 'South Korea', type: 'VF' }, { name: 'Singapore', type: 'VF' },
          { name: 'Hong Kong', type: 'VF' }, { name: 'Israel', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Choose investment option and plan visit' },
      { step: 2, title: 'Documentation', duration: '2-4 weeks', description: 'Prepare and apostille documents' },
      { step: 3, title: 'Application & Visit', duration: '1 week', description: 'Brief visit to Paraguay for biometrics ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '2-4 months', description: 'Immigration review and approval' },
      { step: 5, title: 'Residency Issued', duration: '2 weeks', description: 'Receive permanent residency card (Cedula)' },
      { step: 6, title: 'Path to Citizenship', duration: '3 years', description: 'Apply for citizenship after 3 years' },
    ],
    faqs: [
      { question: 'What is the total investment required?', answer: 'You need approximately $75,000 in investment or business capital, plus a $5,000 bank deposit that you can use after receiving residency.' },
      { question: 'Can I get citizenship?', answer: 'Yes, after 3 years of permanent residency, you can apply for Paraguayan citizenship. Basic Spanish is required for the citizenship interview.' },
      { question: 'What is Mercosur access?', answer: 'As a Paraguayan citizen, you have the right to live and work in all Mercosur countries: Brazil, Argentina, Uruguay, Bolivia, and associate members Chile and Peru.' },
      { question: 'Do I need to visit?', answer: 'An initial visit of about 1 week is required for biometrics and finalizing residency. After that, minimal presence is needed to maintain status.' },
      { question: 'What is the tax system?', answer: 'Paraguay has a territorial tax system - you only pay tax on income earned within Paraguay. Foreign income is not taxed.' },
    ],
  },
  // Africa
  {
    id: 'sao-tome',
    country: 'São Tomé & Príncipe',
    region: 'africa',
    flag: '🇸🇹',
    minInvestment: 90000,
    investmentType: 'Donation',
    processingTime: '45-50 days',
    visaFreeCountries: 141,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['100% online', 'Fastest Africa CBI', 'Portuguese-speaking'],
    description: 'One of the fastest and most affordable African citizenship programs.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    isNew: true,
    tagline: 'Africa\'s Fastest - 100% online processing in 45 days',
    timezone: 'UTC+0 (GMT)',
    language: 'Portuguese',
    currency: 'São Tomé Dobra (STN)',
    population: '223,000',
    passportValidity: '5 years',
    aboutCountry: 'São Tomé and Príncipe is an island nation in the Gulf of Guinea, off the coast of Central Africa. Known for its stunning beaches, volcanic landscapes, and Portuguese colonial architecture, it offers one of the newest and fastest citizenship by investment programs in the world.',
    legalFramework: 'Law No. 17/2015 on Citizenship by Investment',
    keyBenefits: [
      { title: '100% Remote', description: 'Entire process completed online with no physical presence required', icon: 'Globe' },
      { title: 'Ultra-Fast', description: 'Citizenship granted in just 45-50 days - Africa\'s fastest program', icon: 'Zap' },
      { title: 'Portuguese Access', description: 'Gateway to Portuguese-speaking nations and CPLP community', icon: 'Users' },
    ],
    costBreakdown: {
      donationAmount: 90000,
      dueDiligence: 5000,
      processingFees: 3000,
      passportFee: 500,
      otherFees: [
        { name: 'Government Fee', amount: 1500 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record with no convictions',
      health: 'Good health status (no communicable diseases)',
      fundsProof: 'Legitimate source of investment funds',
    },
    requiredDocuments: [
      {
        category: 'Personal & Identification',
        documents: ['Valid passport (certified copy)', 'Birth certificate (apostilled)', 'Passport photos (8)', 'CV/Resume', 'Proof of address'],
      },
      {
        category: 'Criminal Background',
        documents: ['Police clearance from country of origin', 'Police clearance from country of residence', 'Declaration of no pending criminal proceedings'],
      },
      {
        category: 'Financial & Supporting',
        documents: ['Bank reference letter', 'Bank statements (6 months)', 'Source of funds declaration', 'Proof of investment funds availability'],
      },
      {
        category: 'Marriage & Dependents',
        documents: ['Marriage certificate (if applicable)', 'Spouse documents', 'Children birth certificates', 'Dependency proof for adult dependents'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'Portugal', type: 'VF' }, { name: 'France', type: 'VF' }, { name: 'Germany', type: 'VF' },
          { name: 'Spain', type: 'VF' }, { name: 'Italy', type: 'VF' }, { name: 'Netherlands', type: 'VF' },
          { name: 'Belgium', type: 'VF' }, { name: 'Switzerland', type: 'VF' }, { name: 'Austria', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Singapore', type: 'VF' }, { name: 'Hong Kong', type: 'VF' }, { name: 'Malaysia', type: 'VF' },
          { name: 'Philippines', type: 'VF' }, { name: 'Indonesia', type: 'VoA' }, { name: 'Thailand', type: 'VoA' },
        ],
      },
      {
        region: 'Africa',
        countries: [
          { name: 'South Africa', type: 'VF' }, { name: 'Kenya', type: 'VoA' }, { name: 'Tanzania', type: 'VoA' },
          { name: 'Rwanda', type: 'VoA' }, { name: 'Mozambique', type: 'VF' }, { name: 'Angola', type: 'VF' },
        ],
      },
      {
        region: 'Americas',
        countries: [
          { name: 'Brazil', type: 'VF' }, { name: 'Argentina', type: 'VF' }, { name: 'Chile', type: 'VF' },
          { name: 'Colombia', type: 'VF' }, { name: 'Peru', type: 'VF' }, { name: 'Ecuador', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'Free eligibility assessment and program overview' },
      { step: 2, title: 'Document Preparation', duration: '1-2 weeks', description: 'Collect and notarize required documents' },
      { step: 3, title: 'Application Submission', duration: '1 week', description: 'Submit application with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Government Review', duration: '30-40 days', description: 'Due diligence and background verification' },
      { step: 5, title: 'Investment Payment', duration: '1 week', description: 'Complete donation payment upon approval' },
      { step: 6, title: 'Citizenship Issued', duration: '5-7 days', description: 'Receive citizenship certificate and passport' },
    ],
    faqs: [
      { question: 'What is the minimum investment required?', answer: 'The minimum donation is $90,000 for a single applicant. Additional fees apply for family members.' },
      { question: 'Can I include my family in the application?', answer: 'Yes, you can include your spouse, children under 26, and parents over 55 as dependents.' },
      { question: 'Is the process fully remote?', answer: 'Yes, the entire application process is 100% online. No visit to São Tomé is required at any stage.' },
      { question: 'How fast can I get citizenship?', answer: 'The program processes applications in 45-50 days, making it one of the fastest in the world.' },
      { question: 'Does São Tomé allow dual citizenship?', answer: 'Yes, dual citizenship is fully permitted. You don\'t need to renounce your existing nationality.' },
      { question: 'What is the passport\'s visa-free access?', answer: 'The São Toméan passport provides visa-free or visa-on-arrival access to 141 countries including the entire Schengen Area, UK, Singapore, and Hong Kong.' },
    ],
  },
  // Asia
  {
    id: 'cambodia',
    country: 'Cambodia',
    region: 'asia',
    flag: '🇰🇭',
    minInvestment: 245000,
    investmentType: 'Donation',
    processingTime: '2-3 months',
    visaFreeCountries: 54,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Fast processing', 'Crypto-friendly', 'Low profile'],
    description: 'Emerging Asian citizenship program with fast processing and crypto acceptance.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&q=80',
    isNew: true,
    isCryptoFriendly: true,
    tagline: 'Southeast Asian Gateway - Fast and crypto-friendly',
    timezone: 'UTC+7 (ICT)',
    language: 'Khmer, English',
    currency: 'Cambodian Riel (KHR) / USD',
    population: '16.7 million',
    passportValidity: '10 years',
    aboutCountry: 'Cambodia, home to the ancient Angkor Wat temples, offers an emerging citizenship by investment program. With its dollarized economy, crypto-friendly regulations, and strategic Southeast Asian location, Cambodia is attracting entrepreneurs and digital nomads.',
    legalFramework: 'Cambodian Nationality Law - Investment Naturalization',
    keyBenefits: [
      { title: 'Fast Processing', description: 'Citizenship granted in just 2-3 months', icon: 'Zap' },
      { title: 'Crypto-Friendly', description: 'Welcoming environment for cryptocurrency and blockchain businesses', icon: 'Coins' },
      { title: 'Low Profile', description: 'Discrete program with minimal international attention', icon: 'Eye' },
    ],
    costBreakdown: {
      donationAmount: 245000,
      dueDiligence: 5000,
      processingFees: 3000,
      passportFee: 200,
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record',
      health: 'Good health status',
      fundsProof: 'Legitimate source of funds documentation',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos (10)', 'CV/Resume'],
      },
      {
        category: 'Background Check',
        documents: ['Police clearance certificate', 'Character references'],
      },
      {
        category: 'Financial Documents',
        documents: ['Bank statements (6 months)', 'Source of funds declaration', 'Proof of investment funds'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Asia',
        countries: [
          { name: 'Vietnam', type: 'VF' }, { name: 'Laos', type: 'VF' }, { name: 'Thailand', type: 'VF' },
          { name: 'Malaysia', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'Philippines', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Eligibility review and document preparation' },
      { step: 2, title: 'Document Collection', duration: '2-3 weeks', description: 'Gather required documents' },
      { step: 3, title: 'Application', duration: '1 week', description: 'Submit with Passport Capital fees ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '6-8 weeks', description: 'Government review and approval' },
      { step: 5, title: 'Investment', duration: '1-2 weeks', description: 'Complete donation payment' },
      { step: 6, title: 'Citizenship', duration: '1-2 weeks', description: 'Receive citizenship documents and passport' },
    ],
    faqs: [
      { question: 'Is this a legitimate program?', answer: 'Yes, Cambodia has provisions for citizenship by investment under its Nationality Law. The program operates with government approval.' },
      { question: 'Can I include my family?', answer: 'Yes, spouse and dependent children can be included in the application for additional fees.' },
      { question: 'What is the passport strength?', answer: 'The Cambodian passport provides visa-free access to 54 countries, primarily in Southeast Asia and Africa.' },
    ],
  },
  // Additional Pacific
  {
    id: 'nauru',
    country: 'Nauru',
    region: 'pacific',
    flag: '🇳🇷',
    minInvestment: 100000,
    investmentType: 'Donation',
    processingTime: '1-2 months',
    visaFreeCountries: 78,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Not required',
    highlights: ['Fastest Pacific option', 'Tax-free', 'Low investment'],
    description: 'Small Pacific island nation offering fast and affordable citizenship.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    isNew: true,
    tagline: 'Pacific Paradise - Fast and tax-free citizenship',
    timezone: 'UTC+12 (NRT)',
    language: 'Nauruan, English',
    currency: 'Australian Dollar (AUD)',
    population: '10,000',
    passportValidity: '10 years',
    aboutCountry: 'Nauru, the world\'s smallest island nation, offers a citizenship by investment program with fast processing and zero taxation. Despite its small size, Nauru provides an attractive passport with good Pacific and Asian travel access.',
    legalFramework: 'Nauru Citizenship Act - Economic Citizenship Program',
    keyBenefits: [
      { title: 'Fastest Pacific', description: 'Citizenship processed in just 1-2 months', icon: 'Zap' },
      { title: 'Zero Tax', description: 'No income tax, capital gains tax, or inheritance tax', icon: 'DollarSign' },
      { title: 'Affordable', description: 'One of the lowest investment thresholds in the Pacific', icon: 'TrendingUp' },
    ],
    costBreakdown: {
      donationAmount: 100000,
      dueDiligence: 3000,
      processingFees: 2000,
      passportFee: 200,
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record',
      health: 'Good health status',
      fundsProof: 'Legitimate source of funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos (6)'],
      },
      {
        category: 'Background',
        documents: ['Police clearance certificate', 'Character references'],
      },
      {
        category: 'Financial',
        documents: ['Bank statements (3 months)', 'Source of funds declaration'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Oceania',
        countries: [
          { name: 'Australia', type: 'VF' }, { name: 'Fiji', type: 'VF' }, { name: 'Samoa', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Hong Kong', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'Philippines', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Quick eligibility assessment' },
      { step: 2, title: 'Documents', duration: '1-2 weeks', description: 'Gather minimal requirements' },
      { step: 3, title: 'Application', duration: '1-2 days', description: 'Submit with fees ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '3-5 weeks', description: 'Government review' },
      { step: 5, title: 'Donation', duration: '1 week', description: 'Complete payment upon approval' },
      { step: 6, title: 'Citizenship', duration: '1-2 weeks', description: 'Receive passport' },
    ],
    faqs: [
      { question: 'Is Nauru a real country?', answer: 'Yes, Nauru is a sovereign island nation and UN member state located in the Pacific Ocean, northeast of Australia.' },
      { question: 'What is the passport strength?', answer: 'The Nauruan passport provides visa-free access to 78 countries including Australia, Fiji, and several Asian nations.' },
    ],
  },
  // Additional Africa
  {
    id: 'mauritius',
    country: 'Mauritius',
    region: 'africa',
    flag: '🇲🇺',
    minInvestment: 375000,
    investmentType: 'Real Estate',
    processingTime: '2-3 months',
    visaFreeCountries: 146,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'Minimal',
    highlights: ['Best African lifestyle', 'English-speaking', 'Tax-efficient'],
    description: 'Premier African island offering excellent residency with lifestyle benefits.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800&q=80',
    isNew: true,
    tagline: 'Island Paradise - Africa\'s premier lifestyle destination',
    timezone: 'UTC+4 (MUT)',
    language: 'English, French, Creole',
    currency: 'Mauritian Rupee (MUR)',
    population: '1.3 million',
    passportValidity: '10 years',
    aboutCountry: 'Mauritius, consistently ranked as Africa\'s most developed economy, offers the Premium Visa and residency programs. With its stunning beaches, stable democracy, and English-speaking environment, Mauritius is the top destination for expats seeking African residency.',
    legalFramework: 'Mauritius Residency by Investment Program',
    keyBenefits: [
      { title: 'Premium Lifestyle', description: 'World-class beaches, healthcare, and international schools', icon: 'Sun' },
      { title: 'Tax Efficient', description: '15% flat tax rate with no capital gains or inheritance tax', icon: 'DollarSign' },
      { title: 'English Speaking', description: 'Fully English-speaking with British legal system heritage', icon: 'Globe' },
    ],
    costBreakdown: {
      realEstateMin: 375000,
      dueDiligence: 3000,
      processingFees: 2500,
      passportFee: 0,
      otherFees: [
        { name: 'Premium Visa', amount: 500 },
        { name: 'Legal Fees', amount: 5000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record',
      health: 'Good health status with valid insurance',
      fundsProof: 'Proof of investment funds or income',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Birth certificate', 'Passport photos (6)', 'Marriage certificate'],
      },
      {
        category: 'Property Documents',
        documents: ['Sale agreement', 'Property valuation', 'Proof of payment'],
      },
      {
        category: 'Background & Financial',
        documents: ['Police clearance', 'Bank statements (6 months)', 'Health insurance', 'Income proof'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Europe',
        countries: [
          { name: 'UK', type: 'VF' }, { name: 'All Schengen', type: 'VF' }, { name: 'Switzerland', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Singapore', type: 'VF' }, { name: 'Hong Kong', type: 'VF' }, { name: 'Malaysia', type: 'VF' },
        ],
      },
      {
        region: 'Africa',
        countries: [
          { name: 'South Africa', type: 'VF' }, { name: 'Kenya', type: 'VF' }, { name: 'Seychelles', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Review property options and eligibility' },
      { step: 2, title: 'Property Search', duration: '2-4 weeks', description: 'Find qualifying property' },
      { step: 3, title: 'Purchase', duration: '4-6 weeks', description: 'Complete property purchase' },
      { step: 4, title: 'Application', duration: '1-2 weeks', description: 'Submit with fees ($450 + 2.5%)' },
      { step: 5, title: 'Processing', duration: '4-8 weeks', description: 'Government review' },
      { step: 6, title: 'Residency', duration: '1-2 weeks', description: 'Receive residence permit' },
    ],
    faqs: [
      { question: 'Can I get citizenship?', answer: 'After 2 years of residency, you can apply for permanent residency. Citizenship is possible after extended residency.' },
      { question: 'What is the tax system?', answer: 'Mauritius has a flat 15% income tax with no capital gains, inheritance, or wealth tax.' },
      { question: 'Is this good for families?', answer: 'Yes, Mauritius has excellent international schools, healthcare, and is considered one of the safest countries in Africa.' },
    ],
  },
  // Additional Middle East
  {
    id: 'oman',
    country: 'Oman',
    region: 'middle-east',
    flag: '🇴🇲',
    minInvestment: 100000,
    investmentType: 'Business or Real Estate',
    processingTime: '3-6 months',
    visaFreeCountries: 86,
    familyInclusion: true,
    dualCitizenship: false,
    physicalPresence: 'Minimal',
    highlights: ['GCC access', 'Tax-free', 'Safe & stable'],
    description: 'Emerging Gulf residency program with strategic Middle East access.',
    programType: 'residency',
    image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80',
    isNew: true,
    tagline: 'Gulf Gateway - Strategic Middle East access',
    timezone: 'UTC+4 (GST)',
    language: 'Arabic, English',
    currency: 'Omani Rial (OMR)',
    population: '5.1 million',
    passportValidity: 'N/A (Residency)',
    aboutCountry: 'Oman, known for its stunning landscapes and rich culture, offers a Golden Visa residency program. As one of the safest countries in the Middle East, Oman provides GCC access, zero income tax, and a high quality of life.',
    legalFramework: 'Oman Golden Visa Program 2021',
    keyBenefits: [
      { title: 'GCC Access', description: 'Easy access to Gulf Cooperation Council countries', icon: 'Globe' },
      { title: 'Zero Tax', description: 'No personal income tax on earnings', icon: 'DollarSign' },
      { title: 'Safe Haven', description: 'One of the safest and most stable countries in the region', icon: 'Shield' },
    ],
    costBreakdown: {
      investmentRoutes: [
        { name: 'Business', amount: 100000, icon: 'Briefcase' },
        { name: 'Real Estate', amount: 250000, icon: 'Home' },
      ],
      dueDiligence: 2000,
      processingFees: 3000,
      passportFee: 0,
      sharedFees: [
        { name: 'Legal Fees', amount: 3000 },
      ],
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Clean criminal record, security clearance',
      health: 'Medical fitness certificate',
      fundsProof: 'Proof of investment funds',
    },
    requiredDocuments: [
      {
        category: 'Personal Identification',
        documents: ['Valid passport', 'Passport photos (8)', 'CV/Resume'],
      },
      {
        category: 'Investment Documents',
        documents: ['Property deed or business license', 'Investment proof', 'Bank statements'],
      },
      {
        category: 'Background',
        documents: ['Police clearance', 'Medical certificate', 'Security clearance'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Middle East',
        countries: [
          { name: 'UAE', type: 'VF' }, { name: 'Qatar', type: 'VF' }, { name: 'Bahrain', type: 'VF' },
          { name: 'Kuwait', type: 'VF' },
        ],
      },
      {
        region: 'Asia',
        countries: [
          { name: 'Malaysia', type: 'VF' }, { name: 'Singapore', type: 'VF' }, { name: 'Indonesia', type: 'VoA' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Consultation', duration: '1-2 days', description: 'Choose investment option' },
      { step: 2, title: 'Investment', duration: '4-8 weeks', description: 'Complete property purchase or business setup' },
      { step: 3, title: 'Application', duration: '1-2 weeks', description: 'Submit with fees ($450 + 2.5%)' },
      { step: 4, title: 'Processing', duration: '2-4 months', description: 'Government review' },
      { step: 5, title: 'Approval', duration: '2-4 weeks', description: 'Receive approval' },
      { step: 6, title: 'Residency', duration: '1-2 weeks', description: 'Collect residence card' },
    ],
    faqs: [
      { question: 'Can I get citizenship?', answer: 'Oman does not offer citizenship by investment, but long-term residency is available through the Golden Visa program.' },
      { question: 'What are the investment options?', answer: 'Real estate ($250,000+), business investment ($100,000+), or employment-based categories.' },
      { question: 'Is it safe?', answer: 'Yes, Oman is consistently ranked as one of the safest countries in the Middle East with low crime rates.' },
    ],
  },
  // Additional Europe
  {
    id: 'austria',
    country: 'Austria',
    region: 'europe',
    flag: '🇦🇹',
    minInvestment: 3000000,
    investmentType: 'Major Investment',
    processingTime: '24-36 months',
    visaFreeCountries: 188,
    familyInclusion: true,
    dualCitizenship: false,
    physicalPresence: 'Not required initially',
    highlights: ['Strongest EU passport', 'Highly exclusive', 'Top-tier benefits'],
    description: 'The most prestigious EU citizenship program for ultra-high-net-worth individuals.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
    tagline: 'Ultimate Prestige - Europe\'s most exclusive citizenship',
    timezone: 'UTC+1 (CET)',
    language: 'German',
    currency: 'Euro (EUR)',
    population: '9 million',
    passportValidity: '10 years',
    aboutCountry: 'Austria offers one of the world\'s most prestigious citizenship programs, reserved for individuals making extraordinary contributions. With one of the strongest passports globally, Austrian citizenship provides elite EU access and exceptional quality of life.',
    legalFramework: 'Austrian Citizenship Act - Exceptional Naturalization',
    keyBenefits: [
      { title: 'Top Passport', description: 'Austrian passport ranks among the top 5 globally with 188 countries visa-free', icon: 'Award' },
      { title: 'EU Citizenship', description: 'Full rights to live and work anywhere in the European Union', icon: 'Star' },
      { title: 'Elite Status', description: 'Highly exclusive program for distinguished individuals only', icon: 'Crown' },
    ],
    costBreakdown: {
      donationAmount: 3000000,
      dueDiligence: 50000,
      processingFees: 25000,
      passportFee: 500,
    },
    eligibility: {
      age: 'Primary applicant must be 18 years or older',
      character: 'Exceptional character and achievements',
      health: 'Good health status',
      fundsProof: 'Substantial net worth documentation',
    },
    requiredDocuments: [
      {
        category: 'Personal',
        documents: ['Valid passport', 'Birth certificate', 'CV/Resume', 'Achievement portfolio'],
      },
      {
        category: 'Investment',
        documents: ['Investment proposal', 'Business plan', 'Proof of funds', 'Economic contribution plan'],
      },
      {
        category: 'Background',
        documents: ['Police clearance', 'Reference letters from notable figures', 'Media profile'],
      },
    ],
    visaFreeByRegion: [
      {
        region: 'Global',
        countries: [
          { name: 'All EU', type: 'VF' }, { name: 'USA', type: 'VF' }, { name: 'UK', type: 'VF' },
          { name: 'Japan', type: 'VF' }, { name: 'Australia', type: 'VF' }, { name: 'Canada', type: 'VF' },
        ],
      },
    ],
    timeline: [
      { step: 1, title: 'Preliminary Review', duration: '2-4 weeks', description: 'Initial eligibility assessment' },
      { step: 2, title: 'Proposal Development', duration: '2-3 months', description: 'Prepare investment proposal' },
      { step: 3, title: 'Government Submission', duration: '1 month', description: 'Submit to Austrian authorities' },
      { step: 4, title: 'Review Process', duration: '12-24 months', description: 'Extensive government review' },
      { step: 5, title: 'Investment', duration: '2-3 months', description: 'Complete investment upon approval' },
      { step: 6, title: 'Citizenship', duration: '2-4 months', description: 'Naturalization ceremony and passport' },
    ],
    faqs: [
      { question: 'Why is this so expensive?', answer: 'Austria\'s program is for exceptional individuals making significant economic or cultural contributions. It\'s not a standard CBI program but a discretionary naturalization path.' },
      { question: 'Is approval guaranteed?', answer: 'No, Austrian citizenship by investment is highly discretionary. Each case is evaluated individually by the government.' },
      { question: 'Can I keep my current citizenship?', answer: 'Generally no. Austria typically requires renunciation of existing citizenship, though exceptions may be granted.' },
    ],
  },
  // Coming Soon Programs
  {
    id: 'montenegro',
    country: 'Montenegro',
    region: 'europe',
    flag: '🇲🇪',
    minInvestment: 450000,
    investmentType: 'Real Estate or Donation',
    processingTime: 'TBD',
    visaFreeCountries: 124,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'To be announced',
    highlights: ['Future EU member', 'Beautiful coastline', 'Relaunching soon'],
    description: 'European program expected to relaunch with enhanced benefits.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
    comingSoon: true,
    tagline: 'Coming Soon - Future EU citizenship opportunity',
    timezone: 'UTC+1 (CET)',
    language: 'Montenegrin',
    currency: 'Euro (EUR)',
    population: '620,000',
    passportValidity: '10 years',
    aboutCountry: 'Montenegro, a stunning Adriatic nation and EU candidate country, previously offered one of Europe\'s most attractive CBI programs. The program is expected to relaunch with enhanced features as Montenegro progresses toward EU membership.',
    legalFramework: 'Montenegrin Citizenship by Investment Program (Relaunching)',
    keyBenefits: [
      { title: 'EU Accession Path', description: 'Montenegro is an EU candidate expected to join by 2028', icon: 'Star' },
      { title: 'Adriatic Paradise', description: 'Stunning coastline rivaling Croatia at fraction of cost', icon: 'Sun' },
      { title: 'Enhanced Program', description: 'Relaunch expected with improved benefits and processing', icon: 'TrendingUp' },
    ],
  },
  {
    id: 'samoa',
    country: 'Samoa',
    region: 'pacific',
    flag: '🇼🇸',
    minInvestment: 150000,
    investmentType: 'Donation',
    processingTime: 'TBD',
    visaFreeCountries: 131,
    familyInclusion: true,
    dualCitizenship: true,
    physicalPresence: 'To be announced',
    highlights: ['Pacific alternative', 'Strong passport', 'Coming soon'],
    description: 'Pacific island nation developing a new citizenship by investment program.',
    programType: 'citizenship',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    comingSoon: true,
    tagline: 'Coming Soon - Pacific island citizenship alternative',
    timezone: 'UTC+13 (WST)',
    language: 'Samoan, English',
    currency: 'Samoan Tala (WST)',
    population: '200,000',
    passportValidity: '10 years',
    aboutCountry: 'Samoa, a beautiful Pacific island nation, is developing a citizenship by investment program as an alternative to Vanuatu. With its strong passport and Polynesian culture, Samoa offers a unique Pacific citizenship opportunity.',
    legalFramework: 'Samoan Citizenship Program (In Development)',
    keyBenefits: [
      { title: 'Strong Passport', description: 'Samoan passport provides access to 131 countries', icon: 'Globe' },
      { title: 'Pacific Beauty', description: 'Pristine beaches and authentic Polynesian culture', icon: 'Sun' },
      { title: 'New Opportunity', description: 'Fresh program with potential competitive advantages', icon: 'Sparkles' },
    ],
  },
];
export const regions = [
  { id: 'all', name: 'All Regions' },
  { id: 'caribbean', name: 'Caribbean' },
  { id: 'europe', name: 'Europe' },
  { id: 'middle-east', name: 'Middle East' },
  { id: 'pacific', name: 'Pacific' },
  { id: 'americas', name: 'Americas' },
  { id: 'africa', name: 'Africa' },
  { id: 'asia', name: 'Asia' },
];

export const programTypes = [
  { id: 'all', name: 'All Programs' },
  { id: 'citizenship', name: 'Citizenship' },
  { id: 'residency', name: 'Residency' },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getProgramById = (id: string): Program | undefined => {
  return programs.find(p => p.id === id);
};
