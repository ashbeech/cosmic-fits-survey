"use client";

import React, { useState, useEffect } from "react";

interface DateTimeInputProps {
  dateValue: string;
  timeValue: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateError?: string;
  timeError?: string;
  dateName: string;
  timeName: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
  dateName,
  timeName,
}) => {
  // Split the dateValue into year, month, and day components
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");

  // Initialize the component with the current dateValue if it exists
  useEffect(() => {
    if (dateValue) {
      const [yearPart, monthPart, dayPart] = dateValue.split("-");
      setYear(yearPart || "");
      setMonth(monthPart || "");
      setDay(dayPart || "");
    }
  }, [dateValue]);

  // Handle changes to individual date components
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value;
    setYear(newYear);
    updateFullDate(newYear, month, day);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value;
    // Only allow 1-12
    if (
      newMonth === "" ||
      (parseInt(newMonth) >= 1 && parseInt(newMonth) <= 12)
    ) {
      setMonth(newMonth);
      updateFullDate(year, newMonth, day);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = e.target.value;
    // Only allow 1-31
    if (newDay === "" || (parseInt(newDay) >= 1 && parseInt(newDay) <= 31)) {
      setDay(newDay);
      updateFullDate(year, month, newDay);
    }
  };

  // Create a synthetic event to update the parent component
  const updateFullDate = (
    yearValue: string,
    monthValue: string,
    dayValue: string
  ) => {
    // Only update if we have valid values for all three parts
    if (yearValue && monthValue && dayValue) {
      // Format month and day with leading zeros if needed
      const formattedMonth = monthValue.padStart(2, "0");
      const formattedDay = dayValue.padStart(2, "0");

      // Create the YYYY-MM-DD format
      const fullDate = `${yearValue}-${formattedMonth}-${formattedDay}`;

      // Create a synthetic event
      const syntheticEvent = {
        target: {
          name: dateName,
          value: fullDate,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      // Call the parent's onChange handler
      onDateChange(syntheticEvent);
    }
  };

  return (
    <div className="w-full">
      <label className="question-label required">
        Full Birthdate (If time is unknown, put 00:00am)
      </label>

      <div className="date-time-picker">
        <div className="custom-date-input">
          <div className="relative flex space-x-2">
            {/* Day input */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Day</label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={handleDayChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none bg-white"
                placeholder="DD"
              />
            </div>

            {/* Month input */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Month</label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={handleMonthChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none bg-white"
                placeholder="MM"
              />
            </div>

            {/* Year input */}
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Year</label>
              <input
                type="number"
                min="1900"
                max="2024"
                value={year}
                onChange={handleYearChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none bg-white"
                placeholder="YYYY"
              />
            </div>

            {/* Hidden input to store the actual date value in YYYY-MM-DD format */}
            <input type="hidden" name={dateName} value={dateValue} />
          </div>
          {dateError && (
            <span className="text-red-500 text-xs mt-2 block">{dateError}</span>
          )}
        </div>

        <div className="custom-time-input mt-4">
          <label className="block text-xs text-gray-500 mb-1">Time</label>
          <div className="relative">
            <input
              type="time"
              name={timeName}
              value={timeValue}
              onChange={onTimeChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none bg-white"
            />
            <div className="date-time-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {timeError && (
            <span className="text-red-500 text-xs mt-2 block">{timeError}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeInput;
