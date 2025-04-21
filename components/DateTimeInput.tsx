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
  // Parse the date value into day, month, year
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);

  // Initialize the date fields from the dateValue
  useEffect(() => {
    if (dateValue) {
      const [yearVal, monthVal, dayVal] = dateValue.split("-");
      setYear(yearVal || "");
      setMonth(monthVal || "");
      setDay(dayVal || "");
    }
  }, [dateValue]);

  // Check if time is unknown
  useEffect(() => {
    if (timeValue === "unknown") {
      setIsTimeUnknown(true);
    }
  }, [timeValue]);

  // Handle changes to individual date fields
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDay(value);
    // Create a synthetic event for the parent component
    const syntheticEvent = {
      target: {
        name: dateName,
        value: `${year}-${month.padStart(2, "0")}-${value.padStart(2, "0")}`,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onDateChange(syntheticEvent);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMonth(value);
    // Create a synthetic event for the parent component
    const syntheticEvent = {
      target: {
        name: dateName,
        value: `${year}-${value.padStart(2, "0")}-${day.padStart(2, "0")}`,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onDateChange(syntheticEvent);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setYear(value);
    // Create a synthetic event for the parent component
    const syntheticEvent = {
      target: {
        name: dateName,
        value: `${value}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onDateChange(syntheticEvent);
  };

  // Handle the unknown time checkbox
  const handleTimeUnknownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTimeUnknown(e.target.checked);
    if (e.target.checked) {
      // Create a synthetic event for the parent component with empty value
      const syntheticEvent = {
        target: {
          name: timeName,
          value: "unknown",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onTimeChange(syntheticEvent);
    } else {
      // Reset to default time if unchecked
      const syntheticEvent = {
        target: {
          name: timeName,
          value: "00:00",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onTimeChange(syntheticEvent);
    }
  };

  return (
    <div className="w-full">
      <label className="question-label required">Full Birthdate</label>

      <div className="date-time-picker" style={{ gap: "0.5rem" }}>
        <div className="date-field">
          <input
            type="number"
            name={`${dateName}-day`}
            value={day}
            onChange={handleDayChange}
            className="w-full rounded-lg border border-gray-300 px-2 py-3 appearance-none bg-white"
            placeholder="DD"
            min="1"
            max="31"
          />
        </div>

        <div className="date-field">
          <input
            type="number"
            name={`${dateName}-month`}
            value={month}
            onChange={handleMonthChange}
            className="w-full rounded-lg border border-gray-300 px-2 py-3 appearance-none bg-white"
            placeholder="MM"
            min="1"
            max="12"
          />
        </div>

        <div className="date-field">
          <input
            type="number"
            name={`${dateName}-year`}
            value={year}
            onChange={handleYearChange}
            className="w-full rounded-lg border border-gray-300 px-2 py-3 appearance-none bg-white"
            placeholder="YYYY"
            min="1900"
            max="2100"
          />
        </div>

        <div className="time-field">
          <input
            type="time"
            name={timeName}
            value={isTimeUnknown ? "" : timeValue || "00:00"}
            onChange={onTimeChange}
            className="w-full rounded-lg border border-gray-300 px-2 py-3 appearance-none bg-white"
            disabled={isTimeUnknown}
            placeholder="00:00"
          />
        </div>

        <div
          className="unknown-time-checkbox"
          style={{ paddingTop: 0, display: "flex", alignItems: "center" }}
        >
          <div className="checkbox-table">
            <div className="checkbox-cell">
              <input
                type="checkbox"
                checked={isTimeUnknown}
                onChange={handleTimeUnknownChange}
                className="form-checkbox h-5 w-5 text-indigo-600 mobile-checkbox"
              />
            </div>
            <div className="label-cell">
              <span className="text-sm text-gray-700">Unknown</span>
            </div>
          </div>
        </div>
      </div>

      {dateError && (
        <span className="text-red-500 text-xs mt-2 block">{dateError}</span>
      )}
      {timeError && (
        <span className="text-red-500 text-xs mt-2 block">{timeError}</span>
      )}
    </div>
  );
};

export default DateTimeInput;
