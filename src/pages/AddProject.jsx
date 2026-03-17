import { useState } from "react";
import api from "../api/axios";

const AddProject = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    details: "",
    description: "",
    liveDemoUrl: ""
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [pictures, setPictures] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      formData.append("thumbnail", thumbnail);

      for (let i = 0; i < pictures.length; i++) {
        formData.append("pictures", pictures[i]);
      }

      await api.post("/projects", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Project uploaded successfully");
      setForm({
        name: "",
        title: "",
        details: "",
        description: "",
        liveDemoUrl: ""
      });
      setThumbnail(null);
      setPictures([]);
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Add Project</h2>

        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="details" placeholder="Details" value={form.details} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="url" name="liveDemoUrl" placeholder="Live Demo URL" value={form.liveDemoUrl} onChange={handleChange} required />

        <label>Thumbnail</label>
        <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} required />

        <label>Pictures</label>
        <input type="file" accept="image/*" multiple onChange={(e) => setPictures(e.target.files)} />

        <button type="submit">Upload Project</button>
      </form>
    </div>
  );
};

export default AddProject;