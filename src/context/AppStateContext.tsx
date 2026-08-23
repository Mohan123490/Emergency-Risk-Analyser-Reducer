'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  UserProfile,
  UserRole,
  KeralaEvent,
  Incident,
  SafetyAlert,
  AmbulanceUnit,
  IncidentStatus,
  VolunteerStatus,
  IncidentSeverity,
  SystemAuditLog
} from '@/types';
import { KERALA_EVENTS } from '@/data/keralaEvents';
import { SEED_USERS, SEED_AMBULANCES } from '@/data/seedUsers';
import { SEED_INCIDENTS, SEED_ALERTS } from '@/data/seedIncidents';
import { soundFX } from '@/lib/soundEffects';
import { calculateDistanceMeters } from '@/lib/geoUtils';
import { calculateZoneRiskScore } from '@/lib/riskEngine';
import { SupportedLanguage, TRANSLATIONS, TranslationDictionary } from '@/lib/translations';

interface AppStateContextType {
  currentEvent: KeralaEvent;
  currentUser: UserProfile;
  allUsers: UserProfile[];
  incidents: Incident[];
  alerts: SafetyAlert[];
  ambulances: AmbulanceUnit[];
  disasterMode: boolean;
  activeScenarioName: string | null;
  auditLogs: SystemAuditLog[];
  
  // Multilingual System
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  
  // Role & User Actions
  switchRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  switchEvent: (eventId: string) => void;
  updateCurrentUserProfile: (profileUpdates: Partial<UserProfile>) => void;
  
  // Incident Actions
  reportIncident: (newIncident: Partial<Incident>) => Incident;
  updateIncidentStatus: (incidentId: string, status: IncidentStatus, note?: string) => void;
  assignResponder: (incidentId: string, responderId: string) => void;
  dispatchAmbulance: (incidentId: string, ambulanceId?: string) => void;
  mergeIncidents: (primaryId: string, duplicateIds: string[]) => void;
  dismissIncident: (incidentId: string, reason: string) => void;
  
  // Missing Person Actions
  verifyMissingPersonCase: (caseId: string) => void;
  reuniteMissingPerson: (missingCaseId: string, foundCaseId: string) => void;
  
  // Volunteer & Community
  joinCommunityHelp: (incidentId: string) => void;
  updateVolunteerStatus: (status: VolunteerStatus) => void;
  
  // Alerts & Disaster Mode
  toggleDisasterMode: () => void;
  broadcastCustomAlert: (alert: Partial<SafetyAlert>) => void;
  dismissAlert: (alertId: string) => void;
  
  // Tactical Simulation Scenarios
  triggerSimulationScenario: (scenarioIndex: number) => void;
  resetSimulation: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [currentEvent, setCurrentEvent] = useState<KeralaEvent>(KERALA_EVENTS[0]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(SEED_USERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(SEED_USERS[0]);
  const [incidents, setIncidents] = useState<Incident[]>(SEED_INCIDENTS);
  const [alerts, setAlerts] = useState<SafetyAlert[]>(SEED_ALERTS);
  const [ambulances, setAmbulances] = useState<AmbulanceUnit[]>(SEED_AMBULANCES);
  const [disasterMode, setDisasterMode] = useState<boolean>(false);
  const [activeScenarioName, setActiveScenarioName] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>([
    {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      userId: 'admin-1',
      userName: 'DDMA Thrissur',
      action: 'INITIALIZED_EVENT_CONTROL_ROOM',
      entityType: 'incident',
      entityId: 'thrissur-pooram-2026',
      details: 'C4ISR Command Center active. 5 Risk zones and 3 medical triage posts operational.'
    }
  ]);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    soundFX.playAlertChime();
  }, []);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Recalculate zone risk scores dynamically when incidents or zone parameters change
  useEffect(() => {
    setCurrentEvent((prev) => {
      const updatedZones = prev.zones.map((zone) => {
        const activeInZone = incidents.filter(
          (inc) => inc.zoneId === zone.id && inc.status !== 'RESOLVED' && inc.status !== 'DISMISSED'
        );
        const calc = calculateZoneRiskScore(zone, activeInZone);
        return {
          ...zone,
          riskScore: calc.score,
          riskLevel: calc.level,
          activeIncidentsCount: activeInZone.length,
          aiExplanation: calc.explanation,
          recommendations: calc.recommendations
        };
      });
      return { ...prev, zones: updatedZones };
    });
  }, [incidents]);

