-- =====================================================
-- PASSPORT CAPITAL — CONSULTATION DESK MIGRATION
-- =====================================================

-- Drop old tables (if they exist)
DROP TABLE IF EXISTS contact_enquiries CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Drop old enums
DROP TYPE IF EXISTS enquiry_status CASCADE;
DROP TYPE IF EXISTS app_role CASCADE;

-- =====================================================
-- TABLE: programs
-- =====================================================
create table programs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  country text not null,
  flag_emoji text,
  region text not null,
  program_type text not null,
  program_name text not null,
  slug text unique not null,

  tagline text,
  description text,
  highlights text[],

  min_investment integer not null,
  max_investment integer,
  advisory_fee_min integer,
  advisory_fee_max integer,
  processing_time text,
  visa_free_countries integer,
  success_rate text,

  investment_options jsonb,

  min_age integer default 18,
  criminal_record_allowed boolean default false,
  net_worth_required text,
  source_of_funds_required boolean default true,
  eligible_nationalities text[],
  excluded_nationalities text[],

  required_documents text[],
  due_diligence_stages text[],

  family_included boolean default true,
  spouse_included boolean default true,
  children_age_limit integer,
  parents_included boolean default false,
  siblings_included boolean default false,
  family_notes text,

  benefits text[],
  travel_access_highlights text[],

  crypto_accepted boolean default false,
  crypto_notes text,

  consultant_pitch text,
  ideal_client_profile text,
  key_talking_points text[],
  objections jsonb,
  competitor_comparison text,
  red_flags text[],
  closing_tips text,

  is_active boolean default true,
  is_featured boolean default false,
  sort_order integer default 0
);

-- =====================================================
-- TABLE: enquiries
-- =====================================================
create table enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  full_name text not null,
  email text,
  whatsapp text,
  country_of_residence text,
  nationality text,

  program_interest text,
  budget_range text,
  timeline text,
  programs_of_interest text[],

  source text,
  referral_partner text,
  notes text,

  status text default 'new',
  assigned_to text,
  last_contacted_at timestamptz
);

-- =====================================================
-- TABLE: admin_users
-- =====================================================
create table admin_users (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text unique not null,
  name text,
  role text default 'consultant',
  is_active boolean default true
);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table programs enable row level security;
alter table enquiries enable row level security;
alter table admin_users enable row level security;

create policy "Public can read active programs"
  on programs for select
  using (is_active = true);

create policy "Authenticated full access to programs"
  on programs for all
  using (auth.role() = 'authenticated');

create policy "Authenticated full access to enquiries"
  on enquiries for all
  using (auth.role() = 'authenticated');

create policy "Authenticated full access to admin_users"
  on admin_users for all
  using (auth.role() = 'authenticated');

-- =====================================================
-- SEED DATA: 6 PROGRAMS
-- =====================================================

