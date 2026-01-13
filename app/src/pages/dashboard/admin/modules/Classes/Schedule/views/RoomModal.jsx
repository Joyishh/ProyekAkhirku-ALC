import React from 'react';
import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';

const RoomModal = ({
  showRoomModal,
  setShowRoomModal,
  newRoomName,
  setNewRoomName,
  newRoomCapacity,
  setNewRoomCapacity,
  rooms,
  handleAddRoom,
  handleDeleteRoom
}) => {
  if (!showRoomModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <Icon icon="mdi:office-building" className="w-6 h-6 text-blue-600" />
              <span>Manage Rooms</span>
            </h2>
            <button
              onClick={() => setShowRoomModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Icon icon="mdi:close" className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Add New Room Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Icon icon="mdi:plus-circle" className="w-5 h-5 text-blue-600" />
                <span>Add New Room</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TextField
                  placeholder="Room Name (e.g., Lab 3)"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      }
                    }
                  }}
                />
                <TextField
                  type="number"
                  placeholder="Capacity"
                  value={newRoomCapacity}
                  onChange={(e) => setNewRoomCapacity(e.target.value)}
                  size="small"
                  fullWidth
                  inputProps={{ min: 1 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2563eb',
                        borderWidth: '2px',
                      }
                    }
                  }}
                />
                <button
                  onClick={handleAddRoom}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
                >
                  Add Room
                </button>
              </div>
            </div>

            {/* Room List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">All Rooms ({rooms.length})</h3>
              <div className="space-y-2">
                {rooms.map(room => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon icon="mdi:door" className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{room.name}</p>
                        <p className="text-sm text-gray-500">Capacity: {room.capacity} students</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Room"
                    >
                      <Icon icon="mdi:delete" className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={() => setShowRoomModal(false)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
