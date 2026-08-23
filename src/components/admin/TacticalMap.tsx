'use client';

import React, { useEffect, useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { Layers, Compass, Eye, Shield, Users, HeartPulse } from 'lucide-react';

export const TacticalMap: React.FC = () => {
  const { currentEvent, incidents, ambulances, allUsers } = useAppState();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mapInstance: any = null;

    import('leaflet').then((L) => {
      const container = document.getElementById('admin-tactical-map');
      if (!container) return;

      if ((container as any)._leaflet_id) {
        container.innerHTML = '';
      }

      const map = L.map('admin-tactical-map', {
        center: [currentEvent.center.lat, currentEvent.center.lng],
        zoom: currentEvent.zoom,
        zoomControl: true,
        attributionControl: false
      });

      // Dark tactical high-contrast basemap (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      // 1. Render Zone Polygons with Risk Color Fills
      currentEvent.zones.forEach((z) => {
        let color = '#22c55e'; // Green
        if (z.riskLevel === 'CRITICAL') color = '#ef4444'; // Red
        else if (z.riskLevel === 'HIGH_RISK') color = '#f97316'; // Orange
        else if (z.riskLevel === 'CAUTION') color = '#eab308'; // Yellow

        const coords = z.coordinates.map((c) => [c.lat, c.lng] as [number, number]);
        const polygon = L.polygon(coords, {
          color,
          fillColor: color,
          fillOpacity: z.riskLevel === 'CRITICAL' ? 0.4 : 0.25,
          weight: z.riskLevel === 'CRITICAL' ? 3 : 2,
          dashArray: z.exitBlocked ? '6, 6' : undefined
        }).addTo(map);

        polygon.bindPopup(`
          <div style="font-family: sans-serif; min-width: 220px; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <strong style="color: ${color}; font-size: 13px;">${z.riskLevel} (${z.riskScore}/100)</strong>
              <span style="font-size: 11px; background: #334155; padding: 2px 6px; border-radius: 4px; color: white;">Density: ${z.densityPercentage}%</span>
            </div>
            <strong style="font-size: 12px; display: block; margin-top: 4px;">${z.name}</strong>
            <div style="font-size: 11px; color: #94a3b8; margin: 4px 0;">
              Population: <strong>${z.currentPopulation.toLocaleString()}</strong> / ${z.capacity.toLocaleString()}<br/>
              Movement: <strong>${z.movementSpeed} m/s</strong> (${z.movementDirection})<br/>
              Inflow/Outflow: <strong>+${z.inflowRate} / -${z.outflowRate}</strong><br/>
              Exit Blockage: <strong>${z.exitBlocked ? '⚠️ BLOCKED' : 'CLEAR'}</strong>
            </div>
            <div style="background: #0f172a; padding: 6px; border-radius: 6px; font-size: 11px; color: #cbd5e1; border: 1px solid #334155;">
              ${z.aiExplanation || 'Operating under normal parameters.'}
            </div>
          </div>
        `);
      });

      // 2. Render Safe Assembly Zones (Green Circles)
      currentEvent.safeZones.forEach((sz) => {
        const circle = L.circle([sz.center.lat, sz.center.lng], {
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.3,
          radius: 70,
          weight: 2
        }).addTo(map);

        circle.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="color: #10b981;">🛡️ SAFE ASSEMBLY ZONE</strong><br/>
            <strong>${sz.name}</strong><br/>
            <small>${sz.description}</small><br/>
            <small style="color: #0284c7;">Capacity: ${sz.capacity.toLocaleString()} persons</small>
          </div>
        `);
      });

      // 3. Render Emergency Exits
      currentEvent.emergencyExits.forEach((ex) => {
        const isBlocked = ex.status === 'BLOCKED';
        const exitIcon = L.divIcon({
          className: 'exit-icon',
          html: `
            <div style="background: ${isBlocked ? '#ef4444' : '#10b981'}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; border: 1px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); white-space: nowrap;">
              🚪 ${ex.name.split('—')[0]}
            </div>
          `,
          iconSize: [80, 20],
          iconAnchor: [40, 10]
        });

        L.marker([ex.location.lat, ex.location.lng], { icon: exitIcon }).addTo(map).bindPopup(`
          <div style="font-family: sans-serif;">
            <strong>${ex.name}</strong><br/>
            Status: <strong style="color: ${isBlocked ? '#ef4444' : '#10b981'};">${ex.status}</strong><br/>
            Capacity: ${ex.flowCapacityPerHour.toLocaleString()} people/hour
          </div>
        `);
      });

      // 4. Render Active Incidents
      incidents.forEach((inc) => {
        if (inc.status === 'RESOLVED' || inc.status === 'DISMISSED') return;

        const isCritical = inc.severity === 'CRITICAL';
        const isHigh = inc.severity === 'HIGH';

        const color = isCritical ? '#ef4444' : isHigh ? '#f97316' : '#eab308';

        const incidentMarker = L.divIcon({
          className: 'custom-incident-pin',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px;">
              ${isCritical ? `<div style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: ${color}; opacity: 0.5; animation: ping 1.2s infinite;"></div>` : ''}
              <div style="position: relative; width: 20px; height: 20px; border-radius: 50%; background: ${color}; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px; box-shadow: 0 0 10px ${color};">
                !
              </div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        L.marker([inc.location.lat, inc.location.lng], { icon: incidentMarker }).addTo(map).bindPopup(`
          <div style="font-family: sans-serif; min-width: 200px; padding: 4px;">
            <span style="font-size: 10px; background: ${color}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
              ${inc.severity} • #${inc.id}
            </span>
            <strong style="display: block; font-size: 12px; margin-top: 4px;">${inc.title}</strong>
            <p style="font-size: 11px; color: #cbd5e1; margin: 4px 0;">${inc.description}</p>
            <div style="font-size: 10px; color: #94a3b8;">
              📍 ${inc.locationName}<br/>
              Status: <strong>${inc.status}</strong><br/>
              Assigned: <strong>${inc.assignedResponderName || 'Unassigned'}</strong>
            </div>
          </div>
        `);
      });

      // 5. Render Active Ambulances
      ambulances.forEach((amb) => {
        const ambIcon = L.divIcon({
          className: 'amb-icon',
          html: `
            <div style="background: #e11d48; color: white; padding: 2px 5px; border-radius: 6px; font-size: 10px; font-weight: bold; border: 1.5px solid white; box-shadow: 0 0 8px rgba(225,29,72,0.8); display: flex; align-items: center; gap: 2px;">
              🚑 ${amb.plateNumber.split(' ')[0]}
            </div>
          `,
          iconSize: [90, 20],
          iconAnchor: [45, 10]
        });

        L.marker([amb.currentLocation.lat, amb.currentLocation.lng], { icon: ambIcon }).addTo(map).bindPopup(`
          <div style="font-family: sans-serif;">
            <strong style="color: #e11d48;">🚑 ${amb.plateNumber}</strong><br/>
            Driver: <strong>${amb.driverName}</strong> (${amb.driverPhone})<br/>
            Status: <strong>${amb.status}</strong><br/>
            Base: ${amb.baseHospitalName}
          </div>
        `);
      });

      // 6. Render Active Responders / Volunteers on Duty
      allUsers
        .filter((u) => u.role !== 'citizen' && u.currentLocation)
        .forEach((resp) => {
          const isPolice = resp.role === 'police';
          const isMedical = resp.role === 'medical';
          const badgeBg = isPolice ? '#4f46e5' : isMedical ? '#e11d48' : '#d97706';

          const respIcon = L.divIcon({
            className: 'resp-icon',
            html: `
              <div style="background: ${badgeBg}; color: white; width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid white; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                ${isPolice ? '👮' : isMedical ? '🩺' : '🦺'}
              </div>
            `,
            iconSize: [18, 18],
            iconAnchor: [9, 9]
          });

          L.marker([resp.currentLocation!.lat, resp.currentLocation!.lng], { icon: respIcon }).addTo(map).bindPopup(`
            <div style="font-family: sans-serif;">
              <strong>${resp.name}</strong><br/>
              Role: <strong style="color: ${badgeBg};">${resp.role.toUpperCase()}</strong><br/>
              Status: ${resp.volunteerStatus || 'ON DUTY'}<br/>
              Trust Score: ${resp.trustScore}%
            </div>
          `);
        });

      mapInstance = map;
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [currentEvent, incidents, ambulances, allUsers]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-2">
      {/* Map Toolbar */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-white text-xs">Tactical GIS Command Map</span>
          <span className="text-[10px] text-slate-400 font-mono">({currentEvent.name})</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] flex-wrap">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Safe Zone
          </span>
          <span className="flex items-center gap-1 text-red-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span> Critical Incident
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> High Risk Zone
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-semibold">
            <span>🚑</span> Ambulance
          </span>
          <span className="flex items-center gap-1 text-indigo-400 font-semibold">
            <span>👮</span> Police
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-semibold">
            <span>🦺</span> Volunteer
          </span>
        </div>
      </div>

      {/* Map Frame */}
      <div className="relative h-96 sm:h-[460px] w-full">
        <div id="admin-tactical-map" className="w-full h-full" />
      </div>
    </div>
  );
};
