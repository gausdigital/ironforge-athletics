export interface FacilityFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  equipment: string[];
  image: string;
  stats: string;
}

export interface Program {
  id: string;
  title: string;
  category: 'strength' | 'bodybuilding' | 'personal' | 'functional' | 'performance' | 'beginner';
  shortDesc: string;
  fullDesc: string;
  duration: string;
  intensity: 'Intermediate' | 'Advanced' | 'All Levels' | 'High Intensity';
  trainerName: string;
  trainerId: string;
  image: string;
  benefits: string[];
  targetAudience: string;
  structure: {
    phase: string;
    focus: string;
    details: string;
  }[];
  weeklySplit: string[];
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  gender: 'male' | 'female';
  specialty: string;
  experience: string;
  shortBio: string;
  fullBio: string;
  certifications: string[];
  favoriteLift: string;
  quote: string;
  photo: string;
  instagram: string;
  availableDays: string[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: 'BASIC' | 'STANDARD' | 'PREMIUM';
  tagline: string;
  monthlyPrice: number;
  annualPrice: number; // billed monthly with discount
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
  }[];
  perks: string[];
}

export interface ScheduleClass {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  duration: string;
  title: string;
  trainer: string;
  category: 'Strength' | 'Conditioning' | 'Olympic Lifting' | 'Functional' | 'Recovery';
  zone: string;
  level: 'Beginner Friendly' | 'Intermediate' | 'Advanced Athlete' | 'All Levels';
  spotsTotal: number;
  spotsBooked: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'strength' | 'athletes' | 'facility' | 'recovery';
  image: string;
  description: string;
  athleteFocus?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  content: {
    heading: string;
    paragraphs: string[];
    takeaways?: string[];
  }[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  discipline: string;
  timeframe: string;
  achievement: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Membership' | 'Training' | 'Facilities' | 'Guest Access';
}

// Brand Information
export const BRAND_INFO = {
  name: 'IRONFORGE ATHLETICS',
  tagline: 'BUILD YOUR STRONGER SELF.',
  mission: 'To provide world-class strength athletes, bodybuilders, and dedicated lifters with uncompromising equipment, elite biomechanical coaching, and an international brotherhood of high performance.',
  address: '450 Ironworks Boulevard, Performance District, Suite 100',
  phone: '+1 (800) 555-IRON',
  email: 'concierge@ironforgeathletics.com',
  hours: {
    weekdays: '05:00 AM – 11:00 PM',
    weekends: '06:00 AM – 09:00 PM',
    recoverySuite: '06:00 AM – 10:00 PM Daily',
  },
  stats: [
    { label: 'Years of Calibrated Excellence', value: '10+' },
    { label: 'Active Ironforge Athletes', value: '5,000+' },
    { label: 'Master Strength Coaches', value: '25+' },
    { label: 'Weekly Performance Classes', value: '50+' },
  ],
};

// Facility Highlights
export const FACILITY_FEATURES: FacilityFeature[] = [
  {
    id: 'strength-floor',
    title: 'Strength & Power Racks',
    tagline: 'Calibrated Competition Grade',
    description: '14 custom heavy-gauge steel power cages with integrated drop-sound dampening platforms, band pegs, Eleiko IPF-certified competition bars, and micro-loading plates.',
    equipment: ['Eleiko IPF Power Bars', 'Texas Power Bars', 'Laser-etched Calibrated Steel Plates', 'Band Attachments & Chains'],
    image: '/src/assets/images/facility_interior_strength_1790859454842.jpg',
    stats: '14 Full Power Cages',
  },
  {
    id: 'free-weights',
    title: 'Heavy Dumbbell Sanctuary',
    tagline: '5 lbs to 200 lbs In Pairs',
    description: 'Milled solid steel custom dumbbells arranged across 40 feet of heavy-duty acoustic rubber flooring, surrounded by six multi-angle adjustable incline and decline benches.',
    equipment: ['Urethane & Milled Steel Dumbbells up to 200 lbs', 'Thompson Fatbells', 'Custom Incline / Flat Benches', 'Spider Curl Benches'],
    image: '/src/assets/images/hero_gym_training_1790859396596.jpg',
    stats: 'Up to 200 lbs Dumbbells',
  },
  {
    id: 'functional-turf',
    title: 'High-Performance Turf & Sled Track',
    tagline: '40-Meter Sprint & Prowler Lane',
    description: 'Indoor sprint turf rated for heavy sled pushes, farmer walk implements, ballistic medicine ball walls, Concept2 RowErgs, and SkiErgs for anaerobic threshold capacity.',
    equipment: ['Rogue Dog Sleds & Prowlers', 'Concept2 BikeErgs & SkiErgs', 'Competition Kettlebells 8kg–48kg', 'Crash-rated Wall Balls'],
    image: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    stats: '40m Sprint & Sled Lane',
  },
  {
    id: 'recovery-suite',
    title: 'Contrast Therapy & Hydro Recovery',
    tagline: 'Cryo Plunge & Nordic Cedar Sauna',
    description: 'Accelerate muscular repair and systemic adaptation with dual 38°F chilled filtered cold plunges alongside a custom dry Finnish sauna heated to 205°F.',
    equipment: ['Dual Chilled Cold Plunges (38°F)', 'Nordic Dry Sauna (205°F)', 'Normatec 3 Compression Boots', 'Hyperice Percussion Lounge'],
    image: '/src/assets/images/facility_interior_strength_1790859454842.jpg',
    stats: 'Dual 38°F Chilled Plunges',
  },
  {
    id: 'olympic-lifting',
    title: 'Olympic Weightlifting Platforms',
    tagline: 'Oak Center Competition Decks',
    description: 'Shock-isolated solid oak platforms outfitted with IWF-certified Eleiko and Werksan bumper plates, bearing barbells, and dedicated chalk stations.',
    equipment: ['Eleiko IWF Bumper Plates', 'Bearing Weightlifting Barbells', 'Squat Jerk Blocks', 'Magnesium Chalk Stations'],
    image: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    stats: '6 Shock-Isolated Platforms',
  },
  {
    id: 'personal-coaching',
    title: '1-on-1 Biomechanics Laboratory',
    tagline: 'Data-Driven Human Optimization',
    description: 'Private assessment suite featuring InBody 770 multi-frequency body composition analysis, high-speed video bar path tracking, and personalized programming.',
    equipment: ['InBody 770 Body Composition', 'Kinovea Bar-Path High-Speed Camera', 'Dynamometer Grip Testing', 'Force Plate Velocity Rig'],
    image: '/src/assets/images/trainer_female_coach_1790859412860.jpg',
    stats: 'Clinical InBody 770 Rig',
  },
];

// Master Trainers
export const TRAINERS: Trainer[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus "Vanguard" Vance',
    title: 'Head Strength Coach & Director of Powerlifting',
    gender: 'male',
    specialty: 'Powerlifting, Maximum Force Output & Periodization',
    experience: '14 Years Elite Coaching',
    shortBio: 'Former national powerlifter with a 850 lb deadlift. Specializes in peaking lifters for competition and bulletproofing joint integrity.',
    fullBio: 'Marcus has spent over a decade training elite competitive lifters, military special operators, and collegiate athletes. His approach blends Eastern European linear periodization with modern velocity-based training metrics. Under his guidance, over 40 athletes have stepped onto national podiums.',
    certifications: ['CSCS (NSCA)', 'USAPL Senior National Coach', 'Westside Barbell Certified Special Strengths', 'FMS Level 2'],
    favoriteLift: 'Competition Deadlift (Conventional)',
    quote: 'Strength is not an accident. It is a biological demand earned one clean repetition at a time.',
    photo: '/src/assets/images/trainer_male_headcoach_1790859442147.jpg',
    instagram: '@marcus.ironforge',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova, M.Sc.',
    title: 'Director of Female Athletic Performance & Biomechanics',
    gender: 'female',
    specialty: 'Functional Hypertrophy, Biomechanics & Spine Health',
    experience: '11 Years Coaching & Clinical Research',
    shortBio: 'Master of Science in Sports Biomechanics. Renowned for fixing structural asymmetries and transforming female lifters into powerful, resilient athletes.',
    fullBio: 'Elena combines rigorous biomechanical lab assessments with real-world strength training. She works closely with female athletes navigating heavy compound lifting, pelvic floor resilience, and progressive overload without burnout. Her programming bridges the gap between clinical rehabilitation and maximal athletic expression.',
    certifications: ['M.Sc. Biomechanics & Kinesiology', 'CSCS (NSCA)', 'PRI (Postural Restoration Institute)', 'USAW Level 2'],
    favoriteLift: 'Barbell Paused Back Squat',
    quote: 'When your mechanics are flawless, heavy weight is not a threat—it is the catalyst for absolute transformation.',
    photo: '/src/assets/images/trainer_female_coach_1790859412860.jpg',
    instagram: '@elena.biomechanics',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    title: 'Senior Physique Coach & Hypertrophy Specialist',
    gender: 'male',
    specialty: 'Bodybuilding, Muscle Symmetry & Nutritional Strategy',
    experience: '9 Years Bodybuilding & Contest Prep',
    shortBio: 'IFBB Pro Classic Physique competitor. Dedicated to scientific hypertrophy, metabolic refeeds, and sculpted proportion for both men and women.',
    fullBio: 'David brings obsessive attention to mechanical tension, muscle origin/insertion leverage, and fatigue management. Having coached dozens of natural bodybuilding champions and executive physique clients, he constructs splits that maximize muscular development while protecting connective tissues.',
    certifications: ['IFBB Pro League Competitor', 'NASM Master Trainer', 'CISSN Sports Nutritionist', 'Precision Nutrition Level 2'],
    favoriteLift: 'Incline Dumbbell Press (Neutral Grip)',
    quote: 'Hypertrophy is precision architecture: recruit the motor unit, control the eccentric, feed the recovery.',
    photo: '/src/assets/images/hero_gym_training_1790859396596.jpg',
    instagram: '@chen.physique',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
  },
  {
    id: 'samantha-reed',
    name: 'Samantha Reed',
    title: 'Head of Functional Conditioning & Hyrox Master Trainer',
    gender: 'female',
    specialty: 'Aerobic Capacity, Sled Work, Kettlebell Mastery & Hyrox',
    experience: '8 Years Competitive Endurance & Strength',
    shortBio: 'World Championship Hyrox podium finisher. Specializes in hybrid athlete conditioning where heavy strength meets unrelenting engine work.',
    fullBio: 'Samantha coaches athletes who refuse to choose between raw strength and exceptional stamina. Her metabolic conditioning classes push lactate threshold boundaries using sleds, rowers, assault bikes, and barbell complexes, forging unstoppable cardiovascular engines.',
    certifications: ['StrongFirst SFG II Kettlebell', 'Hyrox Master Coach', 'CrossFit Level 3 Trainer', 'EXOS Performance Specialist'],
    favoriteLift: 'Double Kettlebell Clean & Strict Press',
    quote: 'Your mind will negotiate surrender long before your heart gives out. We train you to silence that voice.',
    photo: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    instagram: '@samreed.engine',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
  },
];

