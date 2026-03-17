import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const AdminLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="form-box" onSubmit={handleSubmit}>
        <Link to="/" className="back-link">
          ← Back to Website
        </Link>

        <h2>Admin Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;