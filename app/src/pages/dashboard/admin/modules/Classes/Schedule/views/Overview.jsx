import React from 'react';
import { Icon } from '@iconify/react';
import ModuleHeader from '../../../../../../../components/ModuleHeader';

const Overview = ({
  days,
  timeSlots,
  schedules,
  setShowRoomModal,
  handleAddSchedule,
  getScheduleForSlot,
  getRowSpan,
  handleEditSchedule,
  handleDeleteSchedule
}) => {
  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:calendar-clock"
        iconColor="blue"
        title="Schedule Management"
        description="Manage class schedules and assign students"
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowRoomModal(true)}
            className="flex items-center space-x-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <Icon icon="mdi:office-building" className="w-5 h-5" />
            <span className="font-medium">Manage Rooms</span>
          </button>
          <button
            onClick={handleAddSchedule}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <Icon icon="mdi:plus-circle" className="w-5 h-5" />
            <span className="font-medium">Add Schedule</span>
          </button>
        </div>
      </ModuleHeader>

      {/* Weekly Calendar Grid */}
      <div className="bg-white rounded-xl p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Schedule</h2>
        
        <div className="min-w-[1200px]">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            <div className="bg-gray-100 p-3 rounded-lg text-center font-semibold text-gray-700">
              Time
            </div>
            {days.map(day => (
              <div key={day} className="bg-gray-100 p-3 rounded-lg text-center font-semibold text-gray-700">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-7 gap-2 mb-2">
              {/* Time Column */}
              <div className="bg-gray-50 p-3 rounded-lg text-center font-medium text-gray-600">
                {time}
              </div>

              {/* Day Columns */}
              {days.map(day => {
                const schedulesInSlot = getScheduleForSlot(day, time);
                const isFirstSlot = schedulesInSlot.some(schedule => schedule.startTime === time);

                return (
                  <div key={`${day}-${time}`} className="relative">
                    {isFirstSlot && schedulesInSlot.length > 0 ? (
                      schedulesInSlot.map(schedule => {
                        if (schedule.startTime === time) {
                          return (
                            <div
                              key={schedule.id}
                              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer z-10"
                              style={{
                                height: `calc(${getRowSpan(schedule)} * (3rem + 0.5rem))`,
                              }}
                              onClick={() => handleEditSchedule(schedule)}
                            >
                              <div className="text-white">
                                <h3 className="font-bold text-sm mb-1">{schedule.className}</h3>
                                <div className="flex items-center space-x-1 text-xs mb-1">
                                  <Icon icon="mdi:account-tie" className="w-3 h-3" />
                                  <span className="truncate">{schedule.teacher}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-xs mb-2">
                                  <Icon icon="mdi:door" className="w-3 h-3" />
                                  <span>{schedule.room}</span>
                                </div>
                                <div className="inline-flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                                  <Icon icon="mdi:account-group" className="w-3 h-3" />
                                  <span>{schedule.assignedStudents.length} Students</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <div className="bg-gray-50 rounded-lg h-12 border-2 border-dashed border-gray-200"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule List View */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">All Schedules</h2>
        
        <div className="space-y-3">
          {schedules.map(schedule => (
            <div
              key={schedule.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1 grid grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Class Name</p>
                  <p className="font-semibold text-gray-800">{schedule.className}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teacher</p>
                  <p className="font-medium text-gray-700">{schedule.teacher}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room</p>
                  <p className="font-medium text-gray-700">{schedule.room}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Schedule</p>
                  <p className="font-medium text-gray-700">
                    {schedule.day}, {schedule.startTime} - {schedule.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Students</p>
                  <div className="flex items-center space-x-1">
                    <Icon icon="mdi:account-group" className="w-4 h-4 text-blue-600" />
                    <p className="font-semibold text-blue-600">{schedule.assignedStudents.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditSchedule(schedule)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="Edit Schedule"
                >
                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Schedule"
                >
                  <Icon icon="mdi:delete" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
