import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { fetchProjects } from "../../api/projectApi";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const apiProjects = await fetchProjects();
      const localProjects =
        JSON.parse(localStorage.getItem("projects")) || [];

      setProjects([...(apiProjects || []), ...localProjects]);

      setActivities([
        {
          id: 1,
          text: "Viewed analytics for a project",
          time: "2 min ago",
        },
        {
          id: 2,
          text: "New project site added from map",
          time: "10 min ago",
        },
      ]);
    };

    loadData();
  }, []);

  /* ===============================
     PROJECT → ANALYTICS + MAP SYNC
  ================================ */
  const handleProjectClick = (projectId) => {
    //  Map ko batao kaunsa project focus karna hai
    localStorage.setItem("focusProjectId", projectId);

    // 📊 Analytics open karo
    navigate(`/analytics/${projectId}`);
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="content">
          <div className="breadcrumbs">Dashboard</div>

          {/* KPI CARDS */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h2>{projects.length}</h2>
              <p>Total Projects</p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => navigate("/map")}
            >
              <h2>
                {projects.reduce(
                  (s, p) => s + (p.sites || 1),
                  0
                )}
              </h2>
              <p>Total Sites</p>
            </div>

            <div className="dashboard-card">
              <h2>420</h2>
              <p>Carbon Credits</p>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* PROJECTS PANEL */}
            <div className="projects-panel">
              <h2>Projects</h2>

              <div className="project-grid">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="project-card"
                    onClick={() =>
                      handleProjectClick(p.id)
                    }
                  >
                    <h3>{p.name}</h3>
                    <p>
                      Location: {p.location || "—"}
                    </p>
                    <p>Sites: {p.sites || 1}</p>

                    <span className="status active">
                      {p.status || "Active"}
                    </span>

                    {p.geometry && (
                      <p className="map-tag">
                        Added via Map
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="activity-panel">
              <h2>Recent Activity</h2>

              {activities.map((a) => (
                <div
                  key={a.id}
                  className="activity-item"
                >
                  <div className="dot" />
                  <div>
                    <p>{a.text}</p>
                    <span>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
