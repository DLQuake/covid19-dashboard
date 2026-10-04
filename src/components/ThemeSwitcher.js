"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import '../styles/ThemeSwitcher.css';

function ThemeSwitcher() {
    const [theme, setTheme] = useState("dark");
    const [initialized, setInitialized] = useState(false);

    // Restore the browser-only preference after hydration to avoid a server/client mismatch.
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const initialTheme = storedTheme === 'light' ? 'light' : 'dark';
        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
        setInitialized(true);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    useEffect(() => {
        if (!initialized) return;
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [initialized, theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className="theme-switcher">
            <button className="button is-small theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                {theme === "light" ? (
                    <FaMoon size={24} color="#6a0dad" />
                ) : (
                    <FaSun size={24} color="#fbc02d" />
                )}
            </button>
        </div>
    );
}

export default ThemeSwitcher;