import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`);
        setProject(data);
        document.title = data.name;
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container details-page">
        <h1>{project.name}</h1>
        <h2>{project.title}</h2>

        <p>
          <strong>Details:</strong> {project.details}
        </p>

        <p>
          <strong>Description:</strong> {project.description}
        </p>

        <a
          href={project.liveDemoUrl}
          target="_blank"
          rel="noreferrer"
          className="demo-btn"
        >
          Live Demo
        </a>

        <div className="details-thumbnail">
          <img
            src={`http://localhost:5000${project.thumbnail}`}
            alt={project.name}
          />
        </div>

        <div className="pictures-grid">
          {project.pictures?.map((pic, index) => (
            <img
              key={index}
              src={`http://localhost:5000${pic}`}
              alt={`project-${index}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;