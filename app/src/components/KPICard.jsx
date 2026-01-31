import React from 'react';
import { Icon } from '@iconify/react';

const KPICard = ({ title, value, icon, trend, color = 'blue' }) => {
  
  // Mapping warna agar konsisten di seluruh aplikasi
  // Cukup panggil nama warnanya (blue, orange, red, emerald) saat pakai.
  const colorVariants = {
    blue: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
    },
    orange: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
    },
    red: {
      bg: 'bg-red-100',
      icon: 'text-red-600',
    },
    emerald: {
      bg: 'bg-emerald-100',
      icon: 'text-emerald-600',
    },
    green: {
      bg: 'bg-green-100',
      icon: 'text-green-600',
    },
    yellow: {
      bg: 'bg-yellow-100',
      icon: 'text-yellow-600',
    },
    // Default fallback jika warna tidak ditemukan
    default: {
      bg: 'bg-gray-100',
      icon: 'text-gray-600',
    }
  };

  const theme = colorVariants[color] || colorVariants.default;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${theme.bg}`}>
          <Icon icon={icon} className={`w-7 h-7 ${theme.icon}`} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
        <p className="text-xs text-gray-500">{trend}</p>
      </div>
    </div>
  );
};

export default KPICard;