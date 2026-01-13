import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem } from '@mui/material';

const Overview = ({
  // Form State
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  
  // History State
  activeHistoryTab,
  setActiveHistoryTab,
  filteredAnnouncements,
  
  // Functions
  handleDelete,
  getPriorityStyles,
}) => {
  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Icon icon="mdi:bullhorn" className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
            <p className="text-gray-600">Create and manage announcements for students and staff</p>
          </div>
        </div>
      </div>

      {/* Split View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Create Announcement Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <Icon icon="mdi:plus-circle" className="w-5 h-5 mr-2 text-yellow-600" />
            Create Announcement
          </h2>

          <div className="space-y-5">
            {/* Title */}
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              required
              placeholder="Enter announcement title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              sx={{
                marginBottom: '16px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#fbbf24',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#eab308',
                    borderWidth: '2px',
                  },
                },
                '& label.Mui-focused': {
                  color: '#eab308',
                },
              }}
            />

            {/* Content */}
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Content"
              variant="outlined"
              required
              placeholder="Enter announcement message..."
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              sx={{
                marginBottom: '16px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#fbbf24',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#eab308',
                    borderWidth: '2px',
                  },
                },
                '& label.Mui-focused': {
                  color: '#eab308',
                },
              }}
            />

            {/* Target Audience */}
            <TextField
              select
              fullWidth
              label="Target Audience"
              variant="outlined"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              sx={{
                marginBottom: '16px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#fbbf24',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#eab308',
                    borderWidth: '2px',
                  },
                },
                '& label.Mui-focused': {
                  color: '#eab308',
                },
              }}
            >
              <MenuItem value="All Users">All Users</MenuItem>
              <MenuItem value="All Students">All Students</MenuItem>
              <MenuItem value="Teachers">Teachers</MenuItem>
            </TextField>

            {/* Priority Level - Chips Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level</label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('priority', 'normal')}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                    formData.priority === 'normal'
                      ? 'bg-gray-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon icon="mdi:circle" className="w-4 h-4 inline mr-1.5" />
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('priority', 'important')}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    formData.priority === 'important'
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  <Icon icon="mdi:alert" className="w-4 h-4 inline mr-1.5" />
                  Important
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('priority', 'urgent')}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    formData.priority === 'urgent'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <Icon icon="mdi:alert-octagon" className="w-4 h-4 inline mr-1.5" />
                  Urgent
                </button>
              </div>
            </div>

            {/* Delivery Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Schedule</label>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('deliveryType', 'immediate')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                    formData.deliveryType === 'immediate'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon icon="mdi:send" className="w-5 h-5 inline mr-2" />
                  Send Immediately
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('deliveryType', 'scheduled')}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.deliveryType === 'scheduled'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon icon="mdi:clock-outline" className="w-5 h-5 inline mr-2" />
                  Schedule for Later
                </button>
              </div>

              {/* Conditional: Date & Time Inputs */}
              {formData.deliveryType === 'scheduled' && (
                <div className="grid grid-cols-2 gap-3 mt-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    variant="outlined"
                    size="small"
                    value={formData.scheduleDate}
                    onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        '&:hover fieldset': {
                          borderColor: '#fbbf24',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#eab308',
                          borderWidth: '2px',
                        },
                      },
                      '& label.Mui-focused': {
                        color: '#eab308',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    type="time"
                    label="Time"
                    variant="outlined"
                    size="small"
                    value={formData.scheduleTime}
                    onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        '&:hover fieldset': {
                          borderColor: '#fbbf24',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#eab308',
                          borderWidth: '2px',
                        },
                      },
                      '& label.Mui-focused': {
                        color: '#eab308',
                      },
                    }}
                  />
                </div>
              )}
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachment (Optional)
              </label>
              <div className="flex items-center space-x-3">
                <label className="flex-1 cursor-pointer">
                  <div className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <Icon icon="mdi:paperclip" className="w-5 h-5" />
                      <span className="text-sm">
                        {formData.attachment ? formData.attachment.name : 'Choose file to upload'}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
                {formData.attachment && (
                  <button
                    type="button"
                    onClick={() => handleInputChange('attachment', null)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Icon icon="mdi:close" className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Icon icon="mdi:send" className="w-5 h-5" />
                <span>
                  {formData.deliveryType === 'immediate' ? 'Send Announcement' : 'Schedule Announcement'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Announcement History */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <Icon icon="mdi:history" className="w-5 h-5 mr-2 text-yellow-600" />
            Announcement History
          </h2>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveHistoryTab('sent')}
              className={`px-6 py-3 font-medium transition-colors cursor-pointer ${
                activeHistoryTab === 'sent'
                  ? 'text-yellow-600 border-b-2 border-yellow-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon icon="mdi:check-circle" className="w-4 h-4 inline mr-1.5" />
              Sent
            </button>
            <button
              onClick={() => setActiveHistoryTab('scheduled')}
              className={`px-6 py-3 font-medium transition-colors cursor-pointer ${
                activeHistoryTab === 'scheduled'
                  ? 'text-yellow-600 border-b-2 border-yellow-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon icon="mdi:clock-outline" className="w-4 h-4 inline mr-1.5" />
              Scheduled
            </button>
          </div>

          {/* Announcements List */}
          <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12">
                <Icon icon="mdi:inbox" className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No {activeHistoryTab} announcements</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => {
                const styles = getPriorityStyles(announcement.priority);
                return (
                  <div
                    key={announcement.id}
                    className={`${styles.border} bg-white rounded-lg p-4 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1.5">
                          <Icon
                            icon={
                              announcement.priority === 'urgent'
                                ? 'mdi:alert-octagon'
                                : announcement.priority === 'important'
                                ? 'mdi:alert'
                                : 'mdi:circle'
                            }
                            className={`w-4 h-4 ${styles.icon}`}
                          />
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {announcement.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {announcement.content}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Icon icon="mdi:account-group" className="w-3.5 h-3.5 mr-1" />
                            {announcement.targetAudience}
                          </span>
                          <span className="flex items-center">
                            <Icon icon="mdi:calendar" className="w-3.5 h-3.5 mr-1" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center">
                            <Icon icon="mdi:clock" className="w-3.5 h-3.5 mr-1" />
                            {announcement.time}
                          </span>
                          {announcement.status === 'sent' && (
                            <span className="flex items-center text-green-600">
                              <Icon icon="mdi:eye" className="w-3.5 h-3.5 mr-1" />
                              {announcement.reads} reads
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(announcement.id, announcement.title)}
                        className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title={announcement.status === 'scheduled' ? 'Cancel Scheduled' : 'Delete'}
                      >
                        <Icon icon="mdi:delete" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