  const addAuditLog = useCallback((action: string, entityType: SystemAuditLog['entityType'], entityId: string, details: string) => {
    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: currentUser.id,
      userName: currentUser.name,
      action,
      entityType,
      entityId,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 50)]);
  }, [currentUser]);

  // Switch Role
  const switchRole = useCallback((role: UserRole) => {
    let target = allUsers.find((u) => u.role === role);
    if (!target) {
      target = {
        id: `user-${role}-mock`,
        name: `${role.toUpperCase()} User`,
        mobile: '+91 98000 00000',
        role,
        locationPermission: true,
        currentLocation: currentEvent.center,
        trustScore: 90,
        isCommunityHelper: role === 'citizen',
        verified: true
      };
      setAllUsers((prev) => [...prev, target!]);
    }
    setCurrentUser(target);
    soundFX.playAlertChime();
  }, [allUsers, currentEvent]);

  // Switch User
  const switchUser = useCallback((userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  }, [allUsers]);

  // Switch Event
  const switchEvent = useCallback((eventId: string) => {
    const evt = KERALA_EVENTS.find((e) => e.id === eventId);
    if (evt) {
      setCurrentEvent(evt);
      addAuditLog('SWITCHED_EVENT', 'zone', eventId, `Switched control room to ${evt.name}`);
      soundFX.playAlertChime();
    }
  }, [addAuditLog]);

  // Update Profile
  const updateCurrentUserProfile = useCallback((profileUpdates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...profileUpdates }));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...profileUpdates } : u))
    );
  }, [currentUser.id]);

  // Report Incident
  const reportIncident = useCallback((newIncident: Partial<Incident>): Incident => {
    const id = `inc-${Date.now().toString().slice(-4)}`;
    const isCritical = newIncident.severity === 'CRITICAL';

    const fullIncident: Incident = {
      id,
      eventId: currentEvent.id,
      category: newIncident.category || 'other',
      title: newIncident.title || 'Incident Report',
      description: newIncident.description || '',
      location: newIncident.location || currentUser.currentLocation || currentEvent.center,
      locationName: newIncident.locationName || 'Thekkinkadu Grounds',
      zoneId: newIncident.zoneId || currentEvent.zones[0]?.id,
      reporterId: currentUser.id,
      reporterName: currentUser.name.split(' ')[0] + ' ' + (currentUser.name.split(' ')[1]?.[0] || '') + '.',
      reporterTrustScore: currentUser.trustScore,
      severity: newIncident.severity || 'MEDIUM',
      status: 'REPORTED',
      affectedPeopleCount: newIncident.affectedPeopleCount || 1,
      timestamp: new Date().toISOString(),
      photoUrl: newIncident.photoUrl,
      mediaType: newIncident.mediaType || 'text',
      isCriticalAlertTriggered: isCritical,
      communityHelpRequested: isCritical || newIncident.category === 'missing_child' || newIncident.category === 'found_child',
      communityHelpTask: isCritical
        ? 'Please clear the surrounding walkway to allow medical & responder access.'
        : undefined,
      updates: [
        {
          id: `up-${Date.now()}`,
          incidentId: id,
          timestamp: new Date().toISOString(),
          actorId: currentUser.id,
          actorName: currentUser.name,
          actorRole: currentUser.role,
          newStatus: 'REPORTED',
          note: 'Incident registered by user via Suraksha App.'
        }
      ],
      medicalDetails: newIncident.medicalDetails,
      missingPersonDetails: newIncident.missingPersonDetails
    };

    setIncidents((prev) => [fullIncident, ...prev]);
    addAuditLog('REPORTED_INCIDENT', 'incident', id, `New ${fullIncident.severity} incident reported: ${fullIncident.title}`);

    if (isCritical) {
      soundFX.playCriticalSiren(3);
      // Auto broadcast critical safety alert
      const newAlert: SafetyAlert = {
        id: `alert-${Date.now()}`,
        eventId: currentEvent.id,
        title: `EMERGENCY ALERT: ${fullIncident.title.toUpperCase()}`,
        message: fullIncident.description,
        level: 'RED',
        severity: 'CRITICAL',
        targetAreaName: fullIncident.locationName,
        targetCenter: fullIncident.location,
        radiusMeters: 400,
        targetAudience: 'PUBLIC_IN_ZONE',
        timestamp: new Date().toISOString(),
        isActive: true,
        sourceIncidentId: id,
        actionInstructions: {
          whatToDo: [
            'Maintain calm and follow directions from Kerala Police & Volunteers',
            'Move away from the affected sector toward designated safe assembly zones',
            'Keep emergency lanes clear for ambulances'
          ],
          whatNotToDo: [
            'DO NOT run or create sudden crowd shockwaves',
            'DO NOT crowd around responders or victims'
          ],
          safeDirection: 'Proceed to nearest safe ground',
          safeZoneId: currentEvent.safeZones[0]?.id
        }
      };
      setAlerts((prev) => [newAlert, ...prev]);
    } else {
      soundFX.playAlertChime();
    }

    return fullIncident;
  }, [currentEvent, currentUser, addAuditLog]);

  // Update Status
  const updateIncidentStatus = useCallback((incidentId: string, status: IncidentStatus, note?: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== incidentId) return inc;
        const newUpdate = {
          id: `up-${Date.now()}`,
          incidentId,
          timestamp: new Date().toISOString(),
          actorId: currentUser.id,
          actorName: currentUser.name,
          actorRole: currentUser.role,
          previousStatus: inc.status,
          newStatus: status,
          note: note || `Status transitioned to ${status}`
        };
        return {
          ...inc,
          status,
          updates: [...inc.updates, newUpdate]
        };
      })
    );
    addAuditLog('STATUS_UPDATED', 'incident', incidentId, `Updated status to ${status} (${note || ''})`);
    if (status === 'RESOLVED') {
      soundFX.playSuccessChime();
    } else {
      soundFX.playAlertChime();
    }
  }, [currentUser, addAuditLog]);

  // Assign Responder
  const assignResponder = useCallback((incidentId: string, responderId: string) => {
    const responder = allUsers.find((u) => u.id === responderId);
    if (!responder) return;

    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== incidentId) return inc;
        const dist = responder.currentLocation ? calculateDistanceMeters(inc.location, responder.currentLocation) : 100;
        const newUpdate = {
          id: `up-${Date.now()}`,
          incidentId,
          timestamp: new Date().toISOString(),
          actorId: currentUser.id,
          actorName: currentUser.name,
          actorRole: currentUser.role,
          previousStatus: inc.status,
          newStatus: 'ASSIGNED' as IncidentStatus,
          note: `Assigned to ${responder.name} (${responder.role.toUpperCase()}) - ${dist}m away.`
        };
        return {
          ...inc,
          status: 'ASSIGNED',
          assignedResponderId: responder.id,
          assignedResponderName: responder.name,
          assignedResponderRole: responder.role,
          assignedResponderDistanceMeters: dist,
          updates: [...inc.updates, newUpdate]
        };
      })
    );

    // Update responder user state to busy
    setAllUsers((prev) =>
      prev.map((u) => (u.id === responderId ? { ...u, volunteerStatus: 'busy', activeTaskId: incidentId } : u))
    );

    addAuditLog('ASSIGNED_RESPONDER', 'incident', incidentId, `Assigned ${responder.name} to incident #${incidentId}`);
    soundFX.playAlertChime();
  }, [allUsers, currentUser, addAuditLog]);

  // Dispatch Ambulance
  const dispatchAmbulance = useCallback((incidentId: string, ambulanceId?: string) => {
    const targetAmb = ambulanceId
      ? ambulances.find((a) => a.id === ambulanceId)
      : ambulances.find((a) => a.status === 'AVAILABLE') || ambulances[0];

    if (!targetAmb) return;

    setAmbulances((prev) =>
      prev.map((a) => (a.id === targetAmb.id ? { ...a, status: 'DISPATCHED', assignedIncidentId: incidentId } : a))
    );

    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== incidentId) return inc;
        const newUpdate = {
          id: `up-${Date.now()}`,
          incidentId,
          timestamp: new Date().toISOString(),
          actorId: currentUser.id,
          actorName: currentUser.name,
          actorRole: currentUser.role,
          previousStatus: inc.status,
          newStatus: 'RESPONDER_EN_ROUTE' as IncidentStatus,
          note: `Ambulance ${targetAmb.plateNumber} dispatched (Driver: ${targetAmb.driverName}, ETA: ${targetAmb.etaMinutes} mins)`
        };
        return {
          ...inc,
          status: 'RESPONDER_EN_ROUTE',
          ambulanceAssigned: { ...targetAmb, status: 'DISPATCHED' },
          updates: [...inc.updates, newUpdate]
        };
      })
    );

    addAuditLog('DISPATCHED_AMBULANCE', 'ambulance', targetAmb.id, `Dispatched ${targetAmb.plateNumber} to incident #${incidentId}`);
    soundFX.playCriticalSiren(1.5);
  }, [ambulances, currentUser, addAuditLog]);

  // Merge Duplicate Incidents
  const mergeIncidents = useCallback((primaryId: string, duplicateIds: string[]) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (duplicateIds.includes(inc.id)) {
          return {
            ...inc,
            status: 'MERGED',
            duplicateOfId: primaryId,
            updates: [
              ...inc.updates,
              {
                id: `up-${Date.now()}`,
                incidentId: inc.id,
                timestamp: new Date().toISOString(),
                actorId: currentUser.id,
                actorName: currentUser.name,
                actorRole: currentUser.role,
                newStatus: 'MERGED',
                note: `Merged with primary incident #${primaryId} due to geographic and temporal overlap.`
              }
            ]
          };
        }
        if (inc.id === primaryId) {
          return {
            ...inc,
            possibleDuplicates: Array.from(new Set([...(inc.possibleDuplicates || []), ...duplicateIds]))
          };
        }
        return inc;
      })
    );
    addAuditLog('MERGED_INCIDENTS', 'incident', primaryId, `Merged ${duplicateIds.length} duplicate reports into #${primaryId}`);
    soundFX.playSuccessChime();
  }, [currentUser, addAuditLog]);

  // Dismiss Incident
  const dismissIncident = useCallback((incidentId: string, reason: string) => {
    updateIncidentStatus(incidentId, 'DISMISSED', `Dismissed by control room: ${reason}`);
  }, [updateIncidentStatus]);

  // Verify Missing Person
  const verifyMissingPersonCase = useCallback((caseId: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.missingPersonDetails && inc.missingPersonDetails.id === caseId) {
          return {
            ...inc,
            missingPersonDetails: {
              ...inc.missingPersonDetails,
              verificationStatus: 'VERIFIED',
              privacyMasked: false
            }
          };
        }
        return inc;
      })
    );
    addAuditLog('VERIFIED_MISSING_PERSON', 'incident', caseId, `Verified missing person case #${caseId}`);
    soundFX.playAlertChime();
  }, [addAuditLog]);

  // Reunite Missing Person
  const reuniteMissingPerson = useCallback((missingCaseId: string, foundCaseId: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.missingPersonDetails?.id === missingCaseId || inc.missingPersonDetails?.id === foundCaseId) {
          const isMissing = inc.missingPersonDetails.caseType === 'MISSING';
          return {
            ...inc,
            status: 'RESOLVED',
            missingPersonDetails: {
              ...inc.missingPersonDetails,
              verificationStatus: 'REUNITED',
              reunitedAt: new Date().toISOString(),
              reunitedBy: currentUser.name,
              matchedCaseId: isMissing ? foundCaseId : missingCaseId
            },
            updates: [
              ...inc.updates,
              {
                id: `up-${Date.now()}`,
                incidentId: inc.id,
                timestamp: new Date().toISOString(),
                actorId: currentUser.id,
                actorName: currentUser.name,
                actorRole: currentUser.role,
                newStatus: 'RESOLVED',
                note: `Child successfully reunited with family through verified match (#${missingCaseId} & #${foundCaseId}). Case closed.`
              }
            ]
          };
        }
        return inc;
      })
    );
    addAuditLog('CHILD_REUNITED', 'incident', missingCaseId, `Successfully reunited child with guardians!`);
    soundFX.playSuccessChime();
  }, [currentUser, addAuditLog]);

  // Join Community Help
  const joinCommunityHelp = useCallback((incidentId: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== incidentId) return inc;
        const currentHelpers = inc.communityHelpersAssigned || [];
        if (currentHelpers.includes(currentUser.id)) return inc;
        return {
          ...inc,
          communityHelpersAssigned: [...currentHelpers, currentUser.id]
        };
      })
    );
    addAuditLog('JOINED_COMMUNITY_HELP', 'user', currentUser.id, `Joined community assistance for incident #${incidentId}`);
    soundFX.playSuccessChime();
  }, [currentUser, addAuditLog]);

  // Update Volunteer Status
  const updateVolunteerStatus = useCallback((status: VolunteerStatus) => {
    updateCurrentUserProfile({ volunteerStatus: status });
    addAuditLog('VOLUNTEER_STATUS', 'user', currentUser.id, `Changed availability to ${status.toUpperCase()}`);
    soundFX.playAlertChime();
  }, [currentUser.id, updateCurrentUserProfile, addAuditLog]);

  // Toggle Global Disaster Mode
  const toggleDisasterMode = useCallback(() => {
    setDisasterMode((prev) => {
      const next = !prev;
      if (next) {
        soundFX.playCriticalSiren(5);
        // Create high-level disaster broadcast
        const disasterAlert: SafetyAlert = {
          id: `alert-disaster-${Date.now()}`,
          eventId: currentEvent.id,
          title: '🚨 GLOBAL DISASTER MODE ACTIVATED 🚨',
          message: 'District Disaster Management Authority (DDMA) has activated event-wide emergency protocols. All normal movement suspended. Proceed to designated safe assembly grounds immediately.',
          level: 'RED',
          severity: 'CRITICAL',
          targetAreaName: 'All Event Sectors',
          targetCenter: currentEvent.center,
          radiusMeters: 2000,
          targetAudience: 'ALL_USERS',
          timestamp: new Date().toISOString(),
          isActive: true,
          actionInstructions: {
            whatToDo: [
              'Move orderly toward CMS High School Ground or Municipal Town Hall Safe Zones',
              'Keep children and elderly persons in center of family groups',
              'Listen for live mega-phone broadcasts from Kerala Police squads'
            ],
            whatNotToDo: [
              'DO NOT attempt to re-enter temple sanctum or stage perimeters',
              'DO NOT drive vehicles onto primary emergency corridors'
            ],
            safeDirection: 'Follow green illuminated signage to nearest exit'
          }
        };
        setAlerts((a) => [disasterAlert, ...a]);
      } else {
        soundFX.playSuccessChime();
      }
      return next;
    });
  }, [currentEvent]);

  // Broadcast Custom Alert
  const broadcastCustomAlert = useCallback((alert: Partial<SafetyAlert>) => {
    const fullAlert: SafetyAlert = {
      id: `alert-${Date.now()}`,
      eventId: currentEvent.id,
      title: alert.title || 'Safety Alert',
      message: alert.message || '',
      level: alert.level || 'YELLOW',
      severity: alert.severity || 'MEDIUM',
      targetAreaName: alert.targetAreaName || 'Event Sector',
      targetCenter: alert.targetCenter || currentEvent.center,
      radiusMeters: alert.radiusMeters || 500,
      targetAudience: alert.targetAudience || 'ALL_USERS',
      timestamp: new Date().toISOString(),
      isActive: true,
      actionInstructions: alert.actionInstructions || {
        whatToDo: ['Stay alert and cooperate with field responders'],
        whatNotToDo: ['Do not spread unverified rumors']
      }
    };
    setAlerts((prev) => [fullAlert, ...prev]);
    addAuditLog('BROADCAST_ALERT', 'alert', fullAlert.id, `Broadcasted ${fullAlert.level} alert: ${fullAlert.title}`);
    if (fullAlert.level === 'RED') {
      soundFX.playCriticalSiren(3);
    } else {
      soundFX.playAlertChime();
    }
  }, [currentEvent, addAuditLog]);

  // Dismiss Alert
  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  // 5 TACTICAL DRILL & CRISIS INJECTION SCENARIOS
  const triggerSimulationScenario = useCallback((scenarioIndex: number) => {
    switch (scenarioIndex) {
      case 1: {
        // Scenario 1: Crowd Crush at Gate 3 Naduvilal
        setActiveScenarioName('Gate 3 Surge Crush: Density 97%, Velocity 0.08 m/s, Exit B Blocked');
        setCurrentEvent((prev) => ({
          ...prev,
          zones: prev.zones.map((z) =>
            z.id === 'zone-gate-3-naduvilal'
              ? {
                  ...z,
                  currentPopulation: 34000,
                  densityPercentage: 97,
                  movementSpeed: 0.08,
                  movementDirection: 'Stationary High-Pressure Crush',
                  inflowRate: 2200,
                  outflowRate: 150,
                  exitBlocked: true,
                  riskScore: 96,
                  riskLevel: 'CRITICAL',
                  activeIncidentsCount: 4
                }
              : z
          )
        }));
        soundFX.playCriticalSiren(4);
        break;
      }
      case 2: {
        // Scenario 2: Missing Child Match & Reunification
        setActiveScenarioName('Missing Person Recon: Aarav Menon (6yo) 94% Biometric/Clothing Match');
        soundFX.playAlertChime();
        break;
      }
      case 3: {
        // Scenario 3: Critical Medical Emergency at Main Stage & Ambulance Priority
        setActiveScenarioName('Medevac ALS Dispatch: Acute Heatstroke Casualty + Priority Ambulance KL-08 Dispatch');
        dispatchAmbulance('inc-1003', 'amb-1');
        break;
      }
      case 4: {
        // Scenario 4: Organized Theft Ring Clustering
        setActiveScenarioName('Security Intercept: Snatching Gang Sighted -> Police Patrol Cordon');
        reportIncident({
          category: 'theft',
          title: 'Suspicious Gold Snatching Trio Sighted near East Arch',
          description: '3 suspects matching earlier description reported cornered by alert citizens near Swaraj North.',
          severity: 'HIGH',
          location: { lat: 10.5264, lng: 76.2144 },
          locationName: 'Zone C — Swaraj Round North'
        });
        break;
      }
      case 5: {
        // Scenario 5: Multi-Disaster Surge & Global Disaster Mode
        setActiveScenarioName('Global Disaster Protocol: Multi-Sector Evacuation Directive');
        setDisasterMode(true);
        soundFX.playCriticalSiren(5);
        break;
      }
      default:
        break;
    }
  }, [dispatchAmbulance, reportIncident]);

  // Reset Simulation
  const resetSimulation = useCallback(() => {
    setCurrentEvent(KERALA_EVENTS[0]);
    setAllUsers(SEED_USERS);
    setCurrentUser(SEED_USERS[0]);
    setIncidents(SEED_INCIDENTS);
    setAlerts(SEED_ALERTS);
    setAmbulances(SEED_AMBULANCES);
    setDisasterMode(false);
    setActiveScenarioName(null);
    soundFX.playSuccessChime();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        currentEvent,
        currentUser,
        allUsers,
        incidents,
        alerts,
        ambulances,
        disasterMode,
        activeScenarioName,
        auditLogs,
        currentLanguage,
        setLanguage,
        t,
        switchRole,
        switchUser,
        switchEvent,
        updateCurrentUserProfile,
        reportIncident,
        updateIncidentStatus,
        assignResponder,
        dispatchAmbulance,
        mergeIncidents,
        dismissIncident,
        verifyMissingPersonCase,
        reuniteMissingPerson,
        joinCommunityHelp,
        updateVolunteerStatus,
        toggleDisasterMode,
        broadcastCustomAlert,
        dismissAlert,
        triggerSimulationScenario,
        resetSimulation
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
