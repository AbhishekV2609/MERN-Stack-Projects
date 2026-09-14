import {
  useEffect,
  useRef,
  useCallback,
} from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./MapView.css";

/* ===============================
   DISTANCE CALCULATOR (KM)
================================ */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  /* ===============================
     MAP INITIALIZER
  ================================ */
  const initMap = useCallback(() => {
    const theme =
      localStorage.getItem("theme") || "light";

    // 🧹 destroy old map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        theme === "dark"
          ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          : "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [78.5, 22.5],
      zoom: 4,
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl(),
      "top-right"
    );

    let points = [];
    let markers = [];

    map.on("load", () => {
      /* ===============================
         DRAW TOOL (PROJECT POLYGONS)
      ================================ */
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      map.addControl(draw, "top-left");

      map.on("draw.create", (e) => {
        const feature = e.features[0];

        const newProject = {
          id: Date.now(),
          name: "User Added Project",
          location: "Custom Area",
          status: "Active",
          sites: 1,
          geometry: feature.geometry,
        };

        const existing =
          JSON.parse(localStorage.getItem("projects")) || [];

        localStorage.setItem(
          "projects",
          JSON.stringify([...existing, newProject])
        );

        alert("New project added. Check Dashboard.");
      });

      /* ===============================
         🔗 MAP ↔ ANALYTICS AUTO-FOCUS
      ================================ */
      const focusProjectId =
        localStorage.getItem("focusProjectId");

      if (focusProjectId) {
        const projects =
          JSON.parse(localStorage.getItem("projects")) || [];

        const project = projects.find(
          (p) => String(p.id) === focusProjectId
        );

        if (project?.geometry) {
          map.addSource("focus-project", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: project.geometry,
            },
          });

          map.addLayer({
            id: "focus-project-layer",
            type: "fill",
            source: "focus-project",
            paint: {
              "fill-color": "#2563eb",
              "fill-opacity": 0.4,
            },
          });

          const coords =
            project.geometry.coordinates[0];

          const bounds = coords.reduce(
            (b, c) => b.extend(c),
            new maplibregl.LngLatBounds(
              coords[0],
              coords[0]
            )
          );

          map.fitBounds(bounds, { padding: 40 });

          // 🔁 clear after focus
          localStorage.removeItem("focusProjectId");
        }
      }

      /* ===============================
         DISTANCE LINE
      ================================ */
      map.addSource("distance-line", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      });

      map.addLayer({
        id: "distance-line-layer",
        type: "line",
        source: "distance-line",
        paint: {
          "line-color": "#ff4d4f",
          "line-width": 3,
          "line-dasharray": [2, 2],
        },
      });

      /* ===============================
         MAP CLICK → DISTANCE
      ================================ */
      map.on("click", (e) => {
        if (points.length === 2) return;

        const { lat, lng } = e.lngLat;

        const marker = new maplibregl.Marker({
          color: "#ff4d4f",
        })
          .setLngLat([lng, lat])
          .addTo(map);

        markers.push(marker);
        points.push([lng, lat]);

        if (points.length === 2) {
          map.getSource("distance-line").setData({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: points,
            },
          });

          const distance = calculateDistance(
            points[0][1],
            points[0][0],
            points[1][1],
            points[1][0]
          );

          new maplibregl.Popup()
            .setLngLat(points[1])
            .setHTML(
              `<b>Distance:</b> ${distance.toFixed(2)} km`
            )
            .addTo(map);
        }
      });

      /* ===============================
         CLEAR DISTANCE
      ================================ */
      const clearBtn =
        document.getElementById("clear-distance");

      if (clearBtn) {
        clearBtn.onclick = () => {
          points = [];
          markers.forEach((m) => m.remove());
          markers = [];

          map.getSource("distance-line").setData({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [],
            },
          });
        };
      }
    });
  }, []);

  /* ===============================
     INIT MAP
  ================================ */
  useEffect(() => {
    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initMap]);

  /* ===============================
     THEME CHANGE LISTENER
  ================================ */
  useEffect(() => {
    const handleThemeChange = () => {
      initMap();
    };

    window.addEventListener("theme-change", handleThemeChange);

    return () => {
      window.removeEventListener(
        "theme-change",
        handleThemeChange
      );
    };
  }, [initMap]);

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="content map-wrapper">
          <div className="map-header">
            <h1>Project Sites Map</h1>

            <button
              id="clear-distance"
              className="clear-btn"
            >
              Clear Distance
            </button>
          </div>

          <p>
            ✏️ Draw project areas | 📏 Click two points to
            measure distance (KM)
          </p>

          <div ref={mapContainerRef} id="map" />
        </div>
      </div>
    </>
  );
}

export default MapView;
