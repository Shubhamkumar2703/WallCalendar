"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => {
        setDark(!dark);
        document.documentElement.classList.toggle("dark");
      }}
      className="mb-4 px-4 py-2 bg-black text-white rounded"
    >
      Toggle 🌙
    </button>
  );
}