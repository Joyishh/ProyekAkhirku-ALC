import React from 'react';
import { Icon } from '@iconify/react';
import KPICard from '../../../../../components/KPICard';

const AdminDashboardModule = () => {
  // KPI Data
  const kpiData = [
    {
      title: 'Active Students',
      value: '284',
      icon: 'mdi:account-group',
      color: 'blue',
      trend: '+12 this month'
    },
    {
      title: 'Pending Registrations',
      value: '18',
      icon: 'mdi:account-clock',
      color: 'orange',
      trend: 'Needs approval'
    },
    {
      title: 'Overdue Payments',
      value: '7',
      icon: 'mdi:alert-circle',
      color: 'red',
      trend: 'Requires action!'
    },
    {
      title: 'Monthly Revenue',
      value: 'Rp 62.4M',
      icon: 'mdi:cash-multiple',
      color: 'emerald',
      trend: '+8% vs last month'
    }
  ];

  // Financial Data - Last 6 Months
  const financialData = [
    { month: 'Jul', income: 45000000, expense: 28000000 },
    { month: 'Aug', income: 52000000, expense: 31000000 },
    { month: 'Sep', income: 48000000, expense: 29000000 },
    { month: 'Oct', income: 58000000, expense: 35000000 },
    { month: 'Nov', income: 61000000, expense: 38000000 },
    { month: 'Dec', income: 62400000, expense: 40000000 }
  ];

  // Calculate max value for chart scaling
  const maxValue = Math.max(
    ...financialData.flatMap(d => [d.income, d.expense])
  );

  // Action Items - Needs Attention Widget (100% Operasional Bimbel)
  const actionItems = [
    {
      id: 1,
      title: '3 New Registrations',
      description: 'Waiting for approval & class assignment',
      icon: 'mdi:account-plus',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-4 border-blue-500',
      actionLabel: 'Review',
      actionColor: 'bg-blue-600 hover:bg-blue-700',
      priority: 'high',
      category: 'Revenue In'
    },
    {
      id: 2,
      title: '5 Overdue Invoices',
      description: 'Payment overdue > 5 days',
      icon: 'mdi:receipt-text-clock',
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-l-4 border-red-500',
      actionLabel: 'Send Reminder',
      actionColor: 'bg-red-600 hover:bg-red-700',
      priority: 'high',
      category: 'Cashflow'
    },
    {
      id: 3,
      title: '3 Students at Risk',
      description: 'Missed 3+ consecutive classes',
      icon: 'mdi:account-alert',
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-l-4 border-amber-500',
      actionLabel: 'Contact Parent',
      actionColor: 'bg-amber-600 hover:bg-amber-700',
      priority: 'high',
      category: 'Customer Care'
    }
  ];

  // Quick Shortcuts
  const shortcuts = [
    {
      title: 'Register New Student',
      icon: 'mdi:account-plus',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Register Student')
    },
    {
      title: 'Broadcast Announcement',
      icon: 'mdi:bullhorn',
      bgColor: 'bg-yellow-600 hover:bg-yellow-700',
      action: () => console.log('Broadcast Announcement')
    },
    {
      title: 'Record Expense',
      icon: 'mdi:calculator',
      bgColor: 'bg-green-600 hover:bg-green-700',
      action: () => console.log('Record Expense')
    }
  ];

  // Format currency to millions
  const formatCurrency = (value) => {
    return `${(value / 1000000).toFixed(1)}M`;
  };

  // Handle action button clicks
  const handleAction = (actionId) => {
    console.log(`Action triggered for item: ${actionId}`);
    alert(`Action ${actionId} clicked!`);
  };

  return (
    <div className="space-y-6">
      {/* Baris 1: Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            color={kpi.color}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Baris 2: Insight & Action (Split View 2:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Financial Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Revenue vs Expenses (Last 6 Months)
          </h2>
          
          {/* CSS-only Bar Chart */}
          <div className="space-y-6">
            {financialData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                  <span>{data.month}</span>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-emerald-500 rounded-sm mr-1"></span>
                      Income: Rp {formatCurrency(data.income)}
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-sm mr-1"></span>
                      Expense: Rp {formatCurrency(data.expense)}
                    </span>
                  </div>
                </div>
                
                {/* Bar Chart */}
                <div className="flex items-center space-x-2">
                  {/* Income Bar */}
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(data.income / maxValue) * 100}%` }}
                    >
                      {(data.income / maxValue) * 100 > 15 && (
                        <span className="text-white text-xs font-semibold">
                          {formatCurrency(data.income)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Expense Bar */}
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(data.expense / maxValue) * 100}%` }}
                    >
                      {(data.expense / maxValue) * 100 > 15 && (
                        <span className="text-white text-xs font-semibold">
                          {formatCurrency(data.expense)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
              <span className="text-gray-600">Revenue (Income)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-600">Operational Expenses</span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Action Required */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Needs Attention</h2>
          
          <div className="space-y-4">
            {actionItems.map((item) => {
              // Map color to icon text color
              const iconColorClass = {
                blue: 'text-blue-600',
                red: 'text-red-600',
                amber: 'text-amber-600',
                green: 'text-green-600',
                orange: 'text-orange-600'
              }[item.color] || 'text-gray-600';

              return (
                <div
                  key={item.id}
                  className={`${item.bgColor} ${item.borderColor} rounded-lg p-4 shadow-sm`}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="mt-0.5">
                      <Icon icon={item.icon} className={`w-5 h-5 ${iconColorClass}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </div>
                <button
                  onClick={() => handleAction(item.id)}
                  className={`w-full ${item.actionColor} text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer`}
                >
                  {item.actionLabel}
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Baris 3: Quick Shortcuts */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shortcuts.map((shortcut, index) => (
            <button
              key={index}
              onClick={shortcut.action}
              className={`${shortcut.bgColor} text-white p-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer`}
            >
              <Icon icon={shortcut.icon} className="w-6 h-6" />
              <span className="font-semibold text-base">{shortcut.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardModule;