import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        📊 Dashboard
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        🗺️ Map
      </NavLink>

      {/* ✅ ANALYTICS MUST HAVE PROJECT ID */}
      <NavLink
        to="/analytics/101"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        📈 Analytics
      </NavLink>
    </aside>
  );
}

export default Sidebar;
