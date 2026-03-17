import { useThemeCustom } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeCustom();

  return (
    <button onClick={toggleTheme} className="toggle-btn">
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;