#  Darukaa Earth – Frontend Dashboard

This project is a frontend-only dashboard built for the **Darukaa Earth Hackathon**.  
It demonstrates project management, geospatial visualization, and analytics using modern frontend technologies.

---

##  Features

###  Authentication
- Login & Signup (frontend mock)
- Protected routes using React Router

###  Dashboard
- Project overview with KPIs
- Recent activity panel
- Project cards with status
- Navigation to Analytics & Map

### Map View
- Interactive map using MapLibre
- Draw project sites (polygons)
- Measure distance between two points
- Dark / Light theme support
- **Map ↔ Analytics synchronization**
  - Analytics → View project on map
  - Map auto-zooms & highlights selected project

### Analytics
- Project-based analytics
- Line, Bar, Doughnut & Horizontal Bar charts
- KPI summary cards
- **View on Map** button
- Dynamic mock data per project

---

## Tech Stack

- React.js
- React Router
- Chart.js
- MapLibre GL
- Mapbox Draw
- CSS 

---

##  How to Run Locally

```bash
npm install
npm start
