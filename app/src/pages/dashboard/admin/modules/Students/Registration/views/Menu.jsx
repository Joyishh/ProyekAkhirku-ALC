import React from 'react';
import { Icon } from '@iconify/react';
import ModuleHeader from '../../../../../../../components/ModuleHeader';

/**
 * Menu - Initial menu displaying statistics and navigation buttons
 * @param {Object} props
 * @param {number} props.pendingCount - Number of pending registrations
 * @param {number} props.activeCount - Number of active students
 * @param {number} props.totalCount - Total number of registrations
 * @param {Function} props.onNavigateRegister - Handler to navigate to register form
 * @param {Function} props.onNavigateReview - Handler to navigate to review pending
 */
const Menu = ({ 
  pendingCount, 
  activeCount, 
  totalCount, 
  onNavigateRegister, 
  onNavigateReview 
}) => {
  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        title="Student Registration Management"
        description="Register new students and manage pending registrations"
        icon="mdi:account-multiple-plus"
        iconColor="blue"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Pending</p>
              <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Icon icon="mdi:account-clock" className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Students</p>
              <p className="text-3xl font-bold text-green-600">{activeCount}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Icon icon="mdi:account-check" className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Registrations</p>
              <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon icon="mdi:account-group" className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Icon icon="mdi:account-plus-outline" className="w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">New Registration</h2>
          </div>
          <p className="text-gray-600 mb-4">Register a new student with complete information and enrollment details.</p>
          <button 
            onClick={onNavigateRegister}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center cursor-pointer"
          >
            <Icon icon="mdi:account-plus" className="w-5 h-5 mr-2" />
            Register New Student
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Icon icon="mdi:account-clock" className="w-8 h-8 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-800">Pending Registrations</h2>
          </div>
          <p className="text-gray-600 mb-4">Review and approve pending student registration applications.</p>
          <button 
            onClick={onNavigateReview}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center cursor-pointer"
          >
            <Icon icon="mdi:clipboard-list" className="w-5 h-5 mr-2" />
            Review Pending ({pendingCount})
          </button>
        </div>
      </div>

      {/* Recent Activity Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start">
          <Icon icon="mdi:information" className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Registration Workflow</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li className="flex items-center">
                <Icon icon="mdi:circle-small" className="w-4 h-4 mr-1" />
                Admin registers new student → Status: Pending
              </li>
              <li className="flex items-center">
                <Icon icon="mdi:circle-small" className="w-4 h-4 mr-1" />
                Student pays registration fee
              </li>
              <li className="flex items-center">
                <Icon icon="mdi:circle-small" className="w-4 h-4 mr-1" />
                Admin reviews and approves → Status: Active
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
