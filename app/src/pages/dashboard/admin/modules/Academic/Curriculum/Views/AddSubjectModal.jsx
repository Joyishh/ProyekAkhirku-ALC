import React from 'react';
import { Icon } from '@iconify/react';

const AddSubjectModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center">
            <Icon icon="mdi:book-open-page-variant" className="w-6 h-6 text-white mr-3" />
            <h3 className="text-lg font-bold text-white">Tambah Mata Pelajaran</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-purple-800 rounded-lg p-2 transition-all cursor-pointer"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 text-center">
            Form untuk menambah mata pelajaran akan diimplementasikan di sini.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;
