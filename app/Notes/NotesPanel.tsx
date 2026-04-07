"use client";

import { useState, useEffect } from "react";

export default function NotesPanel() {
  const [notes, setNotes] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const updateNote = (index: number, value: string) => {
    const updated = [...notes];
    updated[index] = value;
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">Notes</h3>

      <div className="space-y-2">
        {notes.map((note, i) => (
          <input
            key={i}
            value={note}
            onChange={(e) => updateNote(i, e.target.value)}
            className="w-full border-b text-xs outline-none"
            placeholder="Write..."
          />
        ))}
      </div>
    </div>
  );
}