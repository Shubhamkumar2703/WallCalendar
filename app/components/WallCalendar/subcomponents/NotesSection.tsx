"use client";

import type { MouseEvent } from "react";
import { MONTHS } from "../constants";
import { MonthTheme } from "../constants/themes";
import { formatDate } from "../utils";

interface NotesSectionProps {
  theme: MonthTheme;
  currentMonth: number;
  currentYear: number;
  isMobile: boolean;
  activeNoteKey: string;
  noteInput: string;
  notes: Record<string, string>;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onNoteInputChange: (value: string) => void;
  onNoteKeyChange: (key: string) => void;
  onSaveNote: () => void;
}

export function NotesSection({
  theme,
  currentMonth,
  currentYear,
  isMobile,
  activeNoteKey,
  noteInput,
  notes,
  rangeStart,
  rangeEnd,
  onNoteInputChange,
  onNoteKeyChange,
  onSaveNote,
}: NotesSectionProps) {
  const monthNoteKey = `${currentYear}-${currentMonth}`;
  const monthNoteExists = !!(notes[monthNoteKey]);
  const rangeNoteKey =
    rangeStart && rangeEnd
      ? (() => {
          const s = rangeStart < rangeEnd ? rangeStart : rangeEnd;
          const e = rangeStart < rangeEnd ? rangeEnd : rangeStart;
          return `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}__${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`;
        })()
      : null;
  const rangeNoteExists = rangeNoteKey && !!(notes[rangeNoteKey]);

  return (
    <div className="notes-area" style={{ flex: 1, padding: isMobile ? "12px" : "16px 24px 20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontFamily: "sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#888",
            fontWeight: 600,
          }}
        >
          📝 Notes
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button
            className="tab-btn"
            onClick={() => onNoteKeyChange("month")}
            style={{
              cursor: "pointer",
              padding: "5px 14px",
              borderRadius: "20px",
              fontSize: 12,
              letterSpacing: "0.04em",
              transition: "all 0.15s",
              border: `1px solid`,
              fontFamily: "'Georgia', serif",
              background: activeNoteKey === "month" ? theme.bg : "transparent",
              color: activeNoteKey === "month" ? "#fff" : "#666",
              borderColor: activeNoteKey === "month" ? theme.bg : "#ddd",
            }}
          >
            Month {monthNoteExists && "•"}
          </button>
          {rangeStart && rangeEnd && rangeNoteKey && (
            <button
              className="tab-btn"
              onClick={() => onNoteKeyChange(rangeNoteKey)}
              style={{
                cursor: "pointer",
                padding: "5px 14px",
                borderRadius: "20px",
                fontSize: 12,
                letterSpacing: "0.04em",
                transition: "all 0.15s",
                border: `1px solid`,
                fontFamily: "'Georgia', serif",
                background: activeNoteKey === rangeNoteKey ? theme.bg : "transparent",
                color: activeNoteKey === rangeNoteKey ? "#fff" : "#666",
                borderColor: activeNoteKey === rangeNoteKey ? theme.bg : "#ddd",
              }}
            >
              Range {rangeNoteExists && "•"}
            </button>
          )}
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontSize: 10,
            color: "#bbb",
            fontFamily: "sans-serif",
          }}
        >
          {noteInput.length}/500
        </div>
      </div>

      <div style={{ position: "relative" }}>
        {/* Notebook lines effect */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 27px, #E8E5DF 27px, #E8E5DF 28px)",
            borderRadius: 8,
            pointerEvents: "none",
            opacity: 0.5,
          }}
        />
        <textarea
          value={noteInput}
          onChange={(e) => onNoteInputChange(e.target.value.slice(0, 500))}
          placeholder={
            activeNoteKey === "month"
              ? `Jot down your plans for ${MONTHS[currentMonth]}...`
              : `Notes for your selected date range...`
          }
          style={{
            width: "100%",
            minHeight: isMobile ? 80 : 110,
            resize: "none",
            border: "none",
            borderRadius: 8,
            background: "rgba(255,255,255,0.7)",
            fontSize: 14,
            lineHeight: "28px",
            fontFamily: "'Georgia', serif",
            color: "#2C2C2A",
            outline: "none",
            padding: "8px 12px",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#bbb",
            fontFamily: "sans-serif",
          }}
        >
          {activeNoteKey === "month"
            ? `${MONTHS[currentMonth]} ${currentYear}`
            : rangeStart && rangeEnd
              ? `${formatDate(rangeStart < rangeEnd ? rangeStart : rangeEnd)} → ${formatDate(rangeStart < rangeEnd ? rangeEnd : rangeStart)}`
              : ""}
        </div>
        <button
          onClick={onSaveNote}
          style={{
            background: theme.bg,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "7px 18px",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "sans-serif",
            letterSpacing: "0.06em",
            fontWeight: 600,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "1")}
        >
          SAVE NOTE
        </button>
      </div>
    </div>
  );
}
