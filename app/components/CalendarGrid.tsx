"use client";
import { addMonths, subMonths, format, isSameDay } from "date-fns";
import useCalendar from "../hooks/useCalendar";

export default function CalendarGrid() {
  const {
    days,
    range,
    isInRange,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = useCalendar();

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const { currentDate, setCurrentDate } = useCalendar();

   <div className="flex justify-between items-center mb-2">
  <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
    ⬅
  </button>

  <span className="font-semibold">
    {format(currentDate, "MMMM yyyy")}
  </span>

  <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
    ➡
  </button>
</div>

  return (
    <div className="text-xs select-none">

      {/* HEADER */}
      <div className="grid grid-cols-7 mb-1 text-gray-500">
        {weekDays.map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>
   
      {/* DAYS */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day: Date, i: number) => {
          const isStart = range.start && isSameDay(day, range.start);
          const isEnd = range.end && isSameDay(day, range.end);

          return (
            <div
              key={i}
              onMouseDown={() => handleMouseDown(day)}
              onMouseEnter={() => handleMouseEnter(day)}
              onMouseUp={handleMouseUp}

              onTouchStart={() => handleMouseDown(day)}
              onTouchMove={() => handleMouseEnter(day)}
              onTouchEnd={handleMouseUp}

              className={`
                text-center p-1 rounded cursor-pointer transition-all duration-200

                ${isStart ? "bg-blue-500 text-white" : ""}
                ${isEnd ? "bg-green-500 text-white" : ""}
                ${isInRange(day) ? "bg-blue-100" : "hover:bg-blue-200"}
              `}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}