'use client';

import { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Radio, 
  LocateFixed, 
  AlertCircle, 
  RotateCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { VERIFIED_DESTINATIONS } from '@/data/destinations';

export default function LiveGeoCompass() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [selectedDestId, setSelectedDestId] = useState<string>('salkhan-fossils');
  const [statusMessage, setStatusMessage] = useState<string>('Click to calibrate your satellite position');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userPlace, setUserPlace] = useState<string>('Detecting location...');

  const selectedDest = VERIFIED_DESTINATIONS.find(d => d.id === selectedDestId) || VERIFIED_DESTINATIONS[0];

  // Great-Circle Haversine Formula (KM)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  // Great-Circle Initial Bearing (Degrees 0-360)
  const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
    let brng = Math.atan2(y, x) * 180 / Math.PI;
    return Math.round((brng + 360) % 360);
  };

  // Convert bearing degrees to 16-point Cardinal Direction
  const getCardinal = (angle: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(angle / 22.5) % 16];
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setStatusMessage('Locking onto GPS satellites...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
        setAccuracy(Math.round(pos.coords.accuracy));
        setIsLocating(false);
        setStatusMessage('GPS Radar Locked & Calibrated');

        // Reverse geocoding lookup
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          const place = data.address?.city || data.address?.town || data.address?.state || 'Unknown Territory';
          setUserPlace(`${place}, ${data.address?.country || 'Earth'}`);
        } catch {
          setUserPlace('Your Current Coordinate Point');
        }
      },
      (err) => {
        setIsLocating(false);
        // Default to Varanasi Ghats as reference if permission denied
        setUserLocation({ lat: 25.3176, lng: 82.9739 });
        setUserPlace('Varanasi, UP (Default Transit Hub)');
        setStatusMessage('Using Varanasi reference coordinates (GPS permission not granted)');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Calculate live values
  const destCoords = selectedDest.coordinates || { lat: 24.5833, lng: 83.0833 };
  const currentCoords = userLocation || { lat: 25.3176, lng: 82.9739 }; // Fallback to Varanasi
  const distance = calculateDistance(currentCoords.lat, currentCoords.lng, destCoords.lat, destCoords.lng);
  const bearing = calculateBearing(currentCoords.lat, currentCoords.lng, destCoords.lat, destCoords.lng);
  const cardinal = getCardinal(bearing);

  return (
    <div className="bg-gradient-to-br from-stone-900 via-stone-900/95 to-emerald-950/40 rounded-3xl border border-emerald-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Radar Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
            <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
            <span>Interactive Great-Circle Geonavigator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Live Sonbhadra Radar & Compass
          </h2>
        </div>

        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-950 transition active:scale-95 disabled:opacity-50"
        >
          <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{userLocation ? 'Re-Calibrate GPS' : 'Acquire My Live GPS'}</span>
        </button>
      </div>

      {/* RADAR & COMPASS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center relative z-10">
        {/* COMPASS VISUAL DIAL (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-stone-800 bg-stone-950/90 shadow-inner flex items-center justify-center p-3">
            {/* Outer Cardinal Ring */}
            <div className="absolute inset-2 rounded-full border border-stone-800/80 flex flex-col justify-between py-2 items-center text-xs font-extrabold text-stone-500 select-none">
              <span className="text-emerald-400 text-sm font-black">N</span>
              <span className="text-stone-600">S</span>
            </div>
            <div className="absolute inset-2 rounded-full flex justify-between px-3 items-center text-xs font-extrabold text-stone-600 select-none">
              <span>W</span>
              <span>E</span>
            </div>

            {/* Subtle Radar Sweep Effect */}
            <div className="absolute inset-6 rounded-full border border-emerald-500/20 bg-emerald-950/10 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-dashed border-emerald-500/20 animate-spin-slow" />
            </div>

            {/* DYNAMIC ROTATING NEEDLE */}
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
              style={{ transform: `rotate(${bearing}deg)` }}
            >
              {/* North Pointer Needle (Emerald) */}
              <div className="w-3 h-28 bg-gradient-to-t from-emerald-500 to-teal-300 rounded-t-full shadow-lg shadow-emerald-500/50 absolute top-4" />
              {/* South Pointer Needle (Stone) */}
              <div className="w-2.5 h-20 bg-stone-700 rounded-b-full absolute bottom-8 opacity-60" />
              {/* Center Pivot Jewel */}
              <div className="w-6 h-6 rounded-full bg-stone-900 border-2 border-emerald-400 z-20 shadow-md flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>

            {/* BEARING READOUT BADGE */}
            <div className="absolute -bottom-3 bg-stone-900 border border-emerald-500/40 text-emerald-400 text-xs font-black px-4 py-1.5 rounded-full shadow-xl">
              {bearing}° {cardinal}
            </div>
          </div>
          <p className="text-[11px] text-stone-500 mt-4 text-center">
            {userLocation ? '🧭 Live Arrow Directing towards Target Landmark' : '📍 Calibrating from Varanasi Transit Datum'}
          </p>
        </div>

        {/* TELEMETRY READOUTS & TARGET SELECTOR (Cols 6-12) */}
        <div className="lg:col-span-7 space-y-6">
          {/* TARGET LANDMARK SELECTOR */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              Choose Navigation Target:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VERIFIED_DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestId(dest.id)}
                  className={`p-3 rounded-2xl text-left border transition text-xs flex flex-col justify-between ${
                    selectedDestId === dest.id 
                      ? 'bg-emerald-950 border-emerald-500 text-white shadow-lg shadow-emerald-950' 
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <span className="font-bold truncate">{dest.name}</span>
                  <span className="text-[10px] text-emerald-400 opacity-80 mt-1">{dest.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* REAL-TIME DISTANCE DISPLAY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Aerial Distance (Great-Circle)</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-black text-emerald-400">{distance}</span>
                <span className="text-stone-300 font-bold text-sm">Kilometers</span>
              </div>
              <p className="text-[11px] text-stone-400 pt-1">
                From {userPlace}
              </p>
            </div>

            <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Compass Course Vector</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-black text-amber-300">{bearing}°</span>
                <span className="text-stone-300 font-bold text-sm">Heading ({cardinal})</span>
              </div>
              <p className="text-[11px] text-stone-400 pt-1">
                Target: {selectedDest.coordinates?.lat}°N, {selectedDest.coordinates?.lng}°E
              </p>
            </div>
          </div>

          {/* SATELLITE STATUS BAR */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800/80 flex flex-wrap justify-between items-center text-xs text-stone-400 gap-2">
            <span className="flex items-center text-emerald-400">
              <Radio className="w-3.5 h-3.5 mr-1.5 animate-pulse text-emerald-400" />
              {statusMessage}
            </span>
            {accuracy && (
              <span className="text-stone-500">
                GPS Accuracy: ±{accuracy} meters
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
