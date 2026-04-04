"use client";

import { useState } from "react";
import { Header } from "./Header";

const HeaderWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Header
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode(!darkMode)}
    />
  );
};

export default HeaderWrapper;