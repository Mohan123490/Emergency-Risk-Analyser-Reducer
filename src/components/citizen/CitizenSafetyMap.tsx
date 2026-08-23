'use client';

import React, { useEffect, useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { Shield, MapPin, Compass, AlertOctagon, HeartPulse } from 'lucide-react';

export const CitizenSafetyMap: React.FC = () => {
  const { currentEvent, currentUser, incidents } = useAppState();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Leaflet on client side
    if (typeof window === 'undefined') return;

    let mapInstance: any = null;

    import('leaflet').then((L) => {
      const container = document.getElementById('citizen-map-container');
      if (!container) return;

      // Clean up previous instance if any
      if ((container as any)._leaflet_id) {
        container.innerHTML = '';
      }

      const centerLat = currentUser.currentLocation?.lat || currentEvent.center.lat;
      const centerLng = currentUser.currentLocation?.lng || currentEvent.center.lng;

      const map = L.map('citizen-map-container', {
        center: [centerLat, centerLng],
        zoom: currentEvent.zoom,
        zoomControl: true,
        attributionControl: false
      });

      // Dark tactical tile layer (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      // 1. Draw Safe Zones (Green Circles)
      currentEvent.safeZones.forEach((sz) => {
        const circle = L.circle([sz.center.lat, sz.center.lng], {
          color: '#22c55e',
          fillColor: '#22c55e',
          fillOpacity: 0.25,
          radius: 65,
          weight: 2
        }).addTo(map);

        circle.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="color: #22c55e;">🛡️ SAFE ASSEMBLY ZONE</strong><br/>
            <strong>${sz.name}</strong><br/>
            <small>${sz.description}</small><br/>
            <small style="color: #0284c7;">Capacity: ${sz.capacity.toLocaleString()} people</small>
          </div>
        `);
      });

      // 2. Draw Hazardous / High Risk Zones (Red or Orange Polygons)
      currentEvent.zones.forEach((z) => {
        const isCritical = z.riskLevel === 'CRITICAL';
        const isHigh = z.riskLevel === 'HIGH_RISK';

        if (isCritical || isHigh) {
          const coords = z.coordinates.map((c) => [c.lat, c.lng] as [number, number]);
          const poly = L.polygon(coords, {
            color: isCritical ? '#ef4444' : '#f97316',
            fillColor: isCritical ? '#ef4444' : '#f97316',
            fillOpacity: isCritical ? 0.35 : 0.2,
            weight: isCritical ? 3 : 2,
            dashArray: isCritical ? '6, 6' : undefined
          }).addTo(map);

          poly.bindPopup(`
            <div style="font-family: sans-serif; padding: 4px;">
              <strong style="color: ${isCritical ? '#ef4444' : '#f97316'};">
                ⚠️ ${z.riskLevel} (${z.riskScore}/100)
              </strong><br/>
              <strong>${z.name}</strong><br/>
              <small>Density: ${z.densityPercentage}% | ${z.movementDirection}</small><br/>
              <small style="color: #ef4444;">${z.aiExplanation}</small>
            </div>
          `);
        }
      });

      // 3. User Location Marker with Pulsing Blue Dot
      if (currentUser.currentLocation) {
        const userIcon = L.divIcon({
          className: 'user-marker',
          html: `
            <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background: #0284c7; opacity: 0.4; animation: ping 1.5s infinite;"></div>
              <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: #0284c7; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([currentUser.currentLocation.lat, currentUser.currentLocation.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<strong>📍 You Are Here</strong><br/><small>Suraksha Live GPS Protected</small>')
          .openPopup();
      }

      // 4. Critical Incidents
      incidents
        .filter((i) => i.severity === 'CRITICAL' && i.status !== 'RESOLVED' && i.status !== 'DISMISSED')
        .forEach((inc) => {
          const alertIcon = L.divIcon({
            className: 'alert-marker',
            html: `
              <div style="background: #ef4444; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 0 12px rgba(239,68,68,0.8);">
                !
              </div>
            `,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });

          L.marker([inc.location.lat, inc.location.lng], { icon: alertIcon }).addTo(map).bindPopup(`
              <div style="font-family: sans-serif; padding: 4px;">
                <strong style="color: #ef4444;">CRITICAL INCIDENT</strong><br/>
                <strong>${inc.title}</strong><br/>
                <small>${inc.locationName}</small>
              </div>
            `);
        });

      mapInstance = map;
      setMapLoaded(true);
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [currentEvent, currentUser, incidents]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-xs space-y-2">
      {/* Map Header */}
      <div className="p-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-white text-xs">Live Citizen Safety Radar</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Safe Zone
          </span>
          <span className="flex items-center gap-1 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Hazard Zone
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span> You
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-64 sm:h-72 w-full">
        <div id="citizen-map-container" className="w-full h-full" />
      </div>
    </div>
  );
};
