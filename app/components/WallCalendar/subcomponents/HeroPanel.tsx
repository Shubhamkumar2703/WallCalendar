"use client";

import type { MouseEvent } from "react";
import { MONTHS } from "../constants";
import { MonthTheme } from "../constants/themes";
import { formatDate } from "../utils";

interface HeroPanelProps {
  theme: MonthTheme;
  currentMonth: number;
  currentYear: number;
  isMobile: boolean;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onNavigate: (direction: number) => void;
  onClearSelection: () => void;
}

export function HeroPanel({
  theme,
  currentMonth,
  currentYear,
  isMobile,
  rangeStart,
  rangeEnd,
  onNavigate,
  onClearSelection,
}: HeroPanelProps) {
  const heroGradient = `linear-gradient(135deg, ${theme.bg} 0%, #000 100%)`;

  return (
    <div
      style={{
        width: isMobile ? "100%" : 280,
        flexShrink: 0,
        background: heroGradient,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        minHeight: isMobile ? 200 : "auto",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `${theme.accent}15`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `${theme.accent}10`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `${theme.accent}20`,
        }}
      />

      {/* Punch holes at top */}
      <div style={{ display: "flex", justifyContent: "space-around", padding: "14px 30px 0" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="punch-hole"
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "2px solid rgba(255,255,255,0.3)",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Big emoji / season icon */}
      <div
        style={{
          fontSize: isMobile ? 56 : 72,
          textAlign: "center",
          marginTop: isMobile ? 10 : 30,
          lineHeight: 1,
        }}
      >
        {theme.emoji}
      </div>

      {/* Month name */}
      <div style={{ padding: isMobile ? "10px 20px 0" : "16px 24px 0", color: "#fff" }}>
        <div
          style={{
            fontSize: isMobile ? 36 : 48,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          {MONTHS[currentMonth]}
        </div>
        <div style={{ fontSize: 22, color: theme.accent, fontWeight: 400, marginTop: 2 }}>
          {currentYear}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: `${theme.accent}99`,
            fontFamily: "sans-serif",
          }}
        >
          {theme.tag}
        </div>
      </div>

      {/* Nav buttons */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: isMobile ? "12px 20px" : "20px 24px",
          marginTop: "auto",
        }}
      >
        {(
          [
            [-1, "‹ Prev"],
            [1, "Next ›"],
          ] as [number, string][]
        ).map(([dir, label]) => (
          <button
            key={dir}
            onClick={() => onNavigate(dir)}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.1)",
              border: `1px solid ${theme.accent}40`,
              borderRadius: 10,
              color: theme.accent,
              fontSize: 12,
              letterSpacing: "0.08em",
              padding: "7px 0",
              cursor: "pointer",
              fontFamily: "sans-serif",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Range summary */}
      {(rangeStart || rangeEnd) && (
        <div
          className="fade-up"
          style={{
            margin: "0 16px 16px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 11,
            color: "#fff",
            fontFamily: "sans-serif",
            borderLeft: `3px solid ${theme.accent}`,
          }}
        >
          {rangeStart && !rangeEnd && <div>📌 {formatDate(rangeStart)}</div>}
          {rangeStart && rangeEnd && (
            <>
              <div>📅 {formatDate(rangeStart < rangeEnd ? rangeStart : rangeEnd)}</div>
              <div style={{ color: theme.accent }}>
                → {formatDate(rangeStart < rangeEnd ? rangeEnd : rangeStart)}
              </div>
              <div style={{ marginTop: 4, color: `${theme.accent}99` }}>
                {Math.round(Math.abs(rangeEnd.getTime() - rangeStart.getTime()) / 86400000) + 1} days
                selected
              </div>
            </>
          )}
          <button
            onClick={onClearSelection}
            style={{
              marginTop: 6,
              background: "none",
              border: "none",
              color: theme.accent,
              cursor: "pointer",
              fontSize: 10,
              fontFamily: "sans-serif",
              padding: 0,
              letterSpacing: "0.06em",
            }}
          >
            CLEAR SELECTION
          </button>
        </div>
      )}
    </div>
  );
}
