"use client";

import { DAYS, HOLIDAYS, MONTH_THEMES } from "../constants";
import { MonthTheme } from "../constants/themes";
import { isBetween, isSameDay } from "../utils";

interface CalendarGridProps {
  currentYear: number;
  currentMonth: number;
  theme: MonthTheme;
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  hoverDay: number | null;
  selecting: boolean;
  isMobile: boolean;
  animating: boolean;
  slideDir: "left" | "right";
  daysInMonth: number;
  firstDay: number;
  calCells: (number | null)[];
  onDayClick: (day: number) => void;
  onDayHover: (day: number | null) => void;
}

export function CalendarGrid({
  currentYear,
  currentMonth,
  theme,
  today,
  rangeStart,
  rangeEnd,
  hoverDay,
  selecting,
  isMobile,
  animating,
  slideDir,
  daysInMonth,
  firstDay,
  calCells,
  onDayClick,
  onDayHover,
}: CalendarGridProps) {
  function getDayState(day: number) {
    const d = new Date(currentYear, currentMonth, day);
    const isToday = isSameDay(d, today);
    const isStart = isSameDay(d, rangeStart);
    const isEnd = isSameDay(d, rangeEnd);
    const hov = hoverDay ? new Date(currentYear, currentMonth, hoverDay) : null;
    const isPreview = selecting && rangeStart && hov && !rangeEnd && isBetween(d, rangeStart, hov);
    const inRange = isBetween(d, rangeStart, rangeEnd);
    return { isToday, isStart, isEnd, inRange, isPreview };
  }

  return (
    <div
      className={!animating ? "" : slideDir === "left" ? "slide-left" : "slide-right"}
      style={{ padding: isMobile ? "16px 12px 8px" : "24px 24px 12px" }}
    >
      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "#999",
              fontFamily: "sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              padding: "2px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {calCells.map((day, idx) => {
          if (!day)
            return <div key={`e${idx}`} />;
          const { isToday, isStart, isEnd, inRange, isPreview } = getDayState(day);
          const holidayKey = `${currentMonth + 1}-${day}`;
          const holiday = HOLIDAYS[holidayKey];
          const isSelected = isStart || isEnd;
          const cellBg = isSelected
            ? theme.bg
            : inRange
              ? `${theme.accent}28`
              : isPreview
                ? `${theme.accent}15`
                : "transparent";
          const textColor = isSelected
            ? "#fff"
            : isToday
              ? theme.bg
              : inRange
                ? "#333"
                : "#2C2C2A";

          return (
            <div
              key={day}
              className="day-cell"
              onClick={() => onDayClick(day)}
              onMouseEnter={() => onDayHover(day)}
              onMouseLeave={() => onDayHover(null)}
              style={{ position: "relative", padding: "2px" }}
            >
              <div
                style={{
                  background: cellBg,
                  borderRadius: 8,
                  padding: isMobile ? "6px 2px" : "8px 4px",
                  textAlign: "center",
                  position: "relative",
                  border: isToday && !isSelected ? `1.5px solid ${theme.bg}` : "1.5px solid transparent",
                }}
              >
                <div
                  className="day-num"
                  style={{
                    fontSize: isMobile ? 13 : 15,
                    fontWeight: isSelected || isToday ? 700 : 400,
                    color: textColor,
                    display: "inline-block",
                    transition: "transform 0.15s",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {day}
                </div>
                {holiday && (
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: isSelected ? "#fff" : theme.bg,
                      margin: "2px auto 0",
                      opacity: 0.7,
                    }}
                  />
                )}
                {isStart && (
                  <div
                    style={{
                      fontSize: 7,
                      color: theme.accent,
                      fontFamily: "sans-serif",
                      letterSpacing: "0.05em",
                      lineHeight: 1,
                    }}
                  >
                    START
                  </div>
                )}
                {isEnd && (
                  <div
                    style={{
                      fontSize: 7,
                      color: theme.accent,
                      fontFamily: "sans-serif",
                      letterSpacing: "0.05em",
                      lineHeight: 1,
                    }}
                  >
                    END
                  </div>
                )}
              </div>
              {/* Holiday tooltip */}
              {hoverDay === day && holiday && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 4px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: theme.bg,
                    color: "#fff",
                    fontSize: 10,
                    whiteSpace: "nowrap",
                    padding: "4px 8px",
                    borderRadius: 6,
                    zIndex: 10,
                    fontFamily: "sans-serif",
                    pointerEvents: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  {holiday}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
        {[
          { color: theme.bg, label: "Selected" },
          { color: `${theme.accent}50`, label: "In Range", border: true },
          { color: "transparent", label: "Today", border: true, borderColor: theme.bg },
        ].map(({ color, label, border, borderColor }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: color,
                border: border ? `1.5px solid ${borderColor || theme.bg}` : "none",
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: "#999",
                fontFamily: "sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              {label}
            </span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: theme.bg,
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: "#999",
              fontFamily: "sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Holiday
          </span>
        </div>
      </div>
    </div>
  );
}
