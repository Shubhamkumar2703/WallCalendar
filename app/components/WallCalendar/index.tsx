"use client";

import { MONTH_THEMES } from "./constants";
import { baseStyle } from "./utils";
import { HeroPanel, CalendarGrid, NotesSection } from "./subcomponents";
import { useCalendarLogic } from "./hooks";

export default function WallCalendar() {
  const {
    today,
    currentYear,
    currentMonth,
    rangeStart,
    rangeEnd,
    hoverDay,
    selecting,
    notes,
    activeNoteKey,
    noteInput,
    animating,
    slideDir,
    isMobile,
    daysInMonth,
    firstDay,
    calCells,
    setHoverDay,
    setActiveNoteKey,
    setNoteInput,
    navigate,
    handleDayClick,
    saveNote,
    clearSelection,
  } = useCalendarLogic();

  const theme = MONTH_THEMES[currentMonth];

  return (
    <div style={{ background: "#0b1a2b", minHeight: "100vh", padding: "40px 0" }}>
      <div
        className="cal-root"
        style={{ width: "100%", maxWidth: 1000, margin: "0 auto", userSelect: "none" }}
      >
        <style>{baseStyle}</style>

        {/* Card wrapper */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.12)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            minHeight: isMobile ? "auto" : 580,
          }}
        >
          {/* Hero Panel */}
          <HeroPanel
            theme={theme}
            currentMonth={currentMonth}
            currentYear={currentYear}
            isMobile={isMobile}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onNavigate={navigate}
            onClearSelection={clearSelection}
          />

          {/* Calendar + Notes */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#FAFAF8",
              minWidth: 0,
            }}
          >
            {/* Calendar grid */}
            <CalendarGrid
              currentYear={currentYear}
              currentMonth={currentMonth}
              theme={theme}
              today={today}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              hoverDay={hoverDay}
              selecting={selecting}
              isMobile={isMobile}
              animating={animating}
              slideDir={slideDir}
              daysInMonth={daysInMonth}
              firstDay={firstDay}
              calCells={calCells}
              onDayClick={handleDayClick}
              onDayHover={setHoverDay}
            />

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "linear-gradient(to right, transparent, #E0DDD7, transparent)",
                margin: "0 16px",
              }}
            />

            {/* Notes section */}
            <NotesSection
              theme={theme}
              currentMonth={currentMonth}
              currentYear={currentYear}
              isMobile={isMobile}
              activeNoteKey={activeNoteKey}
              noteInput={noteInput}
              notes={notes}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onNoteInputChange={setNoteInput}
              onNoteKeyChange={setActiveNoteKey}
              onSaveNote={saveNote}
            />
          </div>
        </div>

        {/* Instruction hint */}
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 11,
            color: "#bbb",
            fontFamily: "sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          Click a day to start selecting · Click again to set end date · Hover for holidays
        </div>
      </div>
    </div>
  );
}
