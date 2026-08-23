import { UserProfile, AmbulanceUnit } from '@/types';

export const SEED_USERS: UserProfile[] = [
  // 1. Current Active Demo User (Citizen / Community Helper)
  {
    id: 'user-me',
    name: 'Pranav K. S.',
    mobile: '+91 98470 11223',
    role: 'citizen',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    locationPermission: true,
    currentLocation: { lat: 10.5244, lng: 76.2138 },
    currentZoneId: 'zone-main-stage',
    trustScore: 96,
    emergencyContacts: [
      { name: 'Anjali (Wife)', phone: '+91 98470 99881', relation: 'Spouse' },
      { name: 'Dr. Suresh (Father)', phone: '+91 94470 33445', relation: 'Father' }
    ],
    isCommunityHelper: true,
    verified: true
  },

  // 2. Additional Citizens (19 more)
  {
    id: 'user-cit-1',
    name: 'Deepa Menon',
    mobile: '+91 98460 22334',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5241, lng: 76.2121 },
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 88,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-2',
    name: 'Girish Kumar',
    mobile: '+91 94471 33445',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5266, lng: 76.2148 },
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 92,
    isCommunityHelper: false,
    verified: true
  },
  {
    id: 'user-cit-3',
    name: 'Fathima Rafeeq',
    mobile: '+91 97450 44556',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5228, lng: 76.2142 },
    currentZoneId: 'zone-parking-thekkinkadu',
    trustScore: 95,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-4',
    name: 'Arjun Das',
    mobile: '+91 96330 55667',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5243, lng: 76.2119 },
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 78,
    isCommunityHelper: false,
    verified: false
  },
  {
    id: 'user-cit-5',
    name: 'Lakshmi Warrier',
    mobile: '+91 95440 66778',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5246, lng: 76.2147 },
    currentZoneId: 'zone-main-stage',
    trustScore: 94,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-6',
    name: 'Nikhil Chandran',
    mobile: '+91 94000 77889',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5264, lng: 76.2143 },
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 89,
    isCommunityHelper: false,
    verified: true
  },
  {
    id: 'user-cit-7',
    name: 'Sreevidya Nair',
    mobile: '+91 98471 88990',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5234, lng: 76.2110 },
    currentZoneId: 'zone-western-exit',
    trustScore: 90,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-8',
    name: 'Rohit Balagopal',
    mobile: '+91 97472 99001',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5242, lng: 76.2123 },
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 82,
    isCommunityHelper: false,
    verified: true
  },
  {
    id: 'user-cit-9',
    name: 'Aswathy Thomas',
    mobile: '+91 96563 10112',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5247, lng: 76.2149 },
    currentZoneId: 'zone-main-stage',
    trustScore: 91,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-10',
    name: 'Karthik Varma',
    mobile: '+91 95674 21223',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5267, lng: 76.2144 },
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 87,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-11',
    name: 'Meera Nambeesan',
    mobile: '+91 94465 32334',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5226, lng: 76.2146 },
    currentZoneId: 'zone-parking-thekkinkadu',
    trustScore: 93,
    isCommunityHelper: false,
    verified: true
  },
  {
    id: 'user-cit-12',
    name: 'Sujith Pillai',
    mobile: '+91 98476 43445',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5243, lng: 76.2117 },
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 85,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-13',
    name: 'Ananya Joy',
    mobile: '+91 97457 54556',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5249, lng: 76.2142 },
    currentZoneId: 'zone-main-stage',
    trustScore: 96,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-14',
    name: 'Biju Joseph',
    mobile: '+91 96338 65667',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5236, lng: 76.2109 },
    currentZoneId: 'zone-western-exit',
    trustScore: 84,
    isCommunityHelper: false,
    verified: true
  },
  {
    id: 'user-cit-15',
    name: 'Haritha Krishnan',
    mobile: '+91 95449 76778',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5268, lng: 76.2147 },
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 97,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-16',
    name: 'Abhijith R.',
    mobile: '+91 94001 87889',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5241, lng: 76.2124 },
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 76,
    isCommunityHelper: false,
    verified: false
  },
  {
    id: 'user-cit-17',
    name: 'Shilpa Dev',
    mobile: '+91 98472 98990',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5248, lng: 76.2144 },
    currentZoneId: 'zone-main-stage',
    trustScore: 89,
    isCommunityHelper: true,
    verified: true
  },
  {
    id: 'user-cit-18',
    name: 'Manoj Kurian',
    mobile: '+91 97473 09001',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5224, lng: 76.2143 },
    currentZoneId: 'zone-parking-thekkinkadu',
    trustScore: 91,
    isCommunityHelper: false,
    verified: true
  },
  {
    id: 'user-cit-19',
    name: 'Kavitha Shenoy',
    mobile: '+91 96564 19112',
    role: 'citizen',
    locationPermission: true,
    currentLocation: { lat: 10.5235, lng: 76.2107 },
    currentZoneId: 'zone-western-exit',
    trustScore: 94,
    isCommunityHelper: true,
    verified: true
  },

  // 3. Registered Volunteers (10 volunteers with diverse specializations)
  {
    id: 'vol-1',
    name: 'Sarath Chandran',
    mobile: '+91 98471 00101',
    role: 'volunteer',
    volunteerCategory: 'medical',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5246, lng: 76.2140 }, // ~120m from main stage
    currentZoneId: 'zone-main-stage',
    trustScore: 99,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-2',
    name: 'Akhil Mohan (Red Cross Lead)',
    mobile: '+91 98472 00202',
    role: 'volunteer',
    volunteerCategory: 'medical',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5259, lng: 76.2158 }, // Near Med Station 1
    currentZoneId: 'zone-main-stage',
    trustScore: 98,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-3',
    name: 'Vishnu Prasad',
    mobile: '+91 98473 00303',
    role: 'volunteer',
    volunteerCategory: 'crowd_management',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5243, lng: 76.2122 }, // Near Gate 3
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 97,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-4',
    name: 'Devika Krishnan',
    mobile: '+91 98474 00404',
    role: 'volunteer',
    volunteerCategory: 'crowd_management',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5241, lng: 76.2119 }, // Gate 3 cordon
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 96,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-5',
    name: 'Muhammed Shafi',
    mobile: '+91 98475 00505',
    role: 'volunteer',
    volunteerCategory: 'security',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5265, lng: 76.2144 }, // Food Court
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 98,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-6',
    name: 'Reshma S. Nair',
    mobile: '+91 98476 00606',
    role: 'volunteer',
    volunteerCategory: 'general',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5268, lng: 76.2146 }, // Lost Child desk
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 99,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-7',
    name: 'Kiran Devassy',
    mobile: '+91 98477 00707',
    role: 'volunteer',
    volunteerCategory: 'event',
    volunteerStatus: 'busy',
    locationPermission: true,
    currentLocation: { lat: 10.5225, lng: 76.2142 }, // Elephant barricade
    currentZoneId: 'zone-parking-thekkinkadu',
    trustScore: 95,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-8',
    name: 'Anupama Raj',
    mobile: '+91 98478 00808',
    role: 'volunteer',
    volunteerCategory: 'general',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5235, lng: 76.2110 }, // Western corridor
    currentZoneId: 'zone-western-exit',
    trustScore: 96,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-9',
    name: 'Rahul R. Varma',
    mobile: '+91 98479 00909',
    role: 'volunteer',
    volunteerCategory: 'crowd_management',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5244, lng: 76.2125 }, // Gate 3 Approach
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 97,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'vol-10',
    name: 'Sneha Susan',
    mobile: '+91 98480 01010',
    role: 'volunteer',
    volunteerCategory: 'medical',
    volunteerStatus: 'available',
    locationPermission: true,
    currentLocation: { lat: 10.5229, lng: 76.2130 }, // Jubilee trauma tent
    currentZoneId: 'zone-parking-thekkinkadu',
    trustScore: 98,
    verified: true,
    isCommunityHelper: false
  },

  // 4. Police / Security Responders (5 officers/units)
  {
    id: 'pol-resp-1',
    name: 'SI Madhavan Unni (Sector 1 Patrol)',
    mobile: '+91 94979 01100',
    role: 'police',
    locationPermission: true,
    currentLocation: { lat: 10.5249, lng: 76.2141 },
    currentZoneId: 'zone-main-stage',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'pol-resp-2',
    name: 'Inspector Sujith Nair (RAF Strike Unit)',
    mobile: '+91 94979 02200',
    role: 'police',
    locationPermission: true,
    currentLocation: { lat: 10.5240, lng: 76.2120 },
    currentZoneId: 'zone-gate-3-naduvilal',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'pol-resp-3',
    name: 'ASI Thomas Mathew (Crime Prevention & Theft Squad)',
    mobile: '+91 94979 03300',
    role: 'police',
    locationPermission: true,
    currentLocation: { lat: 10.5263, lng: 76.2142 },
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'pol-resp-4',
    name: 'Pink Patrol Team Alpha (Women & Child Safety)',
    mobile: '+91 94979 04400',
    role: 'police',
    locationPermission: true,
    currentLocation: { lat: 10.5266, lng: 76.2147 },
    currentZoneId: 'zone-food-swaraj-round',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'pol-resp-5',
    name: 'Traffic SI Rajan P. (Corridor Clearance)',
    mobile: '+91 94979 05500',
    role: 'police',
    locationPermission: true,
    currentLocation: { lat: 10.5233, lng: 76.2106 },
    currentZoneId: 'zone-western-exit',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },

  // 5. Medical Responders (4 doctors/paramedics)
  {
    id: 'med-resp-1',
    name: 'Dr. Anoop Nambiar (Emergency Lead)',
    mobile: '+91 94470 12345',
    role: 'medical',
    locationPermission: true,
    currentLocation: { lat: 10.5258, lng: 76.2160 },
    currentZoneId: 'zone-main-stage',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'med-resp-2',
    name: 'Dr. Priya Varma (Trauma Physician)',
    mobile: '+91 94470 67890',
    role: 'medical',
    locationPermission: true,
    currentLocation: { lat: 10.5230, lng: 76.2128 },
    currentZoneId: 'zone-parking-thekkinkadu',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'med-resp-3',
    name: 'Paramedic Haridas K. (ALS Bike Unit)',
    mobile: '+91 94471 88990',
    role: 'medical',
    locationPermission: true,
    currentLocation: { lat: 10.5244, lng: 76.2135 },
    currentZoneId: 'zone-main-stage',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },
  {
    id: 'med-resp-4',
    name: 'Nurse Superintendent Jini Alex',
    mobile: '+91 94472 99001',
    role: 'medical',
    locationPermission: true,
    currentLocation: { lat: 10.5270, lng: 76.2120 }, // CMS Safe Zone camp
    currentZoneId: 'zone-western-exit',
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  },

  // 6. Admin / Control Room Chief
  {
    id: 'admin-1',
    name: 'District Disaster Management Authority (DDMA Thrissur)',
    mobile: '+91 487 236 2400',
    role: 'admin',
    locationPermission: true,
    currentLocation: { lat: 10.5260, lng: 76.2175 }, // Town hall control room
    trustScore: 100,
    verified: true,
    isCommunityHelper: false
  }
];

