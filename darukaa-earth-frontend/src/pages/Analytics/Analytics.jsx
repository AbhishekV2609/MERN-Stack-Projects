import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Analytics.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

/* ===============================
   MOCK ANALYTICS GENERATOR
================================ */
const generateAnalytics = (id) => {
  const seed = Number(id) % 10 + 5;

  return {
    yearly: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      credits: [
        seed * 20,
        seed * 28,
        seed * 35,
        seed * 45,
        seed * 60,
      ],
    },
    sites: {
      labels: ["Site A", "Site B", "Site C", "Site D"],
      values: [40, 25, 20, 15],
    },
    health: [85, 15],
  };
};

function Analytics() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const data = generateAnalytics(projectId);

  /* ===============================
     MAP ↔ ANALYTICS SYNC
  ================================ */
  const handleViewOnMap = () => {
    localStorage.setItem("focusProjectId", projectId);
    navigate("/map");
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />

        <div className="content analytics-wrapper">
          {/* BREADCRUMB */}
          <div className="breadcrumbs">
            <span onClick={() => navigate("/dashboard")}>
              Dashboard
            </span>{" "}
            &gt; Analytics
          </div>

          {/* HEADER + BUTTON */}
          <div className="analytics-header">
            <div>
              <h1>Project Analytics</h1>
              <p className="subtitle">
                Project ID: {projectId}
              </p>
            </div>

            <button
              className="outline-btn"
              onClick={handleViewOnMap}
            >
              🗺️ View on Map
            </button>
          </div>

          {/* KPI CARDS */}
          <div className="analytics-cards">
            <div className="analytics-card">
              <h2>
                {
                  data.yearly.credits[
                    data.yearly.credits.length - 1
                  ]
                }
              </h2>
              <p>Total Carbon Credits</p>
            </div>

            <div className="analytics-card">
              <h2>{data.sites.labels.length}</h2>
              <p>Total Sites</p>
            </div>

            <div className="analytics-card">
              <h2>{data.health[0]}%</h2>
              <p>Project Health</p>
            </div>
          </div>

          {/* CHARTS */}
          <div className="charts-grid">
            {/* LINE CHART */}
            <div className="chart-box">
              <h3>Carbon Credit Growth (Yearly)</h3>
              <Line
                data={{
                  labels: data.yearly.labels,
                  datasets: [
                    {
                      label: "Credits",
                      data: data.yearly.credits,
                      borderColor: "#2563eb",
                      backgroundColor:
                        "rgba(37,99,235,0.25)",
                      tension: 0.4,
                      fill: true,
                    },
                  ],
                }}
              />
            </div>

            {/* BAR CHART */}
            <div className="chart-box">
              <h3>Year-wise Credit Comparison</h3>
              <Bar
                data={{
                  labels: data.yearly.labels,
                  datasets: [
                    {
                      label: "Credits",
                      data: data.yearly.credits,
                      backgroundColor: "#22c55e",
                    },
                  ],
                }}
              />
            </div>

            {/* DOUGHNUT */}
            <div className="chart-box">
              <h3>Project Health</h3>
              <Doughnut
                data={{
                  labels: ["Healthy", "Risk"],
                  datasets: [
                    {
                      data: data.health,
                      backgroundColor: [
                        "#22c55e",
                        "#ef4444",
                      ],
                    },
                  ],
                }}
              />
            </div>

            {/* HORIZONTAL BAR */}
            <div className="chart-box">
              <h3>Site-wise Contribution</h3>
              <Bar
                data={{
                  labels: data.sites.labels,
                  datasets: [
                    {
                      label: "Contribution %",
                      data: data.sites.values,
                      backgroundColor: "#6366f1",
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