-- 1. ST. KITTS & NEVIS
insert into programs (
  country, flag_emoji, region, program_type, program_name, slug,
  tagline, description,
  min_investment, processing_time, visa_free_countries,
  investment_options,
  required_documents,
  benefits,
  key_talking_points,
  objections,
  consultant_pitch,
  ideal_client_profile,
  red_flags,
  closing_tips,
  is_featured, sort_order
) values (
  'St. Kitts & Nevis', '🇰🇳', 'caribbean', 'citizenship', 
  'St. Kitts & Nevis Citizenship by Investment', 'st-kitts-nevis',
  'The world''s oldest CBI program. Gold standard since 1984.',
  'St. Kitts & Nevis offers the most established citizenship by investment program globally, with over 40 years of track record and one of the strongest passports in the Caribbean.',
  250000, '2-4 months', 157,
  '[
    {"type": "Sustainable Island State Contribution (SISC)", "amount": 250000, "description": "Direct government contribution. Fastest route. No investment asset held.", "recommended": true},
    {"type": "Real Estate", "amount": 400000, "description": "Investment in approved real estate. Can be resold after 7 years.", "recommended": false}
  ]'::jsonb,
  ARRAY['Valid passport (all pages)', 'Birth certificate', 'Marriage certificate (if applicable)', 'Police clearance certificate', 'Bank reference letter', 'Bank statements (6 months)', 'Source of funds declaration', 'Medical certificate', 'Passport photos'],
  ARRAY['Visa-free access to 157 countries including UK, Schengen, Singapore', 'No residency requirement', 'Citizenship for life — hereditary', 'Include spouse, children up to 28, parents, grandparents', 'Tax neutral — no worldwide income tax', 'Dual citizenship permitted'],
  ARRAY['Oldest CBI program in the world — 40 years of credibility', 'One of the fastest processing times: 2-4 months', '157 countries visa-free including UK and Schengen', 'No physical residency required — ever', 'Entire family on one application'],
  '[
    {"objection": "It''s too expensive", "response": "The $250K SISC option is actually the most cost-efficient path to a strong second passport globally. Compare this to Portugal Golden Visa at €500K — and you get citizenship, not just residency. You''re buying 157 countries of access and a generational asset."},
    {"objection": "I''ve never heard of St. Kitts", "response": "That''s exactly why it works. It''s a sovereign nation with 40 years of CBI history, full UN membership, Commonwealth status, and a passport that opens the UK, Schengen, and Singapore. Size doesn''t determine passport strength."},
    {"objection": "What if the program closes down?", "response": "This program has survived 4 decades and multiple global crises. It''s enshrined in the country''s constitution as a revenue source. It''s not going anywhere."},
    {"objection": "How do I know my application will be approved?", "response": "We have a 99% approval rate on St. Kitts applications. The due diligence process is thorough upfront — we only submit applications we are confident will pass."}
  ]'::jsonb,
  'St. Kitts is our flagship recommendation for clients who want the strongest Caribbean passport, fastest processing, and no residency obligation. If your client wants a clean, fast, credible second citizenship — this is the answer. Lead with the 40-year track record and the UK/Schengen access. Close on the generational angle — citizenship passes to children and grandchildren forever.',
  'Best for: Entrepreneurs from Africa, Middle East, and South Asia who travel frequently and need visa-free access to Europe and UK. Also ideal for family legacy planners who want to pass citizenship to future generations.',
  ARRAY['Criminal convictions of any kind', 'Nationals of sanctioned countries (Iran, North Korea, Russia, Belarus)', 'Unable to demonstrate legitimate source of funds', 'Active bankruptcy or financial fraud history'],
  'Create urgency around processing time — clients who start now can have their passport within 4-6 months total. Use the generational angle for family-oriented clients. If they''re comparing to other programs, point to the 40-year track record as the de-risking factor.',
  true, 1
);

-- 2. DOMINICA
insert into programs (
  country, flag_emoji, region, program_type, program_name, slug,
  tagline, description,
  min_investment, processing_time, visa_free_countries,
  investment_options,
  required_documents,
  benefits,
  key_talking_points,
  objections,
  consultant_pitch,
  ideal_client_profile,
  red_flags,
  closing_tips,
  is_featured, sort_order
) values (
  'Dominica', '🇩🇲', 'caribbean', 'citizenship',
  'Dominica Citizenship by Investment', 'dominica',
  'Most affordable CBI passport. Exceptional value.',
  'Dominica offers one of the most affordable and respected citizenship by investment programs, consistently rated among the top CBI programs globally by independent indices.',
  100000, '3-6 months', 144,
  '[
    {"type": "Economic Diversification Fund (EDF)", "amount": 100000, "description": "Single applicant. Government contribution. Most affordable CBI option globally.", "recommended": true},
    {"type": "EDF — Family of 4", "amount": 175000, "description": "Cover spouse and up to 2 children.", "recommended": false},
    {"type": "Real Estate", "amount": 200000, "description": "Investment in approved property. Resale after 3 years.", "recommended": false}
  ]'::jsonb,
  ARRAY['Valid passport', 'Birth certificate', 'Police clearance', 'Bank statements (6 months)', 'Source of funds letter', 'Medical certificate', 'Passport photos', 'Reference letters (2)'],
  ARRAY['Visa-free access to 144 countries including UK and Schengen', 'Lowest entry price of any reputable CBI program', 'No residency requirement', 'Family included', 'No interview required', 'Dual citizenship allowed'],
  ARRAY['Most affordable reputable CBI program globally at $100K', 'Consistently top-rated by CBI Index', 'No interview, no travel required', 'Fast processing: 3-6 months', 'UK and Schengen visa-free access'],
  '[
    {"objection": "Why is it so cheap? Is it legitimate?", "response": "Dominica has been running this program since 1993 and is consistently ranked #1 or #2 by the independent CBI Index — ahead of St. Kitts. The price reflects the country''s strategy to attract volume. The passport is fully legitimate and recognised globally."},
    {"objection": "144 countries seems less than St. Kitts", "response": "The difference is 13 countries — mostly smaller nations. The key destinations — UK, Schengen, Singapore — are all included. For most clients, the access is functionally identical at less than half the price."},
    {"objection": "I want something more prestigious", "response": "Passport prestige is defined by access, not the country''s profile. Dominica gives you UK and Schengen — that''s the same access as many European passports. If budget allows, we can look at St. Kitts or Grenada for marginal gains."}
  ]'::jsonb,
  'Dominica is the entry point for clients who want a legitimate, fast, respected second citizenship at the lowest possible cost. Lead with the CBI Index ranking — it neutralises the "never heard of it" objection immediately. This is the right recommendation for budget-conscious HNWIs or clients who are testing the CBI waters before a larger investment.',
  'Best for: First-time CBI clients, digital nomads, younger entrepreneurs. Ideal when budget is the primary constraint but legitimacy is non-negotiable.',
  ARRAY['Criminal record', 'Sanctioned country nationals', 'Cannot evidence source of funds'],
  'Lead with the value angle — "$100K for a UK and Schengen passport is unmatched anywhere in the world." If they hesitate on Dominica''s profile, show them the CBI Index ranking. Offer to compare side-by-side with St. Kitts to let them self-select.',
  true, 2
);

-- 3. PORTUGAL GOLDEN VISA
insert into programs (
  country, flag_emoji, region, program_type, program_name, slug,
  tagline, description,
  min_investment, processing_time, visa_free_countries,
  investment_options,
  required_documents,
  benefits,
  key_talking_points,
  objections,
  consultant_pitch,
  ideal_client_profile,
  red_flags,
  closing_tips,
  is_featured, sort_order
) values (
  'Portugal', '🇵🇹', 'europe', 'residency',
  'Portugal Golden Visa', 'portugal-golden-visa',
  'EU residency today. EU citizenship in 5 years.',
  'Portugal''s Golden Visa is the most popular residency by investment program in Europe, offering a clear pathway to EU citizenship after 5 years with minimal physical presence requirements.',
  250000, '12-18 months', 186,
  '[
    {"type": "Investment Fund", "amount": 500000, "description": "Investment in approved Portuguese investment funds. Most popular option post-2022 reform.", "recommended": true},
    {"type": "Arts & Culture Donation", "amount": 250000, "description": "Donation to arts, culture or heritage. Lowest entry point.", "recommended": false},
    {"type": "Scientific Research", "amount": 500000, "description": "Capital transfer to research activities.", "recommended": false}
  ]'::jsonb,
  ARRAY['Valid passport', 'Birth certificate', 'Criminal record certificate (apostilled)', 'Proof of investment', 'Health insurance', 'NIF (Portuguese tax number)', 'Bank statements', 'Source of funds declaration', 'Marriage/divorce certificates if applicable'],
  ARRAY['EU residency with right to live and work in Portugal', 'Visa-free travel across Schengen area', 'Path to Portuguese citizenship after 5 years', 'Minimum stay: 7 days/year only', 'Include entire family', 'Access to Portuguese public healthcare and education', 'EU passport after naturalisation — 186 countries visa-free'],
  ARRAY['Path to full EU citizenship in 5 years', 'Only 7 days per year physical presence required', 'Strongest end-destination passport — 186 countries', 'Include spouse, children, dependent parents', 'Portugal is a stable, developed EU member state'],
  '[
    {"objection": "5 years is too long to wait", "response": "The 5-year wait is for full citizenship — but you get EU residency immediately upon approval. That means you can live, work, study anywhere in the EU from day one. The citizenship is the bonus at the end."},
    {"objection": "I don''t want to live in Portugal", "response": "You don''t have to. The minimum physical presence is just 7 days per year — less than a holiday. You maintain residency status without relocating."},
    {"objection": "€500K is a lot", "response": "You''re not spending €500K — you''re investing it into a Portuguese fund. The capital is preserved and can be redeemed after the lock-in period. Compare this to the $250K SISC in St. Kitts which is a pure donation. Here you keep the money."},
    {"objection": "Is Portugal still doing the Golden Visa? I heard it was cancelled", "response": "The real estate route was closed in 2023, but the program itself continues. Investment fund and donation routes remain open and active. We work with approved fund managers directly."}
  ]'::jsonb,
  'Portugal is the premium recommendation for clients who want the ultimate end-destination — a full EU passport. It takes longer and costs more, but the output is incomparable: 186-country access, EU citizenship, and the right to live anywhere in Europe. Lead with the citizenship pathway and the minimal presence requirement. This is for clients thinking 5+ years ahead, not clients who need a passport now.',
  'Best for: Wealth manager client archetype. Ultra-HNW individuals with longer time horizons. Clients from Africa or Middle East who want an EU base for family, education, or business. Clients who can invest (not donate) capital.',
  ARRAY['Unable to maintain minimum 7 days/year presence', 'Criminal record in Portugal or EU', 'Cannot meet AML/source of funds requirements', 'Urgency — client needs a passport in under 12 months (use Caribbean instead)'],
  'The closing argument is the end-destination passport. No Caribbean program gives you an EU passport. If the client has the capital and the time horizon, Portugal is the most valuable long-term play. Use the "investment not donation" angle to reframe the cost.',
  true, 3
);

-- 4. GRENADA
insert into programs (
  country, flag_emoji, region, program_type, program_name, slug,
  tagline, description,
  min_investment, processing_time, visa_free_countries,
  investment_options,
  required_documents,
  benefits,
  key_talking_points,
  objections,
  consultant_pitch,
  ideal_client_profile,
  red_flags,
  closing_tips,
  is_featured, sort_order
) values (
  'Grenada', '🇬🇩', 'caribbean', 'citizenship',
  'Grenada Citizenship by Investment', 'grenada',
  'The only Caribbean passport with US E-2 Visa access.',
  'Grenada''s CBI program is unique in the Caribbean — it is the only program that enables access to the US E-2 Investor Visa treaty, making it the top choice for clients with US business ambitions.',
  150000, '4-6 months', 144,
  '[
    {"type": "National Transformation Fund (NTF)", "amount": 150000, "description": "Single applicant. Government contribution.", "recommended": true},
    {"type": "NTF — Family of 4", "amount": 200000, "description": "Covers spouse and up to 2 children.", "recommended": false},
    {"type": "Real Estate", "amount": 270000, "description": "Investment in approved property. Resale after 5 years.", "recommended": false}
  ]'::jsonb,
  ARRAY['Valid passport', 'Birth certificate', 'Police clearance', 'Bank statements (6 months)', 'Source of funds declaration', 'Medical certificate', 'Passport photos', 'Business/employment reference'],
  ARRAY['Visa-free access to 144 countries including UK and Schengen', 'Unique US E-2 Investor Visa eligibility', 'No residency requirement', 'Fast processing: 4-6 months', 'Citizenship by descent — hereditary', 'Dual citizenship allowed'],
  ARRAY['Only Caribbean CBI passport that unlocks US E-2 Investor Visa', 'Competitive pricing vs St. Kitts with similar access', 'UK and Schengen included', 'No residency requirement', 'Strong for clients with US business interests'],
  '[
    {"objection": "What makes Grenada different from Dominica?", "response": "One word: the United States. Grenada is the only Caribbean CBI country with a US E-2 Investor Visa treaty. If your client has any business interest in the US, Grenada is the only Caribbean option that opens that door."},
    {"objection": "I don''t need US access", "response": "Then Grenada still competes strongly on price vs St. Kitts, with nearly identical visa-free access. It''s a strong second choice if St. Kitts budget is a stretch."},
    {"objection": "How does the E-2 visa work?", "response": "Once you hold a Grenada passport, you can apply for a US E-2 Investor Visa by investing a substantial amount in a US business. The E-2 is renewable indefinitely and allows you to live and work in the US. It''s not a green card, but it''s the closest alternative for non-US nationals."}
  ]'::jsonb,
  'Grenada is the specialist recommendation — reach for it when a client has US business ambitions. The E-2 Investor Visa angle is a powerful differentiator that no other Caribbean program can match. Lead with the US access angle. If they''re not US-focused, position Grenada as the value alternative to St. Kitts.',
  'Best for: Entrepreneurs targeting the US market. Business owners who want to live or operate in the US without pursuing a green card. Clients from countries with poor US visa access.',
  ARRAY['Criminal record', 'Sanctioned nationals', 'Cannot show source of funds'],
  'If the client has US ambitions, Grenada is a no-brainer — it''s the only path. Make the E-2 the hero. If they''re comparing Grenada vs St. Kitts purely on passport strength, acknowledge St. Kitts is marginally stronger (157 vs 144 countries) but Grenada''s E-2 advantage is unique and irreplaceable.',
  true, 4
);

-- 5. MALTA CITIZENSHIP
insert into programs (
  country, flag_emoji, region, program_type, program_name, slug,
  tagline, description,
  min_investment, processing_time, visa_free_countries,
  investment_options,
  required_documents,
  benefits,
  key_talking_points,
  objections,
  consultant_pitch,
  ideal_client_profile,
  red_flags,
  closing_tips,
  is_featured, sort_order
) values (
  'Malta', '🇲🇹', 'europe', 'citizenship',
  'Malta Citizenship by Naturalisation (MEIN)', 'malta-citizenship',
  'The only direct EU citizenship by investment program.',
  'Malta offers the only legitimate direct citizenship-by-investment route to a full EU passport, through the Malta Exceptional Investor Naturalisation (MEIN) program. This is the pinnacle of CBI programs globally.',
  750000, '12-36 months', 186,
  '[
    {"type": "1-Year Residency Track", "amount": 750000, "description": "€600K government contribution + €700K real estate or €150K rental + €10K donation. Citizenship after 1 year of residency.", "recommended": false},
    {"type": "3-Year Residency Track", "amount": 600000, "description": "€600K government contribution + €700K real estate or €150K rental + €10K donation. Citizenship after 3 years. Lower total cost.", "recommended": true}
  ]'::jsonb,
  ARRAY['Valid passport', 'Birth certificate', 'Marriage certificate', 'Police clearance (all countries of residence in past 10 years)', 'Proof of investment', 'Proof of residency in Malta', 'Financial statements (3 years)', 'Source of wealth declaration', 'Medical certificate', 'Reference letters (2 professional)'],
  ARRAY['Full EU citizenship — not just residency', 'Visa-free access to 186 countries including USA, Canada, Australia', 'Right to live, work, study anywhere in EU', 'Hereditary citizenship', 'Schengen Area access', 'UK visa-free access'],
  ARRAY['Only direct EU citizenship by investment program in the world', '186-country passport including USA, Canada, Australia', 'Full EU rights — live and work anywhere in Europe', 'Generational citizenship passed to descendants', 'Malta is an established, stable EU member state'],
  '[
    {"objection": "This is very expensive", "response": "Malta is the only country in the world offering direct EU citizenship by investment. You are not buying residency — you are buying a full EU passport that opens 186 countries including the USA, Canada, and Australia. The price reflects the uniqueness and the value. There is no other program like this."},
    {"objection": "What''s the difference between Malta and Portugal?", "response": "Portugal gives you residency now and citizenship after 5 years — and you cannot get US/Canada/Australia access on the residency. Malta gives you full citizenship in 1-3 years, with immediate access to all 186 countries including the US. Malta is faster to full citizenship and has a stronger passport."},
    {"objection": "Do I have to live in Malta?", "response": "You need to establish genuine residency, particularly on the 1-year track. On the 3-year track the requirements are more flexible. Our team manages the residency compliance process for you."},
    {"objection": "Is this legal?", "response": "Yes. The MEIN program is legislated by the Maltese government and regulated by Community Malta Agency. Malta is a full EU member state. This is not a grey-market program — it is a sovereign government decision."}
  ]'::jsonb,
  'Malta is the crown jewel. Recommend this to ultra-HNW clients who want the absolute best — a full EU passport, USA visa-free access, and EU citizenship for life. There is no other program in the world that delivers this. Lead with the uniqueness angle: "This is the only direct EU citizenship program that exists." Then reinforce with the 186-country access including USA and Canada. Price objections are addressed by reframing this as acquiring an EU passport, not spending money.',
  'Best for: Ultra-HNW individuals ($5M+ net worth). Clients from sanctioned or restrictive countries (Russia, China, Middle East) who need maximum mobility. Families wanting the best long-term asset for children. The Wealth Manager client archetype.',
  ARRAY['Criminal record — zero tolerance', 'Politically Exposed Persons require enhanced due diligence', 'Nationals of sanctioned countries may be excluded', 'Cannot meet physical residency requirement', 'Cannot demonstrate source of wealth at this level'],
  'The closing argument is exclusivity and finality. "There is only one direct EU citizenship program in the world. Malta is it. Once your client holds this passport, there is nothing more powerful to acquire." For ultra-HNW clients, price is rarely the objection — credibility and privacy are. Reassure on both.',
  false, 5
);

-- 6. UAE GOLDEN VISA
insert into programs (
  country, flag_emoji, region, program_type, program_name, slug,
  tagline, description,
  min_investment, processing_time, visa_free_countries,
  investment_options,
  required_documents,
  benefits,
  key_talking_points,
  objections,
  consultant_pitch,
  ideal_client_profile,
  red_flags,
  closing_tips,
  is_featured, sort_order
) values (
  'UAE', '🇦🇪', 'middle_east', 'residency',
  'UAE Golden Visa', 'uae-golden-visa',
  '10-year renewable residency in the world''s business hub.',
  'The UAE Golden Visa offers long-term residency in one of the world''s premier business and lifestyle destinations, with zero income tax and access to world-class infrastructure.',
  545000, '1-3 months', null,
  '[
    {"type": "Real Estate Investment", "amount": 545000, "description": "AED 2M (approx. $545K) in UAE real estate. Property must be fully paid — no mortgage.", "recommended": true},
    {"type": "Business Investment", "amount": 545000, "description": "AED 2M investment in a UAE business.", "recommended": false}
  ]'::jsonb,
  ARRAY['Valid passport', 'Passport photos', 'Emirates ID application', 'Medical fitness certificate', 'Proof of investment (title deed or business registration)', 'Bank statements'],
  ARRAY['10-year renewable residency (not citizenship)', 'Zero personal income tax', 'Sponsor family members', 'Live, work, and do business in UAE freely', 'Access to UAE banking system', 'No minimum stay requirement to maintain visa', 'World-class healthcare and education'],
  ARRAY['Zero income tax jurisdiction', 'World''s top business hub — Dubai/Abu Dhabi', 'Fastest processing: 1-3 months', 'No minimum stay to maintain status', '10-year renewable — essentially permanent', 'Great for business owners wanting a tax-efficient base'],
  '[
    {"objection": "It''s not citizenship", "response": "Correct — but UAE does not offer citizenship by investment. The Golden Visa is the closest equivalent: 10-year renewable residency with zero income tax, full family sponsorship, and the ability to live and operate freely in one of the world''s top business cities. For many clients, this delivers more practical value than a Caribbean passport."},
    {"objection": "I already have a UAE residency visa", "response": "A standard UAE residency visa is tied to employment or a sponsor. The Golden Visa is independent — you own it. It''s 10 years renewable, not cancelled if you change jobs, and gives you investor status."},
    {"objection": "What about the cost of living in Dubai?", "response": "That''s a lifestyle question separate from the visa. The Golden Visa gives you the option to be based here — you are not obligated to move. Many clients hold the Golden Visa as a tax residency option while living wherever they choose."}
  ]'::jsonb,
  'The UAE Golden Visa is the tax optimization play. Recommend this to clients who want zero income tax residency in a world-class business hub. This is not a passport — but for many HNW entrepreneurs, the tax saving alone justifies the investment within 1-2 years. Lead with the tax angle and the business infrastructure. Best used in combination with a Caribbean CBI: the client gets a travel passport (Caribbean) and a tax residency (UAE).',
  'Best for: Entrepreneurs and business owners who want a zero-tax base. Clients already operating in or around the Middle East. Digital nomads and remote executives. Best as a complement to a Caribbean CBI program.',
  ARRAY['Cannot demonstrate AED 2M in investment capacity', 'Criminal record may affect approval'],
  'The UAE + Caribbean combination pitch is powerful: "You get a strong travel passport AND a zero-tax residency base — two different tools for two different purposes." Many clients don''t realise they can do both. This upsell increases deal value significantly.',
  false, 6
);
