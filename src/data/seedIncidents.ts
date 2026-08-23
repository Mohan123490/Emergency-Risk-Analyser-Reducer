import { Incident, SafetyAlert } from '@/types';

export const SEED_INCIDENTS: Incident[] = [
  {
    id: 'inc-1001',
    eventId: 'thrissur-pooram-2026',
    category: 'dangerous_crowd',
    title: 'Extreme Crowd Surge & Bottleneck near Gate 3 Arch',
    description: 'Incoming flow from Naduvilal junction is severely compressing spectators against temporary police barricades. Inflow is uninhibited while Exit B is locked.',
    location: { lat: 10.5242, lng: 76.2120 },
    locationName: 'Zone B — Naduvilal Gate 3',
    zoneId: 'zone-gate-3-naduvilal',
    reporterId: 'user-cit-1',
    reporterName: 'Deepa M.',
    reporterTrustScore: 88,
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    affectedPeopleCount: 150,
    timestamp: '2026-04-28T16:20:00.000Z',
    photoUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    assignedResponderId: 'pol-resp-2',
    assignedResponderName: 'Inspector Sujith Nair (RAF Strike Unit)',
    assignedResponderRole: 'police',
    assignedResponderDistanceMeters: 45,
    isCriticalAlertTriggered: true,
    communityHelpRequested: true,
    communityHelpTask: 'If situated in Zone B, step aside against shop arcades. Do NOT push forward into the archway. Follow volunteer instructions.',
    communityHelpersAssigned: ['user-me', 'user-cit-4'],
    updates: [
      {
        id: 'up-1',
        incidentId: 'inc-1001',
        timestamp: '2026-04-28T16:20:00.000Z',
        actorId: 'user-cit-1',
        actorName: 'Deepa M.',
        actorRole: 'citizen',
        newStatus: 'REPORTED',
        note: 'Citizen report received via Suraksha Mobile App.'
      },
      {
        id: 'up-2',
        incidentId: 'inc-1001',
        timestamp: '2026-04-28T16:21:15.000Z',
        actorId: 'system',
        actorName: 'Suraksha AI Risk Engine',
        actorRole: 'system',
        previousStatus: 'REPORTED',
        newStatus: 'VERIFIED',
        note: 'AI Density Analysis confirmed 91% surge index. Risk level escalated to CRITICAL.'
      },
      {
        id: 'up-3',
        incidentId: 'inc-1001',
        timestamp: '2026-04-28T16:22:00.000Z',
        actorId: 'admin-1',
        actorName: 'DDMA Control Room',
        actorRole: 'admin',
        previousStatus: 'VERIFIED',
        newStatus: 'ASSIGNED',
        note: 'Assigned RAF Strike Unit and alerted 4 nearby crowd management volunteers.'
      },
      {
        id: 'up-4',
        incidentId: 'inc-1001',
        timestamp: '2026-04-28T16:23:45.000Z',
        actorId: 'pol-resp-2',
        actorName: 'Inspector Sujith Nair',
        actorRole: 'police',
        previousStatus: 'ASSIGNED',
        newStatus: 'IN_PROGRESS',
        note: 'On site. Opening Emergency Gate 3B and establishing reverse-flow human chain.'
      }
    ],
    possibleDuplicates: ['inc-1004', 'inc-1007']
  },
  {
    id: 'inc-1002',
    eventId: 'thrissur-pooram-2026',
    category: 'missing_child',
    title: 'Missing 6-Year-Old Boy (Aarav Menon)',
    description: 'Child separated from parents during fireworks display movement near Swaraj Round food stalls. Wearing blue polo shirt, navy shorts, and red sandals.',
    location: { lat: 10.5266, lng: 76.2146 },
    locationName: 'Zone C — Swaraj Round Food Court',
    zoneId: 'zone-food-swaraj-round',
    reporterId: 'user-cit-2',
    reporterName: 'Girish K. (Parent)',
    reporterTrustScore: 92,
    severity: 'HIGH',
    status: 'VERIFIED',
    affectedPeopleCount: 1,
    timestamp: '2026-04-28T16:25:00.000Z',
    photoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    assignedResponderId: 'pol-resp-4',
    assignedResponderName: 'Pink Patrol Team Alpha',
    assignedResponderRole: 'police',
    assignedResponderDistanceMeters: 80,
    isCriticalAlertTriggered: false,
    communityHelpRequested: true,
    communityHelpTask: 'Check nearby sweet kiosks and juice stalls for a 6yo boy wearing a blue polo shirt.',
    communityHelpersAssigned: ['user-cit-6', 'user-cit-10'],
    missingPersonDetails: {
      id: 'mp-1002',
      incidentId: 'inc-1002',
      caseType: 'MISSING',
      personName: 'Aarav Menon',
      age: 6,
      gender: 'MALE',
      clothingDescription: 'Blue collared polo shirt, dark navy shorts, red sandals',
      lastKnownLocationName: 'Swaraj Round East — Stall #14 (Annapoorna Snacks)',
      lastKnownCoordinates: { lat: 10.5266, lng: 76.2146 },
      timeLastSeen: '16:15 PM',
      photoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80',
      guardianName: 'Girish Kumar',
      guardianPhoneMasked: '+91 94471 •••••',
      verificationStatus: 'VERIFIED',
      privacyMasked: true
    },
    updates: [
      {
        id: 'up-201',
        incidentId: 'inc-1002',
        timestamp: '2026-04-28T16:25:00.000Z',
        actorId: 'user-cit-2',
        actorName: 'Girish K.',
        actorRole: 'citizen',
        newStatus: 'REPORTED',
        note: 'Missing child report registered by parent.'
      },
      {
        id: 'up-202',
        incidentId: 'inc-1002',
        timestamp: '2026-04-28T16:26:30.000Z',
        actorId: 'admin-1',
        actorName: 'Control Room Officer',
        actorRole: 'admin',
        previousStatus: 'REPORTED',
        newStatus: 'VERIFIED',
        note: 'Child photo verified with parent Aadhaar ID. Broadcasted task to Pink Police & Food Zone volunteers.'
      }
    ]
  },
  {
    id: 'inc-1003',
    eventId: 'thrissur-pooram-2026',
    category: 'medical_emergency',
    title: 'Senior Citizen Collapsed (Acute Heat Stroke / Dehydration)',
    description: '68-year-old male collapsed near temple eastern ramp during Kudamattam ceremony. Unconscious, shallow breathing, pulse feeble.',
    location: { lat: 10.5245, lng: 76.2146 },
    locationName: 'Zone A — Vadakkumnathan East Ramp',
    zoneId: 'zone-main-stage',
    reporterId: 'user-cit-5',
    reporterName: 'Lakshmi W.',
    reporterTrustScore: 94,
    severity: 'CRITICAL',
    status: 'RESPONDER_EN_ROUTE',
    affectedPeopleCount: 1,
    timestamp: '2026-04-28T16:28:00.000Z',
    mediaType: 'text',
    assignedResponderId: 'vol-1',
    assignedResponderName: 'Sarath Chandran (Medical Volunteer)',
    assignedResponderRole: 'volunteer',
    assignedResponderDistanceMeters: 60,
    ambulanceAssigned: {
      id: 'amb-1',
      plateNumber: 'KL-08-CC-4421 (ALS Unit 1)',
      driverName: 'Raghavan Pillai',
      driverPhone: '+91 94470 88771',
      status: 'DISPATCHED',
      currentLocation: { lat: 10.5262, lng: 76.2168 },
      baseHospitalName: 'Thrissur District Hospital',
      equipmentLevel: 'ALS (Advanced)',
      etaMinutes: 2
    },
    medicalDetails: {
      symptomType: 'unconscious',
      consciousness: 'unconscious',
      breathing: true,
      priorityScore: 95
    },
    isCriticalAlertTriggered: true,
    communityHelpRequested: true,
    communityHelpTask: 'Create a 3-meter open circular air pocket around the patient. Do NOT crowd. Fan the patient with papers/cloth.',
    communityHelpersAssigned: ['user-me', 'user-cit-9'],
    updates: [
      {
        id: 'up-301',
        incidentId: 'inc-1003',
        timestamp: '2026-04-28T16:28:00.000Z',
        actorId: 'user-cit-5',
        actorName: 'Lakshmi W.',
        actorRole: 'citizen',
        newStatus: 'REPORTED',
        note: 'Urgent medical SOS triggered via 1-Tap SOS.'
      },
      {
        id: 'up-302',
        incidentId: 'inc-1003',
        timestamp: '2026-04-28T16:28:20.000Z',
        actorId: 'system',
        actorName: 'Suraksha Emergency Triage',
        actorRole: 'system',
        previousStatus: 'REPORTED',
        newStatus: 'ASSIGNED',
        note: 'AI classified as CRITICAL Triage Code Red. Auto-alerted closest volunteer (60m) and ALS Ambulance 1.'
      },
      {
        id: 'up-303',
        incidentId: 'inc-1003',
        timestamp: '2026-04-28T16:29:10.000Z',
        actorId: 'vol-1',
        actorName: 'Sarath Chandran',
        actorRole: 'volunteer',
        previousStatus: 'ASSIGNED',
        newStatus: 'RESPONDER_EN_ROUTE',
        note: 'Accepted task. Arriving with first aid kit and portable oxygen cannula.'
      }
    ]
  },
  {
    id: 'inc-1004',
    eventId: 'thrissur-pooram-2026',
    category: 'dangerous_crowd',
    title: 'Severe crushing near Naduvilal barricade',
    description: 'People are shouting and pushing. Children are getting crushed against the iron railing.',
    location: { lat: 10.5243, lng: 76.2119 },
    locationName: 'Zone B — Naduvilal Gate 3',
    zoneId: 'zone-gate-3-naduvilal',
    reporterId: 'user-cit-4',
    reporterName: 'Arjun D.',
    reporterTrustScore: 78,
    severity: 'CRITICAL',
    status: 'REPORTED',
    affectedPeopleCount: 80,
    timestamp: '2026-04-28T16:21:40.000Z',
    duplicateOfId: 'inc-1001',
    isCriticalAlertTriggered: false,
    communityHelpRequested: false,
    updates: [
      {
        id: 'up-401',
        incidentId: 'inc-1004',
        timestamp: '2026-04-28T16:21:40.000Z',
        actorId: 'user-cit-4',
        actorName: 'Arjun D.',
        actorRole: 'citizen',
        newStatus: 'REPORTED',
        note: 'Reported duplicate of incident #1001 (clustered 18m away).'
      }
    ]
  },
  {
    id: 'inc-1005',
    eventId: 'thrissur-pooram-2026',
    category: 'theft',
    title: 'Gold Chain Snatching / Pickpocketing Ring Active',
    description: 'Female victim had 3-sovereign gold necklace snatched in dense crowd. Group of 3 suspicious youths in black hoodies sighted moving towards Swaraj North.',
    location: { lat: 10.5263, lng: 76.2141 },
    locationName: 'Zone C — Swaraj Round West Arcade',
    zoneId: 'zone-food-swaraj-round',
    reporterId: 'user-cit-15',
    reporterName: 'Haritha K.',
    reporterTrustScore: 97,
    severity: 'MEDIUM',
    status: 'ASSIGNED',
    affectedPeopleCount: 2,
    timestamp: '2026-04-28T16:10:00.000Z',
    assignedResponderId: 'pol-resp-3',
    assignedResponderName: 'ASI Thomas Mathew (Crime Prevention)',
    assignedResponderRole: 'police',
    assignedResponderDistanceMeters: 40,
    isCriticalAlertTriggered: false,
    communityHelpRequested: false,
    updates: [
      {
        id: 'up-501',
        incidentId: 'inc-1005',
        timestamp: '2026-04-28T16:10:00.000Z',
        actorId: 'user-cit-15',
        actorName: 'Haritha K.',
        actorRole: 'citizen',
        newStatus: 'REPORTED',
        note: 'Theft reported with physical description of suspects.'
      },
      {
        id: 'up-502',
        incidentId: 'inc-1005',
        timestamp: '2026-04-28T16:12:00.000Z',
        actorId: 'admin-1',
        actorName: 'Control Room',
        actorRole: 'admin',
        previousStatus: 'REPORTED',
        newStatus: 'ASSIGNED',
        note: 'Assigned plainclothes crime prevention squad.'
      }
    ]
  },
  {
    id: 'inc-1006',
    eventId: 'thrissur-pooram-2026',
    category: 'road_blocked',
    title: 'Unauthorized Vendor Handcart Blocking Kuruppam Road Evacuation Path',
    description: 'Large sugarcane juice wooden cart and plastic awning blocking 6 meters of the 16-meter wide emergency egress lane.',
    location: { lat: 10.5232, lng: 76.2107 },
    locationName: 'Zone E — Kuruppam Road South Gate',
    zoneId: 'zone-western-exit',
    reporterId: 'user-cit-7',
    reporterName: 'Sreevidya N.',
    reporterTrustScore: 90,
    severity: 'MEDIUM',
    status: 'IN_PROGRESS',
    affectedPeopleCount: 50,
    timestamp: '2026-04-28T16:05:00.000Z',
    assignedResponderId: 'pol-resp-5',
    assignedResponderName: 'Traffic SI Rajan P.',
    assignedResponderRole: 'police',
    assignedResponderDistanceMeters: 30,
    isCriticalAlertTriggered: false,
    communityHelpRequested: false,
    updates: [
      {
        id: 'up-601',
        incidentId: 'inc-1006',
        timestamp: '2026-04-28T16:05:00.000Z',
        actorId: 'user-cit-7',
        actorName: 'Sreevidya N.',
        actorRole: 'citizen',
        newStatus: 'REPORTED',
        note: 'Obstruction reported.'
      },
      {
        id: 'up-602',
        incidentId: 'inc-1006',
        timestamp: '2026-04-28T16:08:00.000Z',
        actorId: 'pol-resp-5',
        actorName: 'Traffic SI Rajan P.',
        actorRole: 'police',
        previousStatus: 'REPORTED',
        newStatus: 'IN_PROGRESS',
        note: 'Traffic personnel actively clearing cart to ensure unhindered ambulance passage.'
      }
    ]
  },
  {
    id: 'inc-1007',
    eventId: 'thrissur-pooram-2026',
    category: 'dangerous_crowd',
    title: 'Cannot breathe near Gate 3',
    description: 'Crowd density is unbearable. People are unable to lift arms or step backwards.',
    location: { lat: 10.5241, lng: 76.2122 },
    locationName: 'Zone B — Naduvilal Gate 3',
    zoneId: 'zone-gate-3-naduvilal',
    reporterId: 'user-cit-8',
    reporterName: 'Rohit B.',
    reporterTrustScore: 82,
    severity: 'CRITICAL',
    status: 'REPORTED',
    affectedPeopleCount: 120,
    timestamp: '2026-04-28T16:22:15.000Z',
    duplicateOfId: 'inc-1001',
    isCriticalAlertTriggered: false,
    communityHelpRequested: false,
    updates: [
      {
        id: 'up-701',
        incidentId: 'inc-1007',
        timestamp: '2026-04-28T16:22:15.000Z',
        actorId: 'user-cit-8',
        actorName: 'Rohit B.',
        actorRole: 'citizen',
        newStatus: 'REPORTED',
        note: 'Duplicate cluster report.'
      }
    ]
  },
  {
    id: 'inc-1008',
    eventId: 'thrissur-pooram-2026',
    category: 'found_child',
    title: 'Found Crying Boy in Blue Shirt (Found Person Report)',
    description: 'Found a distressed child around 6-7 years old crying near Ice Cream stall #4 in Food Court. Wearing blue shirt and red sandals. Currently sheltered at Red Cross Information Tent.',
    location: { lat: 10.5268, lng: 76.2147 },
    locationName: 'Zone C — Swaraj Round Food Court',
    zoneId: 'zone-food-swaraj-round',
    reporterId: 'vol-6',
    reporterName: 'Reshma S. Nair (Volunteer)',
    reporterTrustScore: 99,
    severity: 'HIGH',
    status: 'VERIFIED',
    affectedPeopleCount: 1,
    timestamp: '2026-04-28T16:30:00.000Z',
    photoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80',
    mediaType: 'photo',
    assignedResponderId: 'pol-resp-4',
    assignedResponderName: 'Pink Patrol Team Alpha',
    assignedResponderRole: 'police',
    assignedResponderDistanceMeters: 25,
    isCriticalAlertTriggered: false,
    communityHelpRequested: false,
    missingPersonDetails: {
      id: 'mp-1008',
      incidentId: 'inc-1008',
      caseType: 'FOUND',
      personName: 'Unidentified Boy (~6yo)',
      age: 6,
      gender: 'MALE',
      clothingDescription: 'Blue polo shirt with white stripes, dark shorts, red sandals',
      lastKnownLocationName: 'Red Cross Information Booth #3, Swaraj Round',
      lastKnownCoordinates: { lat: 10.5268, lng: 76.2147 },
      timeLastSeen: '16:29 PM',
      photoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80',
      matchedCaseId: 'mp-1002',
      matchScore: 94,
      verificationStatus: 'VERIFIED',
      privacyMasked: true
    },
    updates: [
      {
        id: 'up-801',
        incidentId: 'inc-1008',
        timestamp: '2026-04-28T16:30:00.000Z',
        actorId: 'vol-6',
        actorName: 'Reshma S. Nair',
        actorRole: 'volunteer',
        newStatus: 'REPORTED',
        note: 'Found child brought to volunteer booth.'
      },
      {
        id: 'up-802',
        incidentId: 'inc-1008',
        timestamp: '2026-04-28T16:30:30.000Z',
        actorId: 'system',
        actorName: 'Suraksha Child Matcher AI',
        actorRole: 'system',
        previousStatus: 'REPORTED',
        newStatus: 'VERIFIED',
        note: 'MATCH DETECTED (94% confidence) with Missing Child Case #1002 (Aarav Menon). Verification pending admin confirmation.'
      }
    ]
  }
];

