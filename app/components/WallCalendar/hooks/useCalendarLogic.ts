"use client";

import { useState, useEffect, useCallback } from "react";
import { getDaysInMonth, getFirstDayOfMonth, isSameDay } from "../utils";

export interface UseCalendarLogicReturn {
  today: Date;
  currentYear: number;
  currentMonth: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  hoverDay: number | null;
  selecting: boolean;
  notes: Record<string, string>;
  activeNoteKey: string;
  noteInput: string;
  showNotePanel: boolean;
  animating: boolean;
  slideDir: "left" | "right";
  isMobile: boolean;
  daysInMonth: number;
  firstDay: number;
  calCells: (number | null)[];
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  setRangeStart: (date: Date | null) => void;
  setRangeEnd: (date: Date | null) => void;
  setHoverDay: (day: number | null) => void;
  setSelecting: (selecting: boolean) => void;
  setNotes: (notes: Record<string, string>) => void;
  setActiveNoteKey: (key: string) => void;
  setNoteInput: (input: string) => void;
  navigate: (dir: number) => void;
  handleDayClick: (day: number) => void;
  saveNote: () => void;
  clearSelection: () => void;
}

export function useCalendarLogic(): UseCalendarLogicReturn {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDay, setHoverDay] = useState<number | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [activeNoteKey, setActiveNoteKey] = useState<string>("month");
  const [noteInput, setNoteInput] = useState("");
  const [showNotePanel, setShowNotePanel] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const key = activeNoteKey === "month" ? `${currentYear}-${currentMonth}` : activeNoteKey;
    setNoteInput(notes[key] || "");
  }, [activeNoteKey, currentMonth, currentYear, notes]);

  const navigate = useCallback(
    (dir: number) => {
      setSlideDir(dir > 0 ? "left" : "right");
      setAnimating(true);
      setTimeout(() => {
        setCurrentMonth((m) => {
          let nm = m + dir;
          if (nm < 0) {
            setCurrentYear((y) => y - 1);
            return 11;
          }
          if (nm > 11) {
            setCurrentYear((y) => y + 1);
            return 0;
          }
          return nm;
        });
        setRangeStart(null);
        setRangeEnd(null);
        setSelecting(false);
        setActiveNoteKey("month");
        setAnimating(false);
      }, 220);
    },
    []
  );

  const saveNote = useCallback(() => {
    const key = activeNoteKey === "month" ? `${currentYear}-${currentMonth}` : activeNoteKey;
    setNotes((n) => ({ ...n, [key]: noteInput }));
  }, [activeNoteKey, currentYear, currentMonth, noteInput]);

  const handleDayClick = useCallback(
    (day: number) => {
      const clicked = new Date(currentYear, currentMonth, day);
      if (!selecting || !rangeStart) {
        setRangeStart(clicked);
        setRangeEnd(null);
        setSelecting(true);
      } else {
        if (isSameDay(clicked, rangeStart)) {
          setRangeStart(null);
          setRangeEnd(null);
          setSelecting(false);
          setActiveNoteKey("month");
          return;
        }
        const end = clicked;
        setRangeEnd(end);
        setSelecting(false);
        const s = rangeStart < end ? rangeStart : end;
        const e = rangeStart < end ? end : rangeStart;
        const key = `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}__${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`;
        setActiveNoteKey(key);
      }
    },
    [selecting, rangeStart, currentYear, currentMonth]
  );

  const clearSelection = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelecting(false);
    setActiveNoteKey("month");
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const calCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d);

  return {
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
    showNotePanel,
    animating,
    slideDir,
    isMobile,
    daysInMonth,
    firstDay,
    calCells,
    setCurrentMonth,
    setCurrentYear,
    setRangeStart,
    setRangeEnd,
    setHoverDay,
    setSelecting,
    setNotes,
    setActiveNoteKey,
    setNoteInput,
    navigate,
    handleDayClick,
    saveNote,
    clearSelection,
  };
}
