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

const DatetimeInput: React.FC<DateTimeInputProps> = ({
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
      <table className="w-full">
        <tbody>
          <tr>
            <td className="w-1/2 pr-3">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Date
              </label>
              <div className="input-icon-container relative">
                <input
                  type="date"
                  name={dateName}
                  value={dateValue}
                  onChange={onDateChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0 pr-10 date-input"
                />
                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              {dateError && (
                <span className="text-red-500 text-xs mt-2 block">
                  {dateError}
                </span>
              )}
            </td>
            <td className="w-1/2 pl-3">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Time
              </label>
              <div className="input-icon-container relative">
                <input
                  type="time"
                  name={timeName}
                  value={timeValue}
                  onChange={onTimeChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-0 pr-10 time-input"
                />
                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              {timeError && (
                <span className="text-red-500 text-xs mt-2 block">
                  {timeError}
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DatetimeInput;
