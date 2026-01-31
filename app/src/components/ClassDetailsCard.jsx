import React from 'react';
import { Icon } from '@iconify/react';

const ClassDetailsCard = ({ classData }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Icon icon="mdi:information-outline" className="w-5 h-5 mr-2 text-purple-500" />
        Class Details
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Icon icon="mdi:calendar" className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">Schedule</p>
            <p className="font-medium text-gray-800">{classData.schedule}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Icon icon="mdi:clock-outline" className="w-5 h-5 text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-medium text-gray-800">{classData.time}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Icon icon="mdi:map-marker" className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Room</p>
            <p className="font-medium text-gray-800">{classData.room}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Icon icon="mdi:account-group" className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="font-medium text-gray-800">
              {classData.totalStudents} {typeof classData.totalStudents === 'number' ? 'students' : ''}
            </p>
          </div>
        </div>

        {classData.attendanceRate !== undefined && (
          <div className="flex items-center space-x-3">
            <Icon icon="mdi:chart-line" className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Average Attendance Rate</p>
              <p className={`font-bold ${
                classData.attendanceRate >= 90 ? 'text-green-600' :
                classData.attendanceRate >= 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {classData.attendanceRate}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetailsCard;
