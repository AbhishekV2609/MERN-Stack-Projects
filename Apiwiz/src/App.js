import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import "./index.js";
import TreeVisualizer from "./TreeVisualizer";

function App() {
  const [jsonInput, setJsonInput] = useState(`{
  "user": {
    "name": "Abhishek",
    "age": 25,
    "skills": ["React", "Node", "MongoDB"],
    "address": {
      "city": "Delhi",
      "pincode": 110001
    }
  },
  "isActive": true
}`);
  const [parsedJson, setParsedJson] = useState(null);
  const [searchPath, setSearchPath] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleValidateAndVisualize = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);

      if (!searchPath) {
        alert("✅ Valid JSON! But please enter a search path to highlight.");
        return;
      }

      const findPath = (obj, path) => {
        const parts = path.replace(/^\$\./, "").split(".");
        let current = obj;
        for (let part of parts) {
          if (current && typeof current === "object" && part in current) {
            current = current[part];
          } else {
            return false;
          }
        }
        return true;
      };

      const matchFound = findPath(parsed, searchPath);
      if (matchFound) {
        alert("✅ Match found in JSON!");
      } else {
        alert("⚠️ No match found in JSON!");
      }
    } catch {
      alert("❌ Invalid JSON format!");
      setParsedJson(null);
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="header-bar">
        <h1 className="title">🌳 JSON Tree Visualizer</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <textarea
        className="json-input"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={10}
      />

      <input
        type="text"
        className="search-box"
        placeholder="Search path (e.g. $.user.skills)"
        value={searchPath}
        onChange={(e) => setSearchPath(e.target.value)}
      />

      <button className="validate-btn" onClick={handleValidateAndVisualize}>
        Validate & Visualize
      </button>

      {parsedJson && (
        <div className="tree-container">
          <ReactFlowProvider>
            <TreeVisualizer data={parsedJson} searchPath={searchPath} theme={theme} />
          </ReactFlowProvider>
        </div>
      )}
    </div>
  );
}

export default App;
