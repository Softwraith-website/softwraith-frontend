import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <main className="flex-1 pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}
