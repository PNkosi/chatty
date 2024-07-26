"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? (
        <FaMoon className="text-[#4DBFBF]" />
      ) : (
        <FaSun className="text-[#FF80AC]" />
      )}
    </button>
  );
};

export default ModeToggle;
