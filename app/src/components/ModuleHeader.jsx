import React from 'react';
import { Icon } from '@iconify/react';

const ModuleHeader = ({ icon, iconColor = 'purple', title, description, children }) => {
  // Mapping warna untuk icon background dan text
  const colorVariants = {
    purple: {
      bg: 'bg-purple-100',
      icon: 'text-purple-600',
    },
    blue: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-100',
      icon: 'text-green-600',
    },
    emerald: {
      bg: 'bg-emerald-100',
      icon: 'text-emerald-600',
    },
    orange: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
    },
    red: {
      bg: 'bg-red-100',
      icon: 'text-red-600',
    },
    yellow: {
      bg: 'bg-yellow-100',
      icon: 'text-yellow-600',
    },
    indigo: {
      bg: 'bg-indigo-100',
      icon: 'text-indigo-600',
    },
    // Default fallback
    default: {
      bg: 'bg-gray-100',
      icon: 'text-gray-600',
    }
  };

  const theme = colorVariants[iconColor] || colorVariants.default;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className={`flex items-center ${children ? 'justify-between' : 'space-x-3'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${theme.bg} rounded-lg`}>
            <Icon icon={icon} className={`w-6 h-6 ${theme.icon}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default ModuleHeader;
