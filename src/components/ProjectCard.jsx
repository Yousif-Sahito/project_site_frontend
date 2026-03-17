import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <img
        src={`http://localhost:5000${project.thumbnail}`}
        alt={project.name}
        className="project-thumb"
      />
      <h3>{project.name}</h3>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <Link to={`/project/${project._id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
};

export default ProjectCard;