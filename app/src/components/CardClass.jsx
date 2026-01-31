import React from 'react';
import { Icon } from '@iconify/react';
import { Card, CardContent, LinearProgress } from '@mui/material';

const CardClass = ({ classItem, onClick, variant = 'attendance' }) => {
  const getProgressColor = (rate) => {
    if (rate >= 90) return '#10b981'; // Green
    if (rate >= 75) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getMuiProgressColor = (rate) => {
    if (rate >= 80) return 'success';
    if (rate >= 50) return 'primary';
    return 'warning';
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-100 text-green-600';
    if (score >= 70) return 'bg-blue-100 text-blue-600';
    if (score >= 60) return 'bg-yellow-100 text-yellow-600';
    return 'bg-red-100 text-red-600';
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
          {variant === 'attendance' ? (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 min-w-[100px] text-center">
              <Icon icon="mdi:check-circle" className="w-3 h-3 inline mr-1" />
              Active
            </span>
          ) : (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(classItem.averageScore)} min-w-[100px] text-center`}>
              <Icon icon="mdi:chart-line" className="w-3 h-3 inline mr-1" />
              Avg: {classItem.averageScore?.toFixed(1)}
            </span>
          )}
          <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-400" />
        </div>

        {/* Class Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{classItem.name}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {variant === 'attendance' ? `${classItem.level} Level` : classItem.subject}
          </p>

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

        {/* Stats & Progress */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Icon 
                icon={variant === 'attendance' ? 'mdi:account-group' : 'mdi:account-check'} 
                className="w-4 h-4 text-blue-500" 
              />
              <span className="text-gray-600">
                {variant === 'attendance' 
                  ? `${classItem.students} Students`
                  : `${classItem.gradedStudents}/${classItem.totalStudents} Graded`
                }
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600 font-semibold">
                {variant === 'attendance' 
                  ? `${classItem.attendanceRate}%`
                  : `${classItem.completionRate}%`
                }
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{variant === 'attendance' ? 'Attendance Rate' : 'Grading Progress'}</span>
              <span className="font-medium">
                {variant === 'attendance' 
                  ? `${classItem.attendanceRate}%`
                  : `${classItem.completionRate}%`
                }
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={variant === 'attendance' ? classItem.attendanceRate : classItem.completionRate}
              color={variant === 'attendance' ? undefined : getMuiProgressColor(classItem.completionRate)}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#e5e7eb',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: variant === 'attendance' 
                    ? getProgressColor(classItem.attendanceRate)
                    : undefined,
                  borderRadius: 3,
                },
              }}
            />
          </div>

          <div className="text-xs text-gray-500 pt-2">
            <Icon icon={variant === 'attendance' ? 'mdi:calendar-clock' : 'mdi:clock-outline'} className="w-3 h-3 inline mr-1" />
            {variant === 'attendance' 
              ? `Next: ${classItem.nextClass}`
              : `Updated: ${classItem.lastUpdated}`
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardClass;
