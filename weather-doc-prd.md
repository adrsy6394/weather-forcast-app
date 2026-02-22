1️⃣ PROJECT OVERVIEW

Build a production-ready full-stack Weather Intelligence Web Application using MERN stack.

The system should:

Provide real-time weather data

Display forecast with charts

Show interactive weather map (OpenLayers)

Support user authentication

Store search history

Support light/dark mode

Maintain scalable architecture

Follow clean code principles

Be deployment-ready

2️⃣ TECH STACK
Frontend

React + TypeScript

Vite

Tailwind CSS

React Router

Context API

Axios

OpenLayers (ol)

OpenStreetMap Tiles

Recharts

LocalStorage persistence

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt

dotenv

CORS

Helmet

Morgan

Express Rate Limit

External APIs

OpenWeather API

OpenStreetMap (No API key required)

3️⃣ SYSTEM ARCHITECTURE

Frontend → Backend API → OpenWeather API → Database

Frontend must never directly call OpenWeather API.

OpenLayers will be implemented entirely on frontend and use OpenStreetMap tiles.

4️⃣ HIGH LEVEL MODULES

Core Features:

Theme Toggle (Light / Dark / System)

Unit Switching (Celsius/Fahrenheit)

Geolocation detection

Current location tracking

Interactive weather map (OpenLayers)

Weather charts (area & line)

LocalStorage theme persistence

5️⃣ FRONTEND ARCHITECTURE
Folder Structure
client/
 ├── src/
 │   ├── components/
 │   │    ├── layout/
 │   │    ├── weather/
 │   │    ├── map/
 │   │          ├── OpenLayerMap.tsx
 │   │    ├── charts/
 │   │
 │   ├── pages/
 │   ├── context/
 │   ├── hooks/
 │   ├── services/
 │   ├── types/
 │   └── App.tsx

OpenLayers Map Requirements
Installation

Frontend must install:

npm install ol

OpenLayers Setup Rules

Use OpenStreetMap as tile layer

No Mapbox dependency

Create reusable component: OpenLayerMap.tsx

Accept props: latitude, longitude

Add weather marker using vector layer

Use fromLonLat([longitude, latitude])

Proper cleanup on unmount

Prevent multiple map initializations

Follow glassmorphism card styling

Rounded 16px container

Responsive height:

Mobile: 300px

Desktop: 400px

Map Integration Flow

User searches city

Backend returns:

lat

lon

WeatherContext stores coordinates

Coordinates passed to <OpenLayerMap />

Map re-centers dynamically

Map Enhancement (Future)

Weather popup on marker click

Animated weather icons

Multiple city comparison

Heatmap overlay

Wind direction vectors

Frontend Pages

Landing Page
Login
Register
Dashboard
Forecast
Map View (OpenLayers Integration)
History
Settings

Dashboard Must Include

Top navbar

Sidebar

Weather overview card

Weather details grid

Charts

OpenLayers Map

Search input

6️⃣ BACKEND ARCHITECTURE

(Unchanged — remains MVC)

7️⃣ DATABASE DESIGN

(Unchanged)

8️⃣ API ENDPOINT DESIGN

(Unchanged)

9️⃣ AUTH FLOW

(Unchanged)

🔟 UI DESIGN SYSTEM

(Unchanged – Must follow weather-design-prd.md strictly)

1️⃣1️⃣ STATE MANAGEMENT

(Unchanged)

WeatherContext must now also manage:

latitude

longitude

1️⃣2️⃣ ERROR HANDLING

(Unchanged)

Additionally:

Map must gracefully handle missing lat/lon.

1️⃣3️⃣ SECURITY

.env must contain:

PORT=5000
MONGO_URI=...
JWT_SECRET=...
OPENWEATHER_API_KEY=...


No MAPBOX_API_KEY required.

1️⃣4️⃣ PERFORMANCE

Prevent unnecessary map re-renders

Memoize map component

Proper dependency management in useEffect

1️⃣5️⃣ DEVELOPMENT PHASES (Updated)

Phase 1:
Backend setup
Database connection
Basic auth

Phase 2:
Weather API integration
Controller-service structure

Phase 3:
Frontend setup
Routing

Phase 4:
Dashboard UI

Phase 5:
Charts integration

Phase 6:
OpenLayers setup & integration

Phase 7:
History & Settings

Phase 8:
Optimization & cleanup

Phase 9:
Deployment ready config

1️⃣6️⃣ SCALABILITY ROADMAP

(Unchanged)

Future Map upgrade:

Redis caching for weather queries

WebSocket live weather updates

Map tile caching layer

GIS data overlays

1️⃣7️⃣ DEPLOYMENT PLAN

Frontend → Vercel
Backend → Render / Railway
Database → MongoDB Atlas

OpenLayers requires no external billing setup.

1️⃣8️⃣ CLEAN CODE RULES

(Unchanged)

Additional Map Rule:

No direct DOM manipulation

Cleanup map instance on unmount

Keep map logic isolated in map/ folder

END OF FILE