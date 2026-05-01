export const BASE_URL = 'https://passportcapital.com';
export const WHATSAPP_LINK = 'https://wa.me/244787676544';
export const TELEGRAM_LINK = 'https://t.me/passportcapital';
export const CONTACT_EMAIL = 'info@passportcapital.com';
export const CONSULTATION_FEE = 450;
export const COMMITMENT_FEE_RATE = 0.025;

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
