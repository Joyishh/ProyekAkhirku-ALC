import React from 'react';
import { Icon } from '@iconify/react';

/**
 * ReviewPending - View for reviewing and managing pending registrations
 * @param {Object} props
 * @param {Array} props.pendingList - List of pending students
 * @param {number|null} props.expandedRow - ID of expanded row
 * @param {boolean} props.showProofModal - Whether proof modal is shown
 * @param {string|null} props.selectedProofImage - URL of selected proof image
 * @param {Function} props.onToggleDetail - Handler to toggle detail expansion
 * @param {Function} props.onViewProof - Handler to view payment proof
 * @param {Function} props.onCloseProofModal - Handler to close proof modal
 * @param {Function} props.onApprove - Handler to approve registration
 * @param {Function} props.onReject - Handler to reject registration
 * @param {Function} props.onBack - Handler to go back to menu
 * @param {Function} props.formatCurrency - Function to format currency
 */
const ReviewPending = ({ 
  pendingList, 
  expandedRow, 
  showProofModal, 
  selectedProofImage,
  onToggleDetail, 
  onViewProof, 
  onCloseProofModal, 
  onApprove, 
  onReject, 
  onBack,
  formatCurrency 
}) => {
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Icon icon="mdi:clipboard-list" className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Review Pending Registrations</h1>
              <p className="text-gray-600">
                {pendingList.length} pending registration{pendingList.length !== 1 ? 's' : ''} awaiting approval
              </p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5 mr-2" />
            Back to Menu
          </button>
        </div>
      </div>

      {/* Pending Students List */}
      {pendingList.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:check-all" className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Pending Registrations</h3>
          <p className="text-gray-600">All registrations have been processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingList.map((student) => (
            <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Student Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon icon="mdi:account" className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{student.fullName}</h3>
                      <p className="text-sm text-gray-500 mb-2">{student.email}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Icon icon="mdi:package-variant" className="w-4 h-4 mr-1" />
                          <span>{student.selectedPackage}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Icon icon="mdi:calendar" className="w-4 h-4 mr-1" />
                          <span>{student.registrationDate}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Icon icon="mdi:cash-multiple" className="w-4 h-4 mr-1" />
                          <span className="font-semibold">{formatCurrency(student.amount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Verification Section */}
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:w-auto">
                    {student.paymentProof ? (
                      <button
                        onClick={() => onViewProof(student.paymentProof)}
                        className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg font-medium transition-all flex items-center justify-center cursor-pointer"
                      >
                        <Icon icon="mdi:image" className="w-5 h-5 mr-2" />
                        Lihat Bukti Transfer
                      </button>
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg font-medium flex items-center justify-center">
                        <Icon icon="mdi:check-decagram" className="w-5 h-5 mr-2" />
                        Direct Payment / Verified
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onToggleDetail(student.id)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-all flex items-center justify-center cursor-pointer"
                        title="View Details"
                      >
                        <Icon icon="mdi:information" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onApprove(student.id)}
                        className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg font-medium transition-all flex items-center justify-center cursor-pointer"
                        title="Approve"
                      >
                        <Icon icon="mdi:check-circle" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onReject(student.id)}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg font-medium transition-all flex items-center justify-center cursor-pointer"
                        title="Reject"
                      >
                        <Icon icon="mdi:close-circle" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRow === student.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Icon icon="mdi:account-details" className="w-5 h-5 mr-2 text-blue-600" />
                          Personal Information
                        </h4>
                        <dl className="space-y-2">
                          <div className="flex">
                            <dt className="text-sm font-medium text-gray-600 w-1/3">Username:</dt>
                            <dd className="text-sm text-gray-900">{student.username}</dd>
                          </div>
                          <div className="flex">
                            <dt className="text-sm font-medium text-gray-600 w-1/3">Date of Birth:</dt>
                            <dd className="text-sm text-gray-900">{student.dateOfBirth}</dd>
                          </div>
                          <div className="flex">
                            <dt className="text-sm font-medium text-gray-600 w-1/3">Gender:</dt>
                            <dd className="text-sm text-gray-900">{student.gender}</dd>
                          </div>
                          <div className="flex">
                            <dt className="text-sm font-medium text-gray-600 w-1/3">Address:</dt>
                            <dd className="text-sm text-gray-900">{student.address}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Icon icon="mdi:account-supervisor" className="w-5 h-5 mr-2 text-green-600" />
                          Parent Information
                        </h4>
                        <dl className="space-y-2">
                          <div className="flex">
                            <dt className="text-sm font-medium text-gray-600 w-1/3">Parent Name:</dt>
                            <dd className="text-sm text-gray-900">{student.parentName}</dd>
                          </div>
                          <div className="flex">
                            <dt className="text-sm font-medium text-gray-600 w-1/3">Parent Phone:</dt>
                            <dd className="text-sm text-gray-900">{student.parentPhone}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Proof Modal */}
      {showProofModal && selectedProofImage && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50 p-4" onClick={onCloseProofModal}>
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <Icon icon="mdi:image" className="w-6 h-6 text-white mr-3" />
                <h3 className="text-lg font-bold text-white">Bukti Transfer Pembayaran</h3>
              </div>
              <button
                onClick={onCloseProofModal}
                className="text-white hover:bg-blue-800 rounded-lg p-2 transition-all cursor-pointer"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <img
                  src={selectedProofImage}
                  alt="Bukti Transfer"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <Icon icon="mdi:information" className="inline w-4 h-4 mr-1" />
                  <strong>Tips:</strong> Pastikan nominal transfer sesuai dengan biaya pendaftaran dan detail transfer jelas terbaca.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={onCloseProofModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPending;
