import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    document.title = "Frontend";

    const fetchProjects = async () => {
      try {
        const { data } = await api.get("/projects");
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="hero">
         <h1>Project Showcase</h1>
<p>Explore a curated collection of my latest development projects.</p>
        </section>

        <section className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;