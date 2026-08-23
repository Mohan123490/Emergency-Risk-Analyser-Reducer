// SURAKSHA 360 - Type Definitions

export type UserRole = 'citizen' | 'volunteer' | 'medical' | 'police' | 'admin';

export type VolunteerCategory = 
  | 'medical' 
  | 'crowd_management' 
  | 'security' 
  | 'event' 
  | 'general';

export type VolunteerStatus = 'available' | 'busy' | 'offline';

export type IncidentCategory =
  | 'medical_emergency'
  | 'ambulance_required'
  | 'missing_child'
  | 'missing_person'
  | 'found_child'
  | 'found_person'
  | 'theft'
  | 'fight'
  | 'fire'
  | 'accident'
  | 'dangerous_crowd'
  | 'crowd_blockage'
  | 'suspicious_activity'
  | 'infrastructure_damage'
  | 'road_blocked'
  | 'person_trapped'
  | 'disaster'
  | 'other';

export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IncidentStatus =
  | 'REPORTED'
  | 'VERIFIED'
  | 'ASSIGNED'
  | 'RESPONDER_EN_ROUTE'
  | 'RESPONDER_ARRIVED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'DISMISSED'
  | 'MERGED';

export type AlertLevel = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserProfile {
  id: string;
  name: string;
  mobile: string; // Private, masked in UI
  role: UserRole;
  avatarUrl?: string;
  locationPermission: boolean;
  currentLocation?: Coordinates;
  currentZoneId?: string;
  volunteerCategory?: VolunteerCategory;
  volunteerStatus?: VolunteerStatus;
  trustScore: number; // 0 to 100
  emergencyContacts?: { name: string; phone: string; relation: string }[];
  isCommunityHelper: boolean;
  activeTaskId?: string;
  verified: boolean;
}

export interface KeralaEvent {
  id: string;
  name: string;
  locationName: string;
  city: string;
  center: Coordinates;
  zoom: number;
  expectedAttendance: number;
  maxCapacity: number;
  startDate: string;
  endDate: string;
  zones: RiskZone[];
  safeZones: SafeZone[];
  emergencyExits: EmergencyExit[];
  medicalStations: MedicalStation[];
  policePoints: PolicePoint[];
}

export interface RiskZone {
  id: string;
  eventId: string;
  name: string;
  type: 'stage' | 'gate' | 'food' | 'parking' | 'exit' | 'pathway' | 'sanctum';
  coordinates: Coordinates[]; // Polygon boundary
  center: Coordinates;
  capacity: number;
  currentPopulation: number;
  densityPercentage: number; // 0-100%
  movementSpeed: number; // m/s
  movementDirection: string; // N, S, E, W, Stagnant, Bottleneck
  inflowRate: number; // people/min
  outflowRate: number; // people/min
  exitBlocked: boolean;
  riskScore: number; // 0 to 100
  riskLevel: 'SAFE' | 'CAUTION' | 'HIGH_RISK' | 'CRITICAL';
  activeIncidentsCount: number;
  assignedVolunteersCount: number;
  aiExplanation?: string;
  recommendations?: string[];
}

export interface SafeZone {
  id: string;
  eventId: string;
  name: string;
  center: Coordinates;
  capacity: number;
  type: 'assembly_ground' | 'medical_camp' | 'evacuation_clearing' | 'shelter';
  description: string;
}

export interface EmergencyExit {
  id: string;
  eventId: string;
  name: string;
  location: Coordinates;
  isOpen: boolean;
  widthMeters: number;
  flowCapacityPerHour: number;
  status: 'CLEAR' | 'CONGESTED' | 'BLOCKED';
}

export interface MedicalStation {
  id: string;
  name: string;
  location: Coordinates;
  doctorOnDuty: string;
  availableBeds: number;
  phone: string;
}

export interface PolicePoint {
  id: string;
  name: string;
  location: Coordinates;
  inCharge: string;
  phone: string;
  unitType: 'Kerala Police Control' | 'Rapid Action Force' | 'Traffic Police' | 'Pink Police';
}

