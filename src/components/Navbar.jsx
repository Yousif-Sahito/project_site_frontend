import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        My Projects
      </Link>

      <div className="nav-right">
        <Link to="/admin/login">Admin</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;