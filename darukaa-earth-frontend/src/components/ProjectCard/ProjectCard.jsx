import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>Sites: {project.sites}</p>
      <span className={project.status.toLowerCase()}>
        {project.status}
      </span>
    </div>
  );
};
{p.geometry && (
  <p style={{ fontSize: "12px", color: "#0a3cff" }}>
    (User added via map)
  </p>
)}


export default ProjectCard;