export interface Incident {
  id: string;
  eventId: string;
  category: IncidentCategory;
  title: string;
  description: string;
  location: Coordinates;
  locationName: string;
  zoneId?: string;
  reporterId: string;
  reporterName: string; // Masked for privacy
  reporterTrustScore: number;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedPeopleCount: number;
  timestamp: string;
  photoUrl?: string;
  voiceNoteUrl?: string;
  mediaType?: 'photo' | 'voice' | 'text';
  assignedResponderId?: string;
  assignedResponderName?: string;
  assignedResponderRole?: UserRole;
  assignedResponderDistanceMeters?: number;
  ambulanceAssigned?: AmbulanceUnit;
  updates: IncidentUpdateLog[];
  duplicateOfId?: string;
  possibleDuplicates?: string[]; // IDs of nearby reports
  aiSuggestedSeverity?: IncidentSeverity;
  aiConfidence?: number;
  aiCategoryClassification?: string;
  isCriticalAlertTriggered: boolean;
  communityHelpRequested: boolean;
  communityHelpTask?: string;
  communityHelpersAssigned?: string[];
  medicalDetails?: {
    symptomType: 'unconscious' | 'bleeding' | 'breathing' | 'cardiac' | 'trauma' | 'other';
    consciousness: 'conscious' | 'unconscious' | 'semi-conscious';
    breathing: boolean;
    priorityScore: number;
  };
  missingPersonDetails?: MissingPersonCase;
}

export interface IncidentUpdateLog {
  id: string;
  incidentId: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole | 'system';
  previousStatus?: IncidentStatus;
  newStatus: IncidentStatus;
  note: string;
}

export interface MissingPersonCase {
  id: string;
  incidentId: string;
  caseType: 'MISSING' | 'FOUND';
  personName: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  clothingDescription: string;
  lastKnownLocationName: string;
  lastKnownCoordinates: Coordinates;
  timeLastSeen: string;
  photoUrl?: string;
  guardianName?: string;
  guardianPhoneMasked?: string;
  matchedCaseId?: string;
  matchScore?: number; // 0-100%
  verificationStatus: 'PENDING_ADMIN' | 'VERIFIED' | 'REUNITED' | 'FALSE_ALARM';
  reunitedAt?: string;
  reunitedBy?: string;
  privacyMasked: boolean;
}

export interface AmbulanceUnit {
  id: string;
  plateNumber: string;
  driverName: string;
  driverPhone: string;
  status: 'AVAILABLE' | 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'TRANSPORTING' | 'MAINTENANCE';
  currentLocation: Coordinates;
  baseHospitalName: string;
  equipmentLevel: 'ALS (Advanced)' | 'BLS (Basic)' | 'First Responder Bike';
  assignedIncidentId?: string;
  etaMinutes?: number;
}

export interface SafetyAlert {
  id: string;
  eventId: string;
  title: string;
  message: string;
  level: AlertLevel;
  severity: IncidentSeverity;
  targetAreaName: string;
  targetCenter: Coordinates;
  radiusMeters: number;
  targetAudience: 'PUBLIC_IN_ZONE' | 'ALL_USERS' | 'RESPONDERS_ONLY' | 'ADMIN_ONLY';
  timestamp: string;
  isActive: boolean;
  actionInstructions: {
    whatToDo: string[];
    whatNotToDo: string[];
    safeDirection?: string;
    safeZoneId?: string;
  };
  sourceIncidentId?: string;
}

export interface CrowdRiskPrediction {
  zoneId: string;
  zoneName: string;
  currentRiskScore: number;
  predictedRiskScore10Min: number;
  trend: 'RISING_FAST' | 'RISING' | 'STABLE' | 'DECREASING';
  factors: {
    densityContribution: number;
    velocityDropContribution: number;
    exitBlockageContribution: number;
    reportConcentrationContribution: number;
  };
  aiRecommendations: string[];
  suggestedVolunteers: number;
  securityInterventionRequired: boolean;
}

export interface CommunityAssistanceTask {
  id: string;
  incidentId: string;
  title: string;
  instruction: string;
  zoneName: string;
  location: Coordinates;
  radiusMeters: number;
  urgency: 'NORMAL' | 'URGENT';
  maxVolunteersNeeded: number;
  volunteersAccepted: string[];
  expiresAt: string;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'incident' | 'alert' | 'zone' | 'user' | 'disaster_mode' | 'ambulance';
  entityId: string;
  details: string;
}
