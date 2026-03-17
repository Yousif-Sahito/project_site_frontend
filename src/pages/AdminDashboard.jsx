import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    details: "",
    description: "",
    liveDemoUrl: ""
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [pictures, setPictures] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Fetch projects error:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      title: "",
      details: "",
      description: "",
      liveDemoUrl: ""
    });
    setThumbnail(null);
    setPictures([]);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("title", form.title);
      formData.append("details", form.details);
      formData.append("description", form.description);
      formData.append("liveDemoUrl", form.liveDemoUrl);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      for (let i = 0; i < pictures.length; i++) {
        formData.append("pictures", pictures[i]);
      }

      if (editingId) {
        await api.put(`/projects/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });
        alert("Project updated successfully");
      } else {
        await api.post("/projects", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });
        alert("Project added successfully");
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (project) => {
    console.log("Editing project:", project);

    setEditingId(project._id);
    setForm({
      name: project.name || "",
      title: project.title || "",
      details: project.details || "",
      description: project.description || "",
      liveDemoUrl: project.liveDemoUrl || ""
    });

    setThumbnail(null);
    setPictures([]);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (editingId === id) {
        resetForm();
      }

      fetchProjects();
      alert("Project deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <h1>Projects</h1>
        <button onClick={logoutHandler}>Logout</button>
      </div>

      <div className="admin-layout">
        <div className="admin-left">
          <form className="admin-form-card" onSubmit={handleSubmit}>
            <h2>{editingId ? "Edit Project" : "Add Project"}</h2>

            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="details"
              placeholder="Project Details"
              value={form.details}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Short Description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <input
              type="url"
              name="liveDemoUrl"
              placeholder="Live Demo URL"
              value={form.liveDemoUrl}
              onChange={handleChange}
              required
            />

            <label>Thumbnail {editingId ? "(leave empty to keep old image)" : ""}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              required={!editingId}
            />

            <label>Project Pictures</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPictures(e.target.files)}
            />

            <div className="admin-form-actions">
              <button type="submit">
                {editingId ? "Update Project" : "Add Project"}
              </button>

              {editingId && (
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-right">
          <div className="admin-list-card">
            <h2>Old Projects</h2>

            {projects.length === 0 ? (
              <p>No projects found.</p>
            ) : (
              <div className="admin-project-list">
                {projects.map((project) => (
                  <div key={project._id} className="admin-project-item">
                    <div className="admin-project-info">
                      <img
                        src={`http://localhost:5000${project.thumbnail}`}
                        alt={project.name}
                        className="admin-project-thumb"
                      />
                      <div>
                        <h3>{project.name}</h3>
                        <p>{project.title}</p>
                      </div>
                    </div>

                    <div className="admin-project-actions">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDelete(project._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;