export const SEED_ALERTS: SafetyAlert[] = [
  {
    id: 'alert-2001',
    eventId: 'thrissur-pooram-2026',
    title: 'CRITICAL CROWD CRUSH SURGE — GATE 3 (NADUVILAL)',
    message: 'Dangerous crowd pressure detected at Naduvilal Arch Gate 3. DO NOT move toward Gate 3. Inflow halted.',
    level: 'RED',
    severity: 'CRITICAL',
    targetAreaName: 'Zone B — Naduvilal Gate 3 & Approaches',
    targetCenter: { lat: 10.5242, lng: 76.2120 },
    radiusMeters: 300,
    targetAudience: 'PUBLIC_IN_ZONE',
    timestamp: '2026-04-28T16:21:00.000Z',
    isActive: true,
    sourceIncidentId: 'inc-1001',
    actionInstructions: {
      whatToDo: [
        'Turn gently toward Western Exit (Kuruppam Road) or CMS Ground',
        'Keep your arms folded across your chest to protect breathing space',
        'Move with the crowd diagonals, not directly perpendicular or counter to flow',
        'Follow instructions from orange-vested Suraksha Volunteers and Kerala Police'
      ],
      whatNotToDo: [
        'DO NOT push forward into the archway',
        'DO NOT stop to pick up dropped items',
        'DO NOT enter the barricaded elephant safety perimeter'
      ],
      safeDirection: 'West toward Kuruppam Road Exit (Zone E)',
      safeZoneId: 'safe-zone-1'
    }
  },
  {
    id: 'alert-2002',
    eventId: 'thrissur-pooram-2026',
    title: 'Extreme Heatwave & Hydration Advisory',
    message: 'Ambient temperature reached 39°C. Free ORS packets & fresh drinking water distributed at all 12 volunteer booths.',
    level: 'YELLOW',
    severity: 'MEDIUM',
    targetAreaName: 'All Thekkinkadu Maidan Sectors',
    targetCenter: { lat: 10.5243, lng: 76.2144 },
    radiusMeters: 1000,
    targetAudience: 'ALL_USERS',
    timestamp: '2026-04-28T15:00:00.000Z',
    isActive: true,
    actionInstructions: {
      whatToDo: [
        'Drink water every 20 minutes even if not feeling thirsty',
        'Keep elderly persons in shaded CMS School pavilion or Town Hall'
      ],
      whatNotToDo: [
        'Do not ignore dizziness, excessive sweating, or dark urine'
      ]
    }
  }
];
