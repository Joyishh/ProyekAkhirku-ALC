import React from 'react';
import { Icon } from '@iconify/react';

const AttendanceHistoryCard = ({ attendanceHistory, onAttendanceHistoryClick }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Icon icon="mdi:clipboard-text-clock" className="w-5 h-5 mr-2 text-green-500" />
        Attendance History
        <span className="text-xs text-gray-500 ml-2 font-normal">
          (Click to view details)
        </span>
      </h2>
      
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {attendanceHistory.length === 0 ? (
          <div className="text-center py-8">
            <Icon icon="mdi:calendar-blank" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No attendance history</p>
          </div>
        ) : (
          attendanceHistory.map((record, index) => (
            <div 
              key={index} 
              onClick={() => onAttendanceHistoryClick(record)}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {new Date(record.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-gray-600">{record.total} students</p>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-green-600">
                  <Icon icon="mdi:check-circle" className="w-4 h-4 mr-1" />
                  {record.present}
                </span>
                {record.late > 0 && (
                  <span className="flex items-center text-yellow-600">
                    <Icon icon="mdi:clock-alert" className="w-4 h-4 mr-1" />
                    {record.late}
                  </span>
                )}
                {record.absent > 0 && (
                  <span className="flex items-center text-red-600">
                    <Icon icon="mdi:close-circle" className="w-4 h-4 mr-1" />
                    {record.absent}
                  </span>
                )}
                {record.excused > 0 && (
                  <span className="flex items-center text-blue-600">
                    <Icon icon="mdi:hospital-box" className="w-4 h-4 mr-1" />
                    {record.excused}
                  </span>
                )}
                <Icon icon="mdi:chevron-right" className="w-4 h-4 text-gray-400 ml-2" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttendanceHistoryCard;
