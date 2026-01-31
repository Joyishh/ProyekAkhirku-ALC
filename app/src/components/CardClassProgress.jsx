import React from 'react';
import { Icon } from '@iconify/react';
import { Card, CardContent, LinearProgress } from '@mui/material';

const CardClassProgress = ({ classItem, onClick }) => {
  const getProgressColor = (rate) => {
    if (rate >= 80) return 'success';
    if (rate >= 50) return 'primary';
    return 'warning';
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-100 text-green-700';
    if (score >= 70) return 'bg-blue-100 text-blue-700';
    if (score >= 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <Card
      onClick={() => onClick(classItem)}
      sx={{
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(classItem.averageScore)}`}>
            <Icon icon="mdi:chart-line" className="w-3 h-3 inline mr-1" />
            Avg: {classItem.averageScore.toFixed(1)}
          </span>
          <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-400" />
        </div>

        {/* Class Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{classItem.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{classItem.subject}</p>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:calendar" className="w-4 h-4 text-blue-500" />
              <span>{classItem.schedule}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:clock-outline" className="w-4 h-4 text-green-500" />
              <span>{classItem.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:map-marker" className="w-4 h-4 text-orange-500" />
              <span>{classItem.room}</span>
            </div>
          </div>
        </div>

        {/* Stats & Grading Progress */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Icon icon="mdi:account-check" className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">{classItem.gradedStudents}/{classItem.totalStudents} Graded</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600 font-semibold">{classItem.completionRate}%</span>
            </div>
          </div>

          {/* Grading Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Grading Progress</span>
              <span className="font-medium">{classItem.completionRate}%</span>
            </div>
            <LinearProgress
              variant="determinate"
              value={classItem.completionRate}
              color={getProgressColor(classItem.completionRate)}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#e5e7eb',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                },
              }}
            />
          </div>

          <div className="text-xs text-gray-500 pt-2">
            <Icon icon="mdi:clock-outline" className="w-3 h-3 inline mr-1" />
            Updated: {classItem.lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardClassProgress;
