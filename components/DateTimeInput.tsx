"use client";

import React from "react";

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
  return (
    <div className="w-full">
      <label className="question-label required">
        Full Birthdate (If time is unknown, put 00:00am)
      </label>

      <div className="date-time-picker">
        <div className="custom-date-input">
          <div className="relative">
            <input
              type="date"
              name={dateName}
              value={dateValue}
              onChange={onDateChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none bg-white"
              placeholder="dd/mm/yyyy"
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
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {dateError && (
            <span className="text-red-500 text-xs mt-2 block">{dateError}</span>
          )}
        </div>

        <div className="custom-time-input">
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
