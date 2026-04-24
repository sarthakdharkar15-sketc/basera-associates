import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';

const OfficeLocation = [22.7162, 75.8550]; // Surya Nikunj Complex, Rajwada, Indore
const centerLocation = OfficeLocation;

// Status Colors - Refined for premium look
const statusColors = {
  Available: '#2ecc71',
  Sold: '#e74c3c',
  Upcoming: '#f1c40f',
  Pending: '#f39c12',
  Office: '#c39d63' // Elegant Gold
};

// Custom Marker Maker
const createCustomIcon = (status, isHovered) => {
  const color = statusColors[status] || statusColors.Available;
  const size = isHovered ? 32 : 24;
  
  return new L.DivIcon({
    className: 'custom-property-marker',
    html: `
      <div class="marker-wrapper ${isHovered ? 'is-hovered' : ''} status-${status.toLowerCase()}">
        <div class="marker-glow" style="background-color: ${color}44;"></div>
        <div class="marker-pulse" style="border-color: ${color}88;"></div>
        <div class="marker-dot" style="background-color: ${color}; box-shadow: 0 0 15px ${color}aa;"></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

function PropertyMarker({ proj }) {
  const [isHovered, setIsHovered] = useState(false);
  const status = proj.status || 'Available';

  return (
    <Marker 
      position={[proj.lat, proj.lng]} 
      icon={createCustomIcon(status, isHovered)}
      eventHandlers={{
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false),
      }}
    >
      <Popup className="premium-popup-v2">
        <div className="popup-card shadow-premium">
          <div className="popup-image-container" style={{ backgroundImage: `url(${proj.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'})` }}>
            <div className="popup-overlay"></div>
            <span className="p-badge" style={{ background: statusColors[status] }}>{status}</span>
          </div>
          <div className="popup-details">
            <h4 className="p-title">{proj.title}</h4>
            <p className="p-loc"><i className="fas fa-map-marker-alt"></i> {proj.location}</p>
            <div className="p-footer">
              <span className="p-price">{proj.priceFormatted}</span>
              <Link to={`/project/${proj._id}`} className="p-btn">
                <span>View Estate</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

function MapBoundsHandler({ properties }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.lat, p.lng]));
      // Add office location to bounds as well
      bounds.extend(OfficeLocation);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [properties, map]);

  return null;
}

function ExploreMap() {
  const [mapType, setMapType] = useState('satellite');
  const [properties, setProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const cityCoords = {
      'Mumbai': { lat: 19.0760, lng: 72.8777 },
      'Delhi': { lat: 28.6139, lng: 77.2090 },
      'Pune': { lat: 18.5204, lng: 73.8567 },
      'Gurgaon': { lat: 28.4595, lng: 77.0266 },
      'Indore': { lat: 22.7196, lng: 75.8577 },
      'Goa': { lat: 15.2993, lng: 74.1240 }
    };

    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((p) => {
          const defaultCity = cityCoords[p.city] || cityCoords['Mumbai'];
          const baseLat = p.lat || defaultCity.lat;
          const baseLng = p.lng || defaultCity.lng;
          
          // Increased jitter for a wider scatter effect across the city
          const latJitter = p.lat ? 0 : (Math.random() - 0.5) * 0.8;
          const lngJitter = p.lng ? 0 : (Math.random() - 0.5) * 0.8;
          
          return {
            ...p,
            lat: baseLat + latJitter,
            lng: baseLng + lngJitter,
            priceFormatted: p.price ? `₹ ${p.price.toLocaleString()}` : 'Price on Request'
          };
        });
        setProperties(mapped);
        setTimeout(() => setIsLoaded(true), 500);
      })
      .catch(console.error);
  }, []);

  const satelliteUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const streetUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className={`explore-map-container ${isLoaded ? 'is-visible' : ''}`} id="map-section">
      
      <div className="map-interface-layer">
        <div className="interface-header">
          <div className="title-group">
            <span className="top-pre-title">Precision Location</span>
            <h2 className="main-title">Explore Global Estates</h2>
            <div className="title-accent"></div>
          </div>
          
          <div className="map-view-toggles glass-morphism">
            <button 
              onClick={() => setMapType('satellite')} 
              className={`v-toggle ${mapType === 'satellite' ? 'is-active' : ''}`}
            >
              <span className="v-label">Satellite</span>
            </button>
            <button 
              onClick={() => setMapType('street')} 
              className={`v-toggle ${mapType === 'street' ? 'is-active' : ''}`}
            >
              <span className="v-label">Architecture</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`map-viewport-wrapper ${mapType === 'street' ? 'dark-map-style' : ''}`}>
        <MapContainer 
          center={centerLocation} 
          zoom={14} 
          zoomControl={false}
          scrollWheelZoom={false} 
          style={{ height: '100%', width: '100%' }}
        >
          <MapBoundsHandler properties={properties} />
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution={mapType === 'satellite' ? '&copy; ESRI' : '&copy; OpenStreetMap'}
            url={mapType === 'satellite' ? satelliteUrl : streetUrl}
          />

          {/* Headquarters Marker */}
          <Marker 
            position={OfficeLocation} 
            icon={createCustomIcon('Office', true)}
          >
            <Popup className="premium-popup-v2 hq-popup">
              <div className="hq-card glass-premium">
                <div className="hq-tag">Corporate Headquarters</div>
                <h3 className="hq-name">Basera Associates</h3>
                <p className="hq-address">
                  109, Surya Nikunj Complex, Indore, MP
                </p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=22.7162,75.8550" target="_blank" rel="noreferrer" className="hq-dir-btn">
                  Get Directions <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </a>
              </div>
            </Popup>
          </Marker>

          {properties.map(proj => (
            <PropertyMarker key={proj._id} proj={proj} />
          ))}
        </MapContainer>
        
        <div className="map-corner-glow top-left"></div>
        <div className="map-corner-glow bottom-right"></div>
      </div>

      <style>
        {`
          :root {
            --map-primary: #c39d63;
            --map-bg: #0f1115;
            --map-card: rgba(26, 29, 36, 0.9);
            --map-border: rgba(195, 157, 99, 0.2);
          }

          .explore-map-container {
            margin: 100px 0;
            padding: 0 20px;
            opacity: 0;
            transform: translateY(30px);
            transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          
          .explore-map-container.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .map-interface-layer {
            position: relative;
            z-index: 10;
            margin-bottom: 30px;
          }

          .interface-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 20px;
            flex-wrap: wrap;
          }

          .top-pre-title {
            display: block;
            color: var(--map-primary);
            text-transform: uppercase;
            letter-spacing: 4px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 8px;
          }

          .main-title {
            font-size: 3.5rem;
            margin: 0;
            color: #fff;
            letter-spacing: -1px;
            line-height: 0.9;
          }

          .title-accent {
            width: 80px;
            height: 4px;
            background: var(--map-primary);
            margin-top: 15px;
            border-radius: 2px;
          }

          .map-view-toggles {
            display: flex;
            padding: 6px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 100px;
            gap: 4px;
          }

          .v-toggle {
            padding: 10px 24px;
            border-radius: 100px;
            border: none;
            background: transparent;
            color: rgba(255,255,255,0.6);
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .v-toggle.is-active {
            background: var(--map-primary);
            color: #fff;
            box-shadow: 0 10px 20px rgba(195, 157, 99, 0.3);
          }

          .v-toggle:hover:not(.is-active) {
            background: rgba(255,255,255,0.08);
            color: #fff;
          }

          .map-viewport-wrapper {
            height: 650px;
            width: 100%;
            border-radius: 30px;
            overflow: hidden;
            position: relative;
            border: 1px solid var(--map-border);
            box-shadow: 0 40px 100px rgba(0,0,0,0.5);
          }

          .map-viewport-wrapper.dark-map-style .leaflet-tile-pane {
            filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
          }

          .map-corner-glow {
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(195,157,99,0.15) 0%, transparent 70%);
            z-index: 400;
            pointer-events: none;
          }
          .top-left { top: -50px; left: -50px; }
          .bottom-right { bottom: -50px; right: -50px; }

          /* Marker Premium Styles */
          .marker-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .marker-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid #fff;
            position: relative;
            z-index: 3;
          }

          .marker-glow {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            z-index: 1;
            filter: blur(8px);
          }

          .marker-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid;
            border-radius: 50%;
            z-index: 2;
            animation: ring-pulse 2s infinite ease-out;
          }

          @keyframes ring-pulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
          }

          .marker-wrapper.is-hovered {
            transform: scale(1.5) translateY(-5px);
          }

          /* Global Popup Styles */
          .leaflet-popup-content-wrapper {
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .leaflet-popup-tip-container { display: none; }

          /* Popup V2 Card */
          .popup-card {
            width: 280px;
            background: var(--map-bg);
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid var(--map-border);
            animation: spring-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          @keyframes spring-up {
            from { opacity: 0; transform: translateY(20px) scale(0.8); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          .popup-image-container {
            height: 150px;
            background-size: cover;
            background-position: center;
            position: relative;
          }

          .popup-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(15,17,21,0.8), transparent);
          }

          .p-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            padding: 5px 15px;
            border-radius: 8px;
            color: #fff;
            font-size: 0.65rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .popup-details {
            padding: 20px;
          }

          .p-title {
            color: #fff;
            font-size: 1.2rem;
            margin: 0 0 5px 0;
            font-family: 'Outfit', sans-serif;
          }

          .p-loc {
            color: rgba(255,255,255,0.5);
            font-size: 0.85rem;
            margin: 0 0 15px 0;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .p-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 15px;
            border-top: 1px solid rgba(255,255,255,0.05);
          }

          .p-price {
            color: var(--map-primary);
            font-weight: 800;
            font-size: 1.1rem;
          }

          .p-btn {
            color: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            transition: gap 0.3s;
          }
          .p-btn:hover { gap: 12px; color: var(--map-primary); }

          /* HQ Specific Highlight */
          .status-office .marker-dot {
            width: 18px;
            height: 18px;
            background: var(--map-primary) !important;
            border: 3px solid #fff;
            box-shadow: 0 0 30px var(--map-primary) !important;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .status-office .marker-dot::after {
            content: 'B';
            color: #fff;
            font-size: 10px;
            font-weight: 900;
          }

          .status-office .marker-pulse {
            border-color: var(--map-primary);
            animation: ring-pulse 1.5s infinite ease-out;
            width: 150% !important;
            height: 150% !important;
          }

          .status-office .marker-glow {
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, var(--map-primary) 0%, transparent 70%);
            opacity: 0.6;
          }

          /* Corporate Card */
          .hq-card {
            width: 260px;
            padding: 25px;
            border-radius: 20px;
            background: rgba(15, 17, 21, 0.95);
            backdrop-filter: blur(20px);
            border: 2px solid var(--map-primary);
            text-align: center;
          }

          .hq-tag {
            color: var(--map-primary);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 0.65rem;
            font-weight: 800;
            margin-bottom: 10px;
          }

          .hq-name {
            color: #fff;
            font-size: 1.4rem;
            margin: 0 0 8px 0;
            font-family: 'Playfair Display', serif;
          }

          .hq-address {
            color: rgba(255,255,255,0.6);
            font-size: 0.85rem;
            margin-bottom: 20px;
            line-height: 1.4;
          }

          .hq-dir-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px;
            background: var(--map-primary);
            color: #fff;
            border-radius: 12px;
            font-weight: 700;
            font-size: 0.9rem;
            transition: all 0.3s;
          }
          .hq-dir-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(195, 157, 99, 0.4); }

          @media (max-width: 768px) {
            .main-title { font-size: 2.5rem; }
            .map-viewport-wrapper { height: 450px; border-radius: 20px; }
            .interface-header { flex-direction: column; align-items: flex-start; }
            .map-view-toggles { width: 100%; }
            .v-toggle { flex: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default ExploreMap;
