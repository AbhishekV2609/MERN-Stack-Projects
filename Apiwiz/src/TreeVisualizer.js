import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

function TreeVisualizer({ data, searchPath, theme }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [highlightedNode, setHighlightedNode] = useState(null);
  const { setCenter } = useReactFlow();

  const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);

  const getExpandedFromPath = (path) => {
    if (!path) return {};
    const parts = path.replace(/^\$\./, "").split(".");
    let expanded = {};
    let curr = "$";
    for (let p of parts) {
      curr = `${curr}.${p}`;
      expanded[curr] = true;
    }
    return expanded;
  };

  const buildTree = useCallback(
    (data, parentId = null, depth = 0, path = "$", posY = 0) => {
      let nodeList = [];
      let edgeList = [];
      let yOffset = posY;

      Object.entries(data).forEach(([key, value]) => {
        const nodeId = `${path}.${key}`;
        const nodeType = Array.isArray(value)
          ? "array"
          : isObject(value)
          ? "object"
          : "primitive";

        const borderColor =
          nodeType === "object"
            ? "#818cf8"
            : nodeType === "array"
            ? "#34d399"
            : "#fbbf24";

        const bgColor =
          highlightedNode === nodeId
            ? "#facc15"
            : theme === "dark"
            ? "#1f2937"
            : "#ffffff";

        const textColor = theme === "dark" ? "#f9fafb" : "#111827";

        const node = {
          id: nodeId,
          data: { label: `${key}${nodeType === "primitive" ? `: ${value}` : ""}` },
          position: { x: depth * 260, y: yOffset },
          style: {
            background: bgColor,
            color: textColor,
            padding: 10,
            borderRadius: 10,
            border: `3px solid ${borderColor}`,
            cursor: "pointer",
            fontSize: 14,
            minWidth: 120,
            textAlign: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "0.3s ease all",
          },
        };

        nodeList.push(node);

        if (parentId) {
          edgeList.push({
            id: `${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
          });
        }

        if (expandedNodes[nodeId] && (isObject(value) || Array.isArray(value))) {
          const childData = Array.isArray(value)
            ? value.reduce((acc, v, i) => ({ ...acc, [i]: v }), {})
            : value;

          const { nodes: childNodes, edges: childEdges, nextY } = buildTree(
            childData,
            nodeId,
            depth + 1,
            nodeId,
            yOffset + 80
          );
          nodeList = [...nodeList, ...childNodes];
          edgeList = [...edgeList, ...childEdges];
          yOffset = nextY;
        } else {
          yOffset += 80;
        }
      });

      return { nodes: nodeList, edges: edgeList, nextY: yOffset };
    },
    [expandedNodes, highlightedNode, theme]
  );

  useEffect(() => {
    if (searchPath) {
      setExpandedNodes((prev) => ({ ...prev, ...getExpandedFromPath(searchPath) }));
    }
  }, [searchPath]);

  useEffect(() => {
    if (data) {
      const { nodes, edges } = buildTree(data);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [data, expandedNodes, buildTree]);

  useEffect(() => {
    if (!searchPath) return;

    const match = nodes.find((n) => n.id === searchPath);
    if (match) {
      setHighlightedNode(match.id);
      setTimeout(() => {
        setCenter(match.position.x, match.position.y, {
          zoom: 1.5,
          duration: 800,
        });
      }, 400);
    } else {
      setHighlightedNode(null);
    }
  }, [searchPath, nodes, setCenter]);

  const onNodeClick = useCallback((_, node) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node.id]: !prev[node.id],
    }));
  }, []);

  return (
    <div className={`reactflow-container ${theme}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={onNodeClick}
        nodesDraggable={false}
        zoomOnScroll
        panOnScroll
      >
        <MiniMap
          nodeStrokeColor={(n) =>
            n.style?.border?.replace("3px solid ", "") || "#999"
          }
          nodeColor={(n) => n.style?.background || "#fff"}
          maskColor={theme === "dark" ? "#111827" : "#f9fafb"}
        />
        <Controls />
        <Background
          color={theme === "dark" ? "#4b5563" : "#e5e7eb"}
          gap={16}
        />
      </ReactFlow>
    </div>
  );
}

export default TreeVisualizer;
    