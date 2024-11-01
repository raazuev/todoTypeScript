import React from 'react';
import styles from '../styles/ThemeToggle.module.sass';

interface ThemeToggleProps {
  toggleTheme: (theme: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  return (
    <div className={styles.themeToggle}>
      <button onClick={() => toggleTheme("light-theme")}>Светлая</button>
      <button onClick={() => toggleTheme("dark-theme")}>Темная</button>
      <button onClick={() => toggleTheme("system-theme")}>Системная</button>
    </div>
  );
};

export default ThemeToggle;