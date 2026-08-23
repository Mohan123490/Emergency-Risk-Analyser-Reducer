import { KeralaEvent } from '@/types';

export const KERALA_EVENTS: KeralaEvent[] = [
  {
    id: 'thrissur-pooram-2026',
    name: 'Thrissur Pooram Grand Festival 2026',
    locationName: 'Thekkinkadu Maidan, Vadakkumnathan Temple',
    city: 'Thrissur, Kerala',
    center: { lat: 10.5243, lng: 76.2144 },
    zoom: 17,
    expectedAttendance: 250000,
    maxCapacity: 300000,
    startDate: '2026-04-28T06:00:00.000Z',
    endDate: '2026-04-29T18:00:00.000Z',
    zones: [
      {
        id: 'zone-main-stage',
        eventId: 'thrissur-pooram-2026',
        name: 'Zone A — Vadakkumnathan Temple Sanctum & Stage',
        type: 'sanctum',
        coordinates: [
          { lat: 10.5255, lng: 76.2135 },
          { lat: 10.5255, lng: 76.2155 },
          { lat: 10.5235, lng: 76.2155 },
          { lat: 10.5235, lng: 76.2135 }
        ],
        center: { lat: 10.5245, lng: 76.2145 },
        capacity: 70000,
        currentPopulation: 58000,
        densityPercentage: 83,
        movementSpeed: 0.4,
        movementDirection: 'Stagnant (Circulation Bottleneck)',
        inflowRate: 1200,
        outflowRate: 950,
        exitBlocked: false,
        riskScore: 78,
        riskLevel: 'HIGH_RISK',
        activeIncidentsCount: 2,
        assignedVolunteersCount: 8,
        aiExplanation: 'High crowd density approaching 83% capacity with restricted movement during Kudamattam ritual display.',
        recommendations: [
          'Direct overflow crowds toward Swaraj Round North Clearing',
          'Deploy 4 volunteer marshals to regulate Kudamattam viewing perimeter',
          'Keep western evacuation corridor unobstructed'
        ]
      },
      {
        id: 'zone-gate-3-naduvilal',
        eventId: 'thrissur-pooram-2026',
        name: 'Zone B — Naduvilal Arch Gate 3 (Western Entry)',
        type: 'gate',
        coordinates: [
          { lat: 10.5245, lng: 76.2115 },
          { lat: 10.5255, lng: 76.2125 },
          { lat: 10.5235, lng: 76.2125 },
          { lat: 10.5235, lng: 76.2115 }
        ],
        center: { lat: 10.5242, lng: 76.2120 },
        capacity: 35000,
        currentPopulation: 32000,
        densityPercentage: 91,
        movementSpeed: 0.15,
        movementDirection: 'Surge Inward (Exit B Partially Blocked)',
        inflowRate: 1600,
        outflowRate: 350,
        exitBlocked: true,
        riskScore: 92,
        riskLevel: 'CRITICAL',
        activeIncidentsCount: 3,
        assignedVolunteersCount: 6,
        aiExplanation: 'Extreme crowd crush hazard. Inflow exceeds outflow by 4.5x. Stalls partially blocking Exit B.',
        recommendations: [
          'URGENT: Divert incoming pilgrims via MG Road / North Bus Stand bypass',
          'Open Emergency Gate 3B immediately',
          'Deploy Kerala Police Rapid Action Force for crowd surge dampening'
        ]
      },
      {
        id: 'zone-food-swaraj-round',
        eventId: 'thrissur-pooram-2026',
        name: 'Zone C — Swaraj Round Food & Exhibition Court',
        type: 'food',
        coordinates: [
          { lat: 10.5265, lng: 76.2135 },
          { lat: 10.5275, lng: 76.2155 },
          { lat: 10.5258, lng: 76.2155 },
          { lat: 10.5258, lng: 76.2135 }
        ],
        center: { lat: 10.5266, lng: 76.2145 },
        capacity: 45000,
        currentPopulation: 28000,
        densityPercentage: 62,
        movementSpeed: 0.8,
        movementDirection: 'Steady Circulation (North-East)',
        inflowRate: 800,
        outflowRate: 750,
        exitBlocked: false,
        riskScore: 45,
        riskLevel: 'CAUTION',
        activeIncidentsCount: 1,
        assignedVolunteersCount: 5,
        aiExplanation: 'Moderate family traffic. Lost children risk heightened around snack kiosks and illumination stalls.',
        recommendations: [
          'Broadcast missing person announcements via Public Address system',
          'Maintain visual line of sight around information booths'
        ]
      },
      {
        id: 'zone-parking-thekkinkadu',
        eventId: 'thrissur-pooram-2026',
        name: 'Zone D — Thekkinkadu Ground South (Elephant Line)',
        type: 'stage',
        coordinates: [
          { lat: 10.5225, lng: 76.2135 },
          { lat: 10.5235, lng: 76.2155 },
          { lat: 10.5215, lng: 76.2155 },
          { lat: 10.5215, lng: 76.2135 }
        ],
        center: { lat: 10.5225, lng: 76.2145 },
        capacity: 50000,
        currentPopulation: 25000,
        densityPercentage: 50,
        movementSpeed: 1.1,
        movementDirection: 'Open Walkway',
        inflowRate: 500,
        outflowRate: 600,
        exitBlocked: false,
        riskScore: 32,
        riskLevel: 'SAFE',
        activeIncidentsCount: 0,
        assignedVolunteersCount: 4,
        aiExplanation: 'Normal crowd distribution with clear safety buffer behind elephant barricades.',
        recommendations: [
          'Ensure fire safety tankers maintain 10m clear access lane'
        ]
      },
      {
        id: 'zone-western-exit',
        eventId: 'thrissur-pooram-2026',
        name: 'Zone E — Western Exit & Kuruppam Road Corridor',
        type: 'exit',
        coordinates: [
          { lat: 10.5235, lng: 76.2100 },
          { lat: 10.5245, lng: 76.2115 },
          { lat: 10.5225, lng: 76.2115 },
          { lat: 10.5225, lng: 76.2100 }
        ],
        center: { lat: 10.5235, lng: 76.2108 },
        capacity: 30000,
        currentPopulation: 12000,
        densityPercentage: 40,
        movementSpeed: 1.3,
        movementDirection: 'Fast Outflow Westward',
        inflowRate: 300,
        outflowRate: 900,
        exitBlocked: false,
        riskScore: 24,
        riskLevel: 'SAFE',
        activeIncidentsCount: 0,
        assignedVolunteersCount: 3,
        aiExplanation: 'Optimum egress rate. Recommended exit path for escaping central maidan congestion.',
        recommendations: [
          'Guide citizens seeking relief from Gate 3 toward this corridor'
        ]
      }
    ],
    safeZones: [
      {
        id: 'safe-zone-1',
        eventId: 'thrissur-pooram-2026',
        name: 'Safe Zone Alpha — CMS High School Ground',
        center: { lat: 10.5270, lng: 76.2120 },
        capacity: 25000,
        type: 'assembly_ground',
        description: 'Wide open field with continuous drinking water, first aid tent, and lighting.'
      },
      {
        id: 'safe-zone-2',
        eventId: 'thrissur-pooram-2026',
        name: 'Safe Zone Beta — Municipal Town Hall Complex',
        center: { lat: 10.5260, lng: 76.2175 },
        capacity: 15000,
        type: 'shelter',
        description: 'Covered auditorium, dedicated lost & found child holding room, and emergency ambulance dock.'
      },
      {
        id: 'safe-zone-3',
        eventId: 'thrissur-pooram-2026',
        name: 'Safe Zone Gamma — Kerala Sahitya Akademi Park',
        center: { lat: 10.5220, lng: 76.2170 },
        capacity: 12000,
        type: 'evacuation_clearing',
        description: 'Spacious green park with direct access to Chembukkavu multi-speciality medical triage post.'
      }
    ],
    emergencyExits: [
      {
        id: 'exit-1',
        eventId: 'thrissur-pooram-2026',
        name: 'Emergency Exit 1 — Swaraj North Passage',
        location: { lat: 10.5272, lng: 76.2145 },
        isOpen: true,
        widthMeters: 14,
        flowCapacityPerHour: 18000,
        status: 'CLEAR'
      },
      {
        id: 'exit-2',
        eventId: 'thrissur-pooram-2026',
        name: 'Emergency Exit 2 — Kuruppam Road South-West Gate',
        location: { lat: 10.5230, lng: 76.2105 },
        isOpen: true,
        widthMeters: 16,
        flowCapacityPerHour: 22000,
        status: 'CLEAR'
      },
      {
        id: 'exit-3',
        eventId: 'thrissur-pooram-2026',
        name: 'Emergency Exit 3 — Naduvilal Gate 3B (Emergency Release)',
        location: { lat: 10.5241, lng: 76.2118 },
        isOpen: false,
        widthMeters: 10,
        flowCapacityPerHour: 12000,
        status: 'BLOCKED'
      }
    ],
    medicalStations: [
      {
        id: 'med-1',
        name: 'Thrissur District Hospital Emergency Triage Camp #1',
        location: { lat: 10.5258, lng: 76.2160 },
        doctorOnDuty: 'Dr. Anoop Nambiar (MD Emergency Medicine)',
        availableBeds: 18,
        phone: '+91 94470 12345'
      },
      {
        id: 'med-2',
        name: 'Jubilee Mission Mobile Trauma Unit #2',
        location: { lat: 10.5230, lng: 76.2128 },
        doctorOnDuty: 'Dr. Priya Varma (Trauma Surgeon)',
        availableBeds: 8,
        phone: '+91 94470 67890'
      }
    ],
    policePoints: [
      {
        id: 'pol-1',
        name: 'Kerala Police Special Event Command Post (Swaraj Round)',
        location: { lat: 10.5248, lng: 76.2140 },
        inCharge: 'SP Rahul K. IPS (Law & Order)',
        phone: '112 / +91 487 242 4100',
        unitType: 'Kerala Police Control'
      },
      {
        id: 'pol-2',
        name: 'RAF Crowd Management Outpost (Naduvilal)',
        location: { lat: 10.5240, lng: 76.2122 },
        inCharge: 'Inspector Sujith Nair',
        phone: '+91 98460 55432',
        unitType: 'Rapid Action Force'
      }
    ]
  },
  {
    id: 'kochi-stadium-isl-2026',
    name: 'Kaloor JLN Stadium — Kerala Blasters vs Mohun Bagan (ISL Semi-Final)',
    locationName: 'Jawaharlal Nehru International Stadium, Kaloor',
    city: 'Kochi, Kerala',
    center: { lat: 9.9984, lng: 76.3000 },
    zoom: 17,
    expectedAttendance: 60000,
    maxCapacity: 65000,
    startDate: '2026-05-10T14:00:00.000Z',
    endDate: '2026-05-10T22:30:00.000Z',
    zones: [
      {
        id: 'jln-zone-east-stand',
        eventId: 'kochi-stadium-isl-2026',
        name: 'Zone A — East Fan Gallery (Manjappada Stand)',
        type: 'stage',
        coordinates: [
          { lat: 9.9990, lng: 76.3005 },
          { lat: 9.9990, lng: 76.3015 },
          { lat: 9.9975, lng: 76.3015 },
          { lat: 9.9975, lng: 76.3005 }
        ],
        center: { lat: 9.9983, lng: 76.3010 },
        capacity: 22000,
        currentPopulation: 21500,
        densityPercentage: 97,
        movementSpeed: 0.2,
        movementDirection: 'High Energy Standing Wave',
        inflowRate: 800,
        outflowRate: 200,
        exitBlocked: false,
        riskScore: 84,
        riskLevel: 'HIGH_RISK',
        activeIncidentsCount: 1,
        assignedVolunteersCount: 10,
        aiExplanation: 'Maximum density reached. Minor aisle stair congestions reported.',
        recommendations: ['Clear stair access pathways immediately']
      },
      {
        id: 'jln-zone-metro-gate',
        eventId: 'kochi-stadium-isl-2026',
        name: 'Zone B — JLN Metro Station Ramp & VIP Gate',
        type: 'gate',
        coordinates: [
          { lat: 9.9980, lng: 76.2985 },
          { lat: 9.9992, lng: 76.2995 },
          { lat: 9.9970, lng: 76.2995 },
          { lat: 9.9970, lng: 76.2985 }
        ],
        center: { lat: 9.9980, lng: 76.2990 },
        capacity: 18000,
        currentPopulation: 14000,
        densityPercentage: 77,
        movementSpeed: 0.6,
        movementDirection: 'Queueing to Metro Entry Gates',
        inflowRate: 1400,
        outflowRate: 900,
        exitBlocked: false,
        riskScore: 68,
        riskLevel: 'CAUTION',
        activeIncidentsCount: 1,
        assignedVolunteersCount: 6,
        aiExplanation: 'Metro surge as fans arrive. Automated ticket gates operating at capacity.',
        recommendations: ['Open secondary barcode scan lines']
      }
    ],
    safeZones: [
      {
        id: 'jln-safe-1',
        eventId: 'kochi-stadium-isl-2026',
        name: 'Stadium Outer Ring Concourse (North-West)',
        center: { lat: 10.0000, lng: 76.2990 },
        capacity: 20000,
        type: 'assembly_ground',
        description: 'Expansive 4-lane ring road with zero vehicular traffic.'
      }
    ],
    emergencyExits: [
      {
        id: 'jln-exit-1',
        eventId: 'kochi-stadium-isl-2026',
        name: 'Gate 4 North Arterial Road',
        location: { lat: 10.0002, lng: 76.3008 },
        isOpen: true,
        widthMeters: 18,
        flowCapacityPerHour: 30000,
        status: 'CLEAR'
      }
    ],
    medicalStations: [
      {
        id: 'jln-med-1',
        name: 'Medical Room Gate 1 Ground Floor (Aster Medcity Support)',
        location: { lat: 9.9984, lng: 76.2995 },
        doctorOnDuty: 'Dr. Vivek Menon',
        availableBeds: 12,
        phone: '+91 98470 99887'
      }
    ],
    policePoints: [
      {
        id: 'jln-pol-1',
        name: 'Kochi City Police Control Room (Stadium Gate 2)',
        location: { lat: 9.9975, lng: 76.2992 },
        inCharge: 'ACP George Thomas',
        phone: '+91 484 239 4200',
        unitType: 'Kerala Police Control'
      }
    ]
  },
  {
    id: 'attukal-pongala-2026',
    name: 'Attukal Bhagavathy Temple Pongala Mahotsavam',
    locationName: 'Attukal Temple & East Fort City Perimeter',
    city: 'Thiruvananthapuram, Kerala',
    center: { lat: 8.4735, lng: 76.9535 },
    zoom: 16,
    expectedAttendance: 1500000,
    maxCapacity: 1800000,
    startDate: '2026-03-03T05:00:00.000Z',
    endDate: '2026-03-03T20:00:00.000Z',
    zones: [
      {
        id: 'attukal-zone-temple-ground',
        eventId: 'attukal-pongala-2026',
        name: 'Zone A — Temple Sanctum & Hearth Line',
        type: 'sanctum',
        coordinates: [
          { lat: 8.4745, lng: 76.9525 },
          { lat: 8.4745, lng: 76.9545 },
          { lat: 8.4725, lng: 76.9545 },
          { lat: 8.4725, lng: 76.9525 }
        ],
        center: { lat: 8.4735, lng: 76.9535 },
        capacity: 100000,
        currentPopulation: 95000,
        densityPercentage: 95,
        movementSpeed: 0.1,
        movementDirection: 'Stationary Brick Hearth Grid',
        inflowRate: 2000,
        outflowRate: 500,
        exitBlocked: false,
        riskScore: 89,
        riskLevel: 'CRITICAL',
        activeIncidentsCount: 2,
        assignedVolunteersCount: 15,
        aiExplanation: 'Open fires + extreme heat wave + dense female gathering. Heatstroke risk critical.',
        recommendations: [
          'Activate high-pressure mist spraying fans across sanctum lanes',
          'Deploy water distribution volunteer squads every 50 meters'
        ]
      }
    ],
    safeZones: [
      {
        id: 'attukal-safe-1',
        eventId: 'attukal-pongala-2026',
        name: 'East Fort Putharikandam Ground Assembly Zone',
        center: { lat: 8.4830, lng: 76.9490 },
        capacity: 80000,
        type: 'assembly_ground',
        description: 'Massive open ground with 10 medical tents, ambulance fleet bay, and rest facilities.'
      }
    ],
    emergencyExits: [
      {
        id: 'attukal-exit-1',
        eventId: 'attukal-pongala-2026',
        name: 'Killiyar River Bypass Road',
        location: { lat: 8.4715, lng: 76.9555 },
        isOpen: true,
        widthMeters: 15,
        flowCapacityPerHour: 25000,
        status: 'CLEAR'
      }
    ],
    medicalStations: [
      {
        id: 'attukal-med-1',
        name: 'Trivandrum Medical College Field Station',
        location: { lat: 8.4740, lng: 76.9515 },
        doctorOnDuty: 'Dr. Lekshmi Nair',
        availableBeds: 24,
        phone: '+91 471 252 8300'
      }
    ],
    policePoints: [
      {
        id: 'attukal-pol-1',
        name: 'Pink Police & Women Safety Outpost',
        location: { lat: 8.4738, lng: 76.9530 },
        inCharge: 'Circle Inspector Mini S.',
        phone: '1515 / 112',
        unitType: 'Pink Police'
      }
    ]
  }
];
