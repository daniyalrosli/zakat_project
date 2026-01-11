'use client';

import { useEffect, useRef, useState } from 'react';

// District data with real coordinates for Kedah, Malaysia
const districtData = [
  { code: 'LW', name: 'Langkawi', lat: 6.3500, lng: 99.8000, count: 2380, avgIncome: 820, avgExpense: 980, unemployed: 54.2 },
  { code: 'KP', name: 'Kubang Pasu', lat: 6.4500, lng: 100.3667, count: 4817, avgIncome: 740, avgExpense: 920, unemployed: 61.3 },
  { code: 'PD', name: 'Padang Terap', lat: 6.2500, lng: 100.6167, count: 4265, avgIncome: 690, avgExpense: 890, unemployed: 63.8 },
  { code: 'KS', name: 'Kota Setar', lat: 6.1256, lng: 100.5070, count: 8013, avgIncome: 780, avgExpense: 950, unemployed: 58.5 },
  { code: 'PT', name: 'Pokok Sena', lat: 6.1833, lng: 100.5500, count: 3003, avgIncome: 720, avgExpense: 910, unemployed: 60.1 },
  { code: 'PS', name: 'Pendang', lat: 5.9833, lng: 100.4667, count: 1535, avgIncome: 760, avgExpense: 940, unemployed: 57.9 },
  { code: 'YN', name: 'Yan', lat: 5.8000, lng: 100.3667, count: 2547, avgIncome: 710, avgExpense: 900, unemployed: 62.4 },
  { code: 'SK', name: 'Sik', lat: 5.8167, lng: 100.7333, count: 4490, avgIncome: 680, avgExpense: 870, unemployed: 65.2 },
  { code: 'KM', name: 'Kuala Muda', lat: 5.5667, lng: 100.4333, count: 8275, avgIncome: 800, avgExpense: 970, unemployed: 56.8 },
  { code: 'BL', name: 'Baling', lat: 5.6667, lng: 100.9167, count: 7462, avgIncome: 650, avgExpense: 850, unemployed: 67.4 },
  { code: 'KL', name: 'Kulim', lat: 5.3667, lng: 100.5500, count: 3999, avgIncome: 850, avgExpense: 1010, unemployed: 52.3 },
  { code: 'BB', name: 'Bandar Baharu', lat: 5.1500, lng: 100.4667, count: 1406, avgIncome: 880, avgExpense: 1030, unemployed: 49.8 },
];

interface DistrictInfo {
  code: string;
  name: string;
  lat: number;
  lng: number;
  count: number;
  avgIncome: number;
  avgExpense: number;
  unemployed: number;
}

interface KedahMapProps {
  onDistrictSelect: (district: DistrictInfo | null) => void;
  selectedDistrict: DistrictInfo | null;
}

export default function KedahMap({ onDistrictSelect, selectedDistrict }: KedahMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet
    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Create map
      const map = L.map(mapRef.current!, {
        center: [5.85, 100.5],
        zoom: 8,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      // Add dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add markers for each district
      districtData.forEach((district) => {
        const radius = Math.max(10, Math.min(30, (district.count / 8275) * 30));
        
        // Color based on unemployment rate
        let color = '#8b5cf6'; // Purple default
        if (district.unemployed > 65) color = '#ef4444'; // Red
        else if (district.unemployed > 60) color = '#f59e0b'; // Orange
        else if (district.unemployed > 55) color = '#a855f7'; // Purple
        else color = '#06b6d4'; // Cyan

        const marker = L.circleMarker([district.lat, district.lng], {
          radius: radius,
          fillColor: color,
          fillOpacity: 0.7,
          color: color,
          weight: 2,
        }).addTo(map);

        // Tooltip
        marker.bindTooltip(`
          <div style="text-align: center; padding: 4px;">
            <div style="font-weight: bold; font-size: 12px;">${district.name}</div>
            <div style="font-size: 10px; color: #666;">${district.count.toLocaleString()} recipients</div>
          </div>
        `, { direction: 'top', offset: [0, -radius] });

        // Click handler
        marker.on('click', () => {
          onDistrictSelect(district);
          
          // Update all markers
          markersRef.current.forEach((m, i) => {
            const d = districtData[i];
            const isSelected = d.code === district.code;
            m.setStyle({
              color: isSelected ? '#ffffff' : m.options.fillColor as string,
              weight: isSelected ? 3 : 2,
              fillOpacity: isSelected ? 0.9 : 0.7,
            });
          });
        });

        markersRef.current.push(marker);
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, [onDistrictSelect]);

  // Update marker styles when selectedDistrict changes
  useEffect(() => {
    if (!mapLoaded) return;
    
    markersRef.current.forEach((marker, i) => {
      const district = districtData[i];
      const isSelected = selectedDistrict?.code === district.code;
      marker.setStyle({
        color: isSelected ? '#ffffff' : marker.options.fillColor as string,
        weight: isSelected ? 3 : 2,
        fillOpacity: isSelected ? 0.9 : 0.7,
      });
    });
  }, [selectedDistrict, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-xl" style={{ background: '#12082a' }} />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#12082a] rounded-xl">
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading map...
          </div>
        </div>
      )}
    </div>
  );
}

export { districtData };
export type { DistrictInfo };
