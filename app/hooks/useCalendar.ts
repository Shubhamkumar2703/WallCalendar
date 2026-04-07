"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
} from "date-fns";
import { startOfWeek } from "date-fns";

export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [isDragging, setIsDragging] = useState(false);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // 🟢 Drag Start
  const handleMouseDown = (day: Date) => {
    setIsDragging(true);
    setRange({ start: day, end: day });
  };

  // 🟡 Drag Move
  const handleMouseEnter = (day: Date) => {
    if (!isDragging) return;

    setRange((prev) => ({
      ...prev,
      end: day,
    }));
  };

  // 🔴 Drag End
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isInRange = (day: Date) => {
    if (!range.start || !range.end) return false;
    return day >= range.start && day <= range.end;
  };

  return {
    days,
    range,
    isInRange,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    setCurrentDate,
    currentDate,
  };
}