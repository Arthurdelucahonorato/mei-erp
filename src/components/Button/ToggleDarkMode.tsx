import { useState, useEffect } from "react";
import { CiSun, CiCloudMoon } from "react-icons/ci";

export function ToggleDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const isDark = !prev;
      localStorage.setItem("darkMode", String(isDark));
      document.documentElement.classList.toggle("dark", isDark);
      return isDark;
    });
  };

  return (
    <>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? (
          <CiSun className="w-10 h-10 text-black" />
        ) : (
          <CiCloudMoon className="w-10 h-10" />
        )}
      </button>
    </>
  );
}