// Programs Catalog
export const PROGRAMS: Program[] = [
  {
    id: 'iron-strength-conditioning',
    title: 'Iron Strength & Conditioning',
    category: 'strength',
    shortDesc: 'The flagship barbell system focused on the Big Three lifts, auxiliary volume, and structural bulletproofing.',
    fullDesc: 'Our premier program designed to systematically increase your 1-rep maximum on the squat, bench press, and deadlift while developing work capacity. Utilizing autoregulated RPE training and targeted block periodization, you will build raw tendon density, bone mineral strength, and unstoppable confidence under heavy steel.',
    duration: '12-Week Progressive Cycle',
    intensity: 'Advanced',
    trainerName: 'Marcus "Vanguard" Vance',
    trainerId: 'marcus-vance',
    image: '/src/assets/images/hero_gym_training_1790859396596.jpg',
    benefits: [
      'Documented 15-25% increase in squat, bench, and deadlift 1RM',
      'Targeted posterior chain and core stabilization blocks',
      'Velocity-based feedback to eliminate grinding plateaus',
      'Direct hands-on coaching on bracing, cues, and bar path',
    ],
    targetAudience: 'Intermediate to experienced lifters seeking verified PRs and bulletproof barbell mechanics.',
    structure: [
      { phase: 'Weeks 1–4', focus: 'Hypertrophic Foundation', details: 'High volume, submaximal intensity (68–75%), building tendon tolerance and work capacity.' },
      { phase: 'Weeks 5–8', focus: 'Force Conversion', details: 'Transitional overload (80–87% 1RM), introducing heavy pause variations and cluster sets.' },
      { phase: 'Weeks 9–12', focus: 'Realization & Peaking', details: 'Singles and doubles (90–95%+), neurological taper, and scheduled mock meet testing.' },
    ],
    weeklySplit: [
      'Mon: Heavy Squat & Hamstring Hypertrophy',
      'Tue: Bench Press Power & Upper Back Density',
      'Thu: Deadlift Dynamics & Unilateral Quad Work',
      'Sat: Overhead Press, Arms & Trunk Core Rigidity',
    ],
  },
  {
    id: 'hypertrophy-physique',
    title: 'Anabolic Hypertrophy & Symmetry',
    category: 'bodybuilding',
    shortDesc: 'Scientific muscular development maximizing mechanical tension, full range of motion, and aesthetic proportion.',
    fullDesc: 'Engineered for dedicated lifters wanting to pack on lean dense muscle while sculpting classic V-taper symmetry. Emphasizes lengthened-position loading, tempo control, metabolic accumulation, and fatigue-managed volume splits tailored to individual biomechanical levers.',
    duration: '10-Week Muscle Building Block',
    intensity: 'Intermediate',
    trainerName: 'David Chen',
    trainerId: 'david-chen',
    image: '/src/assets/images/facility_interior_strength_1790859454842.jpg',
    benefits: [
      'Optimized muscular hypertrophy based on latest sports science',
      'Shoulder-to-waist golden ratio development',
      'Elimination of joint discomfort via ergonomic grip variations',
      'Detailed nutritional macronutrient recommendations for growth',
    ],
    targetAudience: 'Lifters looking to build visible muscle mass, enhance muscle definition, and optimize their physique aesthetics.',
    structure: [
      { phase: 'Weeks 1–3', focus: 'Sensitization & Eccentric Control', details: '3-second eccentric tempos, high metabolite accumulation, establishing mind-muscle connection.' },
      { phase: 'Weeks 4–7', focus: 'Mechanical Overload', details: 'Progressive load accumulation in the 6–10 rep range, lengthened partials and drop sets.' },
      { phase: 'Weeks 8–10', focus: 'Maximal Volume & Density', details: 'Density supersets, rest-pause sets, and targeted deload protocol.' },
    ],
    weeklySplit: [
      'Mon: Chest & Biceps Density',
      'Tue: Quads & Calves Overload',
      'Wed: Back & Rear Deltoid Width',
      'Fri: Hamstrings & Glutes Structural Split',
      'Sat: Shoulders & Triceps Precision',
    ],
  },
  {
    id: 'functional-hybrid-athlete',
    title: 'Functional Hybrid Engine',
    category: 'functional',
    shortDesc: 'Conditioning for modern athletes: combining heavy sled pushes, kettlebell complexes, and aerobic threshold intervals.',
    fullDesc: 'Build an engine that does not quit. This program bridges raw strength with high-power endurance. You will master heavy carries, sled sprints, kettlebell snatches, and cyclical intervals on Concept2 machines to develop high aerobic capacity without sacrificing hard-earned muscle.',
    duration: '8-Week Continuous Engine',
    intensity: 'High Intensity',
    trainerName: 'Samantha Reed',
    trainerId: 'samantha-reed',
    image: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    benefits: [
      'Enhanced VO2 max and anaerobic threshold',
      'Functional grip, core, and unilateral hip strength',
      'High calorie expenditure with lean muscle preservation',
      'Complete preparation for Hyrox or functional fitness events',
    ],
    targetAudience: 'Athletes who want exceptional cardiovascular stamina alongside formidable functional power.',
    structure: [
      { phase: 'Weeks 1–2', focus: 'Aerobic Base Building', details: 'Zone 2 steady-state mixed with fundamental kettlebell ballistic drills.' },
      { phase: 'Weeks 3–5', focus: 'Lactate Tolerance & Sled Drills', details: 'High-intensity intervals, Prowler push-pull ladders, and dual Erg pacing.' },
      { phase: 'Weeks 6–8', focus: 'Simulation & Race Pace', details: 'Timed event simulations, grip fatigue resilience, and active contrast recovery.' },
    ],
    weeklySplit: [
      'Mon: Sled Drive, Kettlebell Clean & Core Sledges',
      'Wed: Threshold RowErg / SkiErg Interval Ladders',
      'Fri: Sandbag Carries, Box Jump Overs & Farmer Walks',
      'Sat: Team Functional Gauntlet & Recovery Plunge',
    ],
  },
  {
    id: 'female-strength-mechanics',
    title: 'Elite Female Strength & Biomechanics',
    category: 'strength',
    shortDesc: 'Precision coaching designed around female biomechanics, posterior chain empowerment, and joint resilience.',
    fullDesc: 'Tailored for women determined to lift heavy, sculpt athletic physiques, and master barbell squats, hip thrusts, and deadlifts without injury. Led by biomechanist Elena Rostova, this curriculum corrects pelvic tilt, activates dormant glutes, and elevates full-body power output.',
    duration: '10-Week Progressive Program',
    intensity: 'Intermediate',
    trainerName: 'Elena Rostova, M.Sc.',
    trainerId: 'elena-rostova',
    image: '/src/assets/images/trainer_female_coach_1790859412860.jpg',
    benefits: [
      'Heavy barbell squat and hip thrust biomechanical mastery',
      'Elimination of lower back tightness through pelvic stabilization',
      'Substantial glute, hamstring, and upper back tone',
      'Supportive community of dedicated female lifters',
    ],
    targetAudience: 'Women of all backgrounds seeking empowering, heavy strength development in a serious training environment.',
    structure: [
      { phase: 'Weeks 1–3', focus: 'Structural Alignment & Activation', details: 'Foot tripod rooting, ribcage positioning, and unilateral hip stabilization.' },
      { phase: 'Weeks 4–7', focus: 'Linear Overload & Barbell Volume', details: 'Progressive loading on compound squats, Romanian deadlifts, and overhead presses.' },
      { phase: 'Weeks 8–10', focus: 'Peak Strength & Power Expression', details: 'Heavy submaximal triples, trap-bar jumps, and personalized strength milestones.' },
    ],
    weeklySplit: [
      'Mon: Squat Mechanics & Unilateral Glute Work',
      'Wed: Upper Body Posture, Pull-Ups & Overhead Press',
      'Fri: Romanian Deadlift & Posterior Chain Density',
      'Sat: Core Stability, Carries & Mobility Flow',
    ],
  },
  {
    id: 'iron-fundamentals-beginner',
    title: 'Iron Fundamentals (Beginner Mastery)',
    category: 'beginner',
    shortDesc: 'A safe, structured entry into barbell training, progressive overload, gym etiquette, and foundational movement patterns.',
    fullDesc: 'Never felt intimidated again. Iron Fundamentals introduces newcomers to proper hinge, squat, push, pull, and carry mechanics under the direct supervision of patient master coaches. You will learn how to set up equipment, choose correct weights, and build lifelong lifting habits.',
    duration: '6-Week Foundational Course',
    intensity: 'All Levels',
    trainerName: 'Marcus "Vanguard" Vance',
    trainerId: 'marcus-vance',
    image: '/src/assets/images/facility_interior_strength_1790859454842.jpg',
    benefits: [
      'Zero-intimidation, patient step-by-step coaching',
      'Mastery of squat, bench, deadlift, and overhead press form',
      'Personalized starting weights with safe progression rules',
      'Injury prevention habits and warm-up routines',
    ],
    targetAudience: 'Beginners and returning lifters seeking clean technique and a bulletproof lifting foundation.',
    structure: [
      { phase: 'Weeks 1–2', focus: 'Movement Competency', details: 'Goblet squats, dumbbell presses, hinge patterns, and bracing mechanics.' },
      { phase: 'Weeks 3–4', focus: 'Barbell Introduction', details: 'Empty bar and bumper plate setups, rack safety heights, and spotter communication.' },
      { phase: 'Weeks 5–6', focus: 'Progressive Overload Mastery', details: 'Introduction to tracking weight, logging RPE, and independent training readiness.' },
    ],
    weeklySplit: [
      'Tue: Foundational Squat & Horizontal Push',
      'Thu: Hinge Pattern (Deadlift) & Horizontal Pull',
      'Sat: Overhead Movement, Carries & Full Body Integration',
    ],
  },
  {
    id: 'elite-private-coaching',
    title: '1-on-1 Elite Private Coaching',
    category: 'personal',
    shortDesc: 'Bespoke one-on-one coaching, clinical InBody diagnostics, custom nutrition protocols, and private platform access.',
    fullDesc: 'The ultimate white-glove strength experience. Work directly alongside an Ironforge Master Coach with a fully personalized roadmap. Every session includes video bar path breakdown, custom recovery protocols, 24/7 concierge communication, and quarterly body composition scans.',
    duration: 'Custom Ongoing Commitment',
    intensity: 'Advanced',
    trainerName: 'Elena Rostova & Marcus Vance',
    trainerId: 'elena-rostova',
    image: '/src/assets/images/trainer_male_headcoach_1790859442147.jpg',
    benefits: [
      '100% customized programming tailored to your skeleton and goals',
      'Real-time kinematic bar speed and technique correction',
      'Complete personalized nutrition and supplement strategy',
      'Complimentary unlimited access to the Recovery Suite',
    ],
    targetAudience: 'Executives, competitive lifters, and individuals demanding the highest level of accountability and expertise.',
    structure: [
      { phase: 'Step 1', focus: 'Clinical Intake & Mobility Screen', details: 'InBody 770 scan, joint mobility assessment, history of injuries, and baseline testing.' },
      { phase: 'Step 2', focus: 'Micro-Cycle Blueprint', details: 'Weekly training blocks updated every Sunday based on recovery scores.' },
      { phase: 'Step 3', focus: 'Continuous Optimization', details: 'Monthly deloads, ongoing bloodwork coordination, and performance milestones.' },
    ],
    weeklySplit: [
      'Tailored explicitly to client schedule and recovery capacity (2–5 sessions/week)',
    ],
  },
];

// Membership Plans
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic-access',
    name: 'IRON ACCESS',
    tier: 'BASIC',
    tagline: 'Pure Strength Sanctuary',
    monthlyPrice: 79,
    annualPrice: 65, // per month when paid annually
    features: [
      { text: 'Full 7-day facility access during all operating hours', included: true },
      { text: 'Access to all calibrated barbell and dumbbell floors', included: true },
      { text: 'Locker room with rain showers and amenities', included: true },
      { text: 'Ironforge training app access & workout logging', included: true },
      { text: 'Quarterly InBody 770 composition scan', included: true },
      { text: 'Recovery Suite (Cold plunge & sauna)', included: false },
      { text: 'Weekly group strength classes included', included: false },
      { text: 'Complimentary monthly guest passes', included: false },
      { text: 'Dedicated 1-on-1 coach onboarding session', included: false },
    ],
    perks: ['Open Floor Access', 'Locker Room Privileges', 'Mobile App Tracking'],
  },
  {
    id: 'standard-performance',
    name: 'PERFORMANCE CLUB',
    tier: 'STANDARD',
    tagline: 'Most Popular for Serious Lifters',
    monthlyPrice: 129,
    annualPrice: 109,
    popular: true,
    features: [
      { text: 'Full 7-day facility access during all operating hours', included: true },
      { text: 'Access to all calibrated barbell and dumbbell floors', included: true },
      { text: 'Locker room with rain showers and amenities', included: true },
      { text: 'Ironforge training app access & workout logging', included: true },
      { text: 'Monthly InBody 770 composition scan', included: true },
      { text: 'Recovery Suite (Cold plunge & sauna - 4x/mo)', included: true },
      { text: 'Unlimited weekly group performance classes', included: true },
      { text: '2 complimentary guest passes per month', included: true },
      { text: 'Dedicated 1-on-1 coach onboarding session', included: true },
    ],
    perks: ['Unlimited Classes', 'Recovery Suite 4x/mo', 'Guest Passes', 'Coach Onboarding'],
  },
  {
    id: 'premium-elite',
    name: 'ELITE ATHLETE',
    tier: 'PREMIUM',
    tagline: 'Uncompromising VIP Access',
    monthlyPrice: 199,
    annualPrice: 169,
    features: [
      { text: 'Full 7-day facility access during all operating hours', included: true },
      { text: 'Access to all calibrated barbell and dumbbell floors', included: true },
      { text: 'Locker room with private executive lockers & laundry', included: true },
      { text: 'Ironforge training app access & custom coach programming', included: true },
      { text: 'Bi-weekly InBody 770 scan & nutrition consultation', included: true },
      { text: 'Unlimited 24/7 Recovery Suite (Plunge, sauna, boots)', included: true },
      { text: 'Unlimited weekly group performance classes & priority booking', included: true },
      { text: '5 complimentary guest passes per month', included: true },
      { text: 'Monthly 60-minute 1-on-1 Master Coach technical check', included: true },
    ],
    perks: ['Unlimited Recovery Suite', '1-on-1 Master Coaching', 'Executive Locker & Laundry', 'Priority Booking'],
  },
];

// Weekly Timetable / Schedule
export const WEEKLY_SCHEDULE: ScheduleClass[] = [
  // Monday
  { id: 'm1', day: 'Monday', time: '06:00 AM', duration: '60 min', title: 'Barbell Squat Mastery', trainer: 'Elena Rostova', category: 'Strength', zone: 'Platform A', level: 'Intermediate', spotsTotal: 12, spotsBooked: 10 },
  { id: 'm2', day: 'Monday', time: '07:30 AM', duration: '50 min', title: 'Hybrid Engine & Sled Track', trainer: 'Samantha Reed', category: 'Conditioning', zone: 'Turf Lane', level: 'All Levels', spotsTotal: 16, spotsBooked: 14 },
  { id: 'm3', day: 'Monday', time: '12:00 PM', duration: '45 min', title: 'Powerlifting Bench Press Lab', trainer: 'Marcus Vance', category: 'Strength', zone: 'Main Floor', level: 'Intermediate', spotsTotal: 10, spotsBooked: 8 },
  { id: 'm4', day: 'Monday', time: '05:30 PM', duration: '60 min', title: 'Deadlift & Posterior Chain', trainer: 'Marcus Vance', category: 'Strength', zone: 'Platform B', level: 'Advanced Athlete', spotsTotal: 12, spotsBooked: 12 },
  { id: 'm5', day: 'Monday', time: '07:00 PM', duration: '45 min', title: 'Contrast Recovery & Breathwork', trainer: 'Elena Rostova', category: 'Recovery', zone: 'Recovery Suite', level: 'All Levels', spotsTotal: 8, spotsBooked: 5 },

  // Tuesday
  { id: 't1', day: 'Tuesday', time: '06:30 AM', duration: '55 min', title: 'Olympic Clean & Jerk Technique', trainer: 'Marcus Vance', category: 'Olympic Lifting', zone: 'Platform A', level: 'Intermediate', spotsTotal: 8, spotsBooked: 6 },
  { id: 't2', day: 'Tuesday', time: '09:00 AM', duration: '50 min', title: 'Hypertrophy: Chest & Arms', trainer: 'David Chen', category: 'Strength', zone: 'Free Weights', level: 'All Levels', spotsTotal: 14, spotsBooked: 11 },
  { id: 't3', day: 'Tuesday', time: '05:30 PM', duration: '60 min', title: 'Hyrox Race Simulation', trainer: 'Samantha Reed', category: 'Functional', zone: 'Turf Lane', level: 'Advanced Athlete', spotsTotal: 16, spotsBooked: 15 },
  { id: 't4', day: 'Tuesday', time: '07:00 PM', duration: '50 min', title: 'Spine Decompression & Mobility', trainer: 'Elena Rostova', category: 'Recovery', zone: 'Studio 2', level: 'Beginner Friendly', spotsTotal: 15, spotsBooked: 9 },

  // Wednesday
  { id: 'w1', day: 'Wednesday', time: '06:00 AM', duration: '60 min', title: 'Max Effort Squat & Chain Loads', trainer: 'Marcus Vance', category: 'Strength', zone: 'Platform A', level: 'Advanced Athlete', spotsTotal: 10, spotsBooked: 9 },
  { id: 'w2', day: 'Wednesday', time: '08:00 AM', duration: '45 min', title: 'Iron Fundamentals: Squat & Hinge', trainer: 'Elena Rostova', category: 'Strength', zone: 'Platform B', level: 'Beginner Friendly', spotsTotal: 8, spotsBooked: 4 },
  { id: 'w3', day: 'Wednesday', time: '12:30 PM', duration: '45 min', title: 'Kettlebell Ballistic Power', trainer: 'Samantha Reed', category: 'Functional', zone: 'Turf Lane', level: 'All Levels', spotsTotal: 14, spotsBooked: 12 },
  { id: 'w4', day: 'Wednesday', time: '06:00 PM', duration: '60 min', title: 'Upper Back Density & Pulls', trainer: 'David Chen', category: 'Strength', zone: 'Free Weights', level: 'Intermediate', spotsTotal: 12, spotsBooked: 11 },

  // Thursday
  { id: 'th1', day: 'Thursday', time: '06:30 AM', duration: '50 min', title: 'Anaerobic Threshold Erg Ladders', trainer: 'Samantha Reed', category: 'Conditioning', zone: 'Turf Lane', level: 'All Levels', spotsTotal: 14, spotsBooked: 10 },
  { id: 'th2', day: 'Thursday', time: '10:00 AM', duration: '60 min', title: 'Bodybuilding Leg Volume Split', trainer: 'David Chen', category: 'Strength', zone: 'Main Floor', level: 'Intermediate', spotsTotal: 12, spotsBooked: 10 },
  { id: 'th3', day: 'Thursday', time: '05:30 PM', duration: '60 min', title: 'Snatch Precision & Overhead Squat', trainer: 'Marcus Vance', category: 'Olympic Lifting', zone: 'Platform A', level: 'Advanced Athlete', spotsTotal: 8, spotsBooked: 7 },
  { id: 'th4', day: 'Thursday', time: '07:00 PM', duration: '45 min', title: 'Contrast Hydrotherapy Protocol', trainer: 'Elena Rostova', category: 'Recovery', zone: 'Recovery Suite', level: 'All Levels', spotsTotal: 8, spotsBooked: 8 },

  // Friday
  { id: 'f1', day: 'Friday', time: '06:00 AM', duration: '60 min', title: 'Speed Deadlifts & Band Resistance', trainer: 'Marcus Vance', category: 'Strength', zone: 'Platform B', level: 'Intermediate', spotsTotal: 10, spotsBooked: 8 },
  { id: 'f2', day: 'Friday', time: '08:00 AM', duration: '50 min', title: 'Female Biomechanics Masterclass', trainer: 'Elena Rostova', category: 'Strength', zone: 'Platform A', level: 'All Levels', spotsTotal: 12, spotsBooked: 11 },
  { id: 'f3', day: 'Friday', time: '05:00 PM', duration: '55 min', title: 'Friday Night Heavy Iron Club', trainer: 'David Chen', category: 'Strength', zone: 'Free Weights', level: 'All Levels', spotsTotal: 20, spotsBooked: 19 },

  // Saturday
  { id: 's1', day: 'Saturday', time: '08:00 AM', duration: '75 min', title: 'Saturday Engine Gauntlet', trainer: 'Samantha Reed', category: 'Conditioning', zone: 'Turf Lane', level: 'All Levels', spotsTotal: 20, spotsBooked: 18 },
  { id: 's2', day: 'Saturday', time: '10:00 AM', duration: '75 min', title: 'Olympic Lifting Open Platform', trainer: 'Marcus Vance', category: 'Olympic Lifting', zone: 'Platform A', level: 'Intermediate', spotsTotal: 12, spotsBooked: 11 },
  { id: 's3', day: 'Saturday', time: '01:00 PM', duration: '60 min', title: 'Physique Posing & Muscle Recruitment', trainer: 'David Chen', category: 'Strength', zone: 'Studio 1', level: 'All Levels', spotsTotal: 10, spotsBooked: 6 },

  // Sunday
  { id: 'su1', day: 'Sunday', time: '09:00 AM', duration: '60 min', title: 'Active Recovery, Sauna & Mobility', trainer: 'Elena Rostova', category: 'Recovery', zone: 'Recovery Suite', level: 'All Levels', spotsTotal: 12, spotsBooked: 9 },
  { id: 'su2', day: 'Sunday', time: '11:00 AM', duration: '60 min', title: 'Open Coaching & PR Board Review', trainer: 'Marcus Vance', category: 'Strength', zone: 'Main Floor', level: 'All Levels', spotsTotal: 15, spotsBooked: 10 },
];

// Gallery Items
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Precision Barbell Squat Form',
    category: 'athletes',
    image: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    description: 'Female competitive lifter executing calibrated back squats with textbook bracing and depth.',
    athleteFocus: 'Female Athlete · Strength & Mechanics',
  },
  {
    id: 'g2',
    title: 'Heavy Deadlift Sanctuary',
    category: 'strength',
    image: '/src/assets/images/hero_gym_training_1790859396596.jpg',
    description: 'Chalk in the air during heavy deadlift singles on solid oak and dampening rubber.',
    athleteFocus: 'Male Athlete · Maximum Force Output',
  },
  {
    id: 'g3',
    title: 'Master Strength Coach Direction',
    category: 'facility',
    image: '/src/assets/images/trainer_male_headcoach_1790859442147.jpg',
    description: 'Head Coach Marcus Vance supervising barbell velocity metrics and athlete form.',
    athleteFocus: 'Coaching & Mentorship',
  },
  {
    id: 'g4',
    title: 'Athletic Performance Floor',
    category: 'facility',
    image: '/src/assets/images/facility_interior_strength_1790859454842.jpg',
    description: 'Laser-cut custom power racks, custom iron plates, and expansive rubber flooring.',
    athleteFocus: 'World-Class Facility',
  },
  {
    id: 'g5',
    title: 'Female Biomechanics Director',
    category: 'athletes',
    image: '/src/assets/images/trainer_female_coach_1790859412860.jpg',
    description: 'Elena Rostova preparing kettlebell unilateral progressions for athlete assessment.',
    athleteFocus: 'Female Coach · Biomechanics',
  },
  {
    id: 'g6',
    title: 'Calibrated Competition Iron',
    category: 'strength',
    image: '/src/assets/images/facility_interior_strength_1790859454842.jpg',
    description: 'IPF certified calibrated thin-profile competition discs ready for PR attempts.',
    athleteFocus: 'Equipment & Precision',
  },
  {
    id: 'g7',
    title: 'Maximal Effort Power Pull',
    category: 'strength',
    image: '/src/assets/images/hero_gym_training_1790859396596.jpg',
    description: 'Intense concentric focus during high-load barbell pulls in dramatic overhead lighting.',
    athleteFocus: 'Male Bodybuilder · Hypertrophy',
  },
  {
    id: 'g8',
    title: 'Dynamic Functional Conditioning',
    category: 'recovery',
    image: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    description: 'Post-session athletic mobility drills and nervous system recovery techniques.',
    athleteFocus: 'Recovery & Durability',
  },
];

// Blog Posts
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'periodization-for-maximum-raw-strength',
    title: 'The Science of Wave Periodization for Raw Strength',
    category: 'Strength Training',
    date: 'March 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Marcus "Vanguard" Vance',
      role: 'Head Strength Coach',
    },
    summary: 'Why linear progression inevitably stalls for intermediate lifters and how 3-week undulating loading waves unlock consistent PR breakthroughs.',
    image: '/src/assets/images/hero_gym_training_1790859396596.jpg',
    content: [
      {
        heading: 'The Ceiling of Linear Overload',
        paragraphs: [
          'Every lifter begins their journey adding 5 pounds each week to the barbell. It feels miraculous until neuromuscular adaptation reaches its biological ceiling. At this inflection point, continuing to add arbitrary load only produces tendonitis, systemic fatigue, and technical breakdown.',
          'True athletic periodization manages fatigue as an equal variable alongside mechanical tension. Instead of demanding a linear climb, wave loading cycles volume and intensity in 3-to-4 week undulating blocks.',
        ],
        takeaways: [
          'Linear progression only works reliably for the first 6–12 months of training.',
          'Fatigue masks fitness: a lifter is strongest after a planned dissipation of neurological stress.',
          'Weekly volume must undulate by at least 15–20% to trigger continuous adaptation.',
        ],
      },
      {
        heading: 'Constructing the 3-Week Wave',
        paragraphs: [
          'Week 1 establishes the baseline volume at 70–75% of your true 1RM. Week 2 pushes intensity to 80–85% while trimming total sets by 15%. Week 3 peaks at 88–92% for quality technical singles and doubles. Week 4 is an active deload at 60% intensity to restore connective tissue.',
          'When repeated over three consecutive cycles, this method yields predictable, injury-free increases in competitive total without nervous system exhaustion.',
        ],
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'biomechanics-of-the-female-back-squat',
    title: 'Biomechanical Nuances of the Female Back Squat',
    category: 'Biomechanics',
    date: 'March 10, 2026',
    readTime: '7 min read',
    author: {
      name: 'Elena Rostova, M.Sc.',
      role: 'Director of Biomechanics',
    },
    summary: 'Addressing Q-angles, femoral acetabular depth, and pelvic floor bracing to achieve deep, pain-free squats for female lifters.',
    image: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    content: [
      {
        heading: 'Why Anatomy Dictates Stance Width',
        paragraphs: [
          'Too many coaches force a rigid, dogmatic squat stance—shoulder width with toes slightly flared—on every athlete regardless of pelvic geometry. For female athletes with wider pelvises and greater femoral anteversion, this often produces hip impingement and knee valgus.',
          'Finding your authentic squat stance requires testing passive hip internal and external rotation on an assessment table. When the stance accommodates individual acetabular sockets, depth is achieved effortlessly without butt wink or spinal shear.',
        ],
        takeaways: [
          'Individual hip socket orientation determines ideal foot flare (between 15° and 35°).',
          '3-point foot tripod contact (heel, big toe base, pinky toe base) stabilizes the kinetic chain.',
          'Intra-abdominal diaphragmatic bracing prevents anterior pelvic tilt during the descent.',
        ],
      },
      {
        heading: 'The Role of Anterior Core Bracing',
        paragraphs: [
          'Female lifters frequently default to lumbar hyperextension under heavy load. By cueing ribcage depression and diaphragmatic canister pressurization, intra-abdominal pressure distributes equally around the lumbar spine, protecting the lower back while enabling full glute engagement at the bottom of the squat.',
        ],
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'cold-plunge-and-hypertrophy-timing',
    title: 'Cold Plunges vs. Muscle Growth: How to Time Contrast Therapy',
    category: 'Recovery',
    date: 'February 26, 2026',
    readTime: '5 min read',
    author: {
      name: 'David Chen',
      role: 'Senior Physique Coach',
    },
    summary: 'The critical difference between systemic recovery and blunting the inflammatory cascade needed for muscle hypertrophy.',
    image: '/src/assets/images/facility_interior_strength_1790859454842.jpg',
    content: [
      {
        heading: 'The Cryotherapy Dilemma',
        paragraphs: [
          'Cold water immersion at 38°F is extraordinary for blunting acute central nervous system fatigue, reducing muscle soreness, and resetting dopamine levels. However, recent peer-reviewed literature confirms that submerging in ice baths immediately within 4 hours of a hypertrophy workout blunts the mTOR signaling cascade required for muscle protein synthesis.',
          'If your goal is pure muscular hypertrophy, submerging right after training reduces the inflammatory signaling that triggers muscle repair. Understanding timing is the difference between optimization and wasted effort.',
        ],
        takeaways: [
          'Avoid cold water immersion within 4 hours following direct hypertrophy training.',
          'Use cold plunges on rest days, conditioning days, or first thing in the morning before training.',
          'Finnish saunas (200°F+) post-workout, on the contrary, stimulate heat shock proteins and growth hormone without blunting hypertrophy.',
        ],
      },
    ],
  },
  {
    id: 'post-4',
    slug: 'macronutrient-periodization-for-heavy-lifters',
    title: 'Macronutrient Periodization: Fueling Heavy Days vs. Rest Days',
    category: 'Nutrition',
    date: 'February 14, 2026',
    readTime: '6 min read',
    author: {
      name: 'Samantha Reed',
      role: 'Functional Conditioning Head',
    },
    summary: 'A clear tactical blueprint for shifting carbohydrate and electrolyte intake around high-volume lower-body training days.',
    image: '/src/assets/images/trainer_female_coach_1790859412860.jpg',
    content: [
      {
        heading: 'The Energy Currency of High-Threshold Motor Units',
        paragraphs: [
          'Heavy compound training is fundamentally glycolytic. Low-carbohydrate diets may work for sedentary fat loss, but under a 450-pound barbell, intramuscular glycogen depletion leads directly to decreased bar speed and compromised eccentric motor control.',
          'By matching carbohydrate intake to training demand—consuming 65% of daily carbs around the training window on heavy squat and deadlift days, while tapering carbs and increasing healthy fats on active rest days—athletes maintain metabolic flexibility without body fat accumulation.',
        ],
        takeaways: [
          'Consume 1.0–1.2g of protein per pound of target bodyweight daily.',
          'Front-load 50–75g of easily digestible cyclic dextrin or white rice carbs 90 minutes pre-workout.',
          'Maintain 1,500mg sodium and 500mg potassium per hour of intense gym output.',
        ],
      },
    ],
  },
];

// Testimonials & Fictional Showcase Stories
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Alexander Sterling',
    discipline: 'Competitive Powerlifter (105kg Class)',
    timeframe: 'Member for 2 Years',
    achievement: '+65kg on Barbell Total (PR: 740kg)',
    quote: 'The caliber of calibrated equipment and coaching culture at Ironforge is leagues beyond any commercial gym. There is zero fluff, zero wasted energy. You walk into this facility, and the air demands your absolute best.',
    avatar: '/src/assets/images/hero_gym_training_1790859396596.jpg',
    rating: 5,
  },
  {
    id: 't-2',
    name: 'Dr. Claire Montgomery',
    discipline: 'Trauma Surgeon & Masters Lifter',
    timeframe: 'Member for 18 Months',
    achievement: 'Fixed Chronic Back Pain & Squatting 140kg',
    quote: 'Elena Rostova restructured my entire squat mechanics from the ground up. In my demanding medical profession, the physical resilience and mental clarity I build here keeps me functioning at my highest level.',
    avatar: '/src/assets/images/athlete_female_squat_1790859427365.jpg',
    rating: 5,
  },
  {
    id: 't-3',
    name: 'Julian Navarro',
    discipline: 'Hyrox Athlete & Tech Founder',
    timeframe: 'Member for 1 Year',
    achievement: 'Top 5% Hyrox Pro Division Finish',
    quote: 'The hybrid conditioning track and the 38-degree cold plunges are game-changers. Ironforge combines the raw intensity of an old-school iron pit with the recovery science of an Olympic training center.',
    avatar: '/src/assets/images/trainer_male_headcoach_1790859442147.jpg',
    rating: 5,
  },
];

// FAQs
export const FAQS: FAQItem[] = [
  {
    category: 'Membership',
    question: 'How do I start training at Ironforge Athletics?',
    answer: 'You can begin by selecting one of our three membership tiers (Iron Access, Performance Club, or Elite Athlete) online or requesting a private facility tour and coach consultation. All memberships include an initial orientation and movement assessment.',
  },
  {
    category: 'Membership',
    question: 'Can I try the gym before committing to a contract?',
    answer: 'Yes. We offer single-day competition passes and 3-day introductory trials for experienced lifters and serious newcomers. Contact our concierge desk or use the booking tool to reserve your pass.',
  },
  {
    category: 'Training',
    question: 'Is Ironforge only for competitive bodybuilders and powerlifters?',
    answer: 'While our equipment meets Olympic and IPF international standards, over 40% of our members are business leaders, doctors, beginners, and fitness enthusiasts whose primary goal is building a stronger, healthier physique. We have dedicated beginner tracks with zero intimidation.',
  },
  {
    category: 'Training',
    question: 'How do the group strength classes differ from generic HIIT bootcamps?',
    answer: 'Our classes are capped at 12–16 athletes and follow strict periodized barbell and conditioning curriculums supervised by certified strength coaches. We do not do arbitrary jumping around; we track numbers, load bars properly, and respect technique.',
  },
  {
    category: 'Facilities',
    question: 'What is included in the Recovery Suite?',
    answer: 'Our Recovery Suite features dual 38°F chilled filtered cold plunge baths, a Nordic dry cedar sauna heated to 205°F, Normatec 3 dynamic pneumatic compression boots, and dedicated hyperice soft-tissue massage tools.',
  },
  {
    category: 'Guest Access',
    question: 'What is your guest policy and parking availability?',
    answer: 'Performance Club and Elite members receive complimentary monthly guest passes. Ironforge offers a secure 80-vehicle private parking lot with EV charging stations for member convenience.',
  },
];