export const SEED_AMBULANCES: AmbulanceUnit[] = [
  {
    id: 'amb-1',
    plateNumber: 'KL-08-CC-4421 (ALS Unit 1)',
    driverName: 'Raghavan Pillai',
    driverPhone: '+91 94470 88771',
    status: 'AVAILABLE',
    currentLocation: { lat: 10.5262, lng: 76.2168 },
    baseHospitalName: 'Thrissur District Hospital',
    equipmentLevel: 'ALS (Advanced)',
    etaMinutes: 3
  },
  {
    id: 'amb-2',
    plateNumber: 'KL-08-BM-1108 (BLS Unit 2)',
    driverName: 'John Varghese',
    driverPhone: '+91 94471 22334',
    status: 'AVAILABLE',
    currentLocation: { lat: 10.5228, lng: 76.2120 },
    baseHospitalName: 'Jubilee Mission Medical College',
    equipmentLevel: 'BLS (Basic)',
    etaMinutes: 4
  },
  {
    id: 'amb-3',
    plateNumber: 'KL-08-DX-9900 (Bike First Responder)',
    driverName: 'Sanjay S.',
    driverPhone: '+91 94472 55667',
    status: 'AVAILABLE',
    currentLocation: { lat: 10.5245, lng: 76.2132 },
    baseHospitalName: 'Red Cross Emergency Post',
    equipmentLevel: 'First Responder Bike',
    etaMinutes: 1
  }
];
