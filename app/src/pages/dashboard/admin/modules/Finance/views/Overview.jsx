import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, InputAdornment, MenuItem, TablePagination } from '@mui/material';
import KPICard from '../../../../../../components/KPICard';
import ModuleHeader from '../../../../../../components/ModuleHeader';
import DataTable from '../../../../../../components/DataTable';

const Overview = ({
  // Period filter
  selectedPeriod,
  setSelectedPeriod,
  
  // Tab state
  activeTab,
  setActiveTab,
  
  // Search and filter states
  searchIncome,
  setSearchIncome,
  filterIncomeType,
  setFilterIncomeType,
  filterPaymentMethod,
  setFilterPaymentMethod,
  searchExpense,
  setSearchExpense,
  filterExpenseCategory,
  setFilterExpenseCategory,
  searchUnpaid,
  setSearchUnpaid,
  
  // Modal control
  setShowExpenseModal,
  
  // Data
  filteredIncomeByPeriod,
  filteredIncomeData,
  filteredExpenseData,
  filteredUnpaidBills,
  unpaidBills,
  
  // Financial stats
  totalRevenue,
  totalExpense,
  netProfit,
  topExpenseCategory,
  
  // Functions
  formatCurrency,
  handleExportCSV,
  handleDeleteExpense,
  handleWhatsAppReminder,
  isOverdue,
  
  // Constants
  incomeTypes,
  paymentMethods,
  expenseCategories,
  
  // Pagination
  incomePage,
  incomeRowsPerPage,
  handleIncomeChangePage,
  handleIncomeChangeRowsPerPage,
  expensePage,
  expenseRowsPerPage,
  handleExpenseChangePage,
  handleExpenseChangeRowsPerPage,
  unpaidPage,
  unpaidRowsPerPage,
  handleUnpaidChangePage,
  handleUnpaidChangeRowsPerPage,
}) => {
  return (
    <div className="space-y-6">
      {/* Module Header */}
      <ModuleHeader
        icon="mdi:chart-box"
        iconColor="green"
        title="Finance Dashboard"
        description="Real-time financial tracking and analytics"
      >
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600">Period:</span>
          <TextField
            select
            size="small"
            variant="outlined"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            sx={{
              minWidth: '150px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#10b981',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10b981',
                  borderWidth: '2px',
                },
              },
            }}
          >
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="last_month">Last Month</MenuItem>
            <MenuItem value="all_time">All Time</MenuItem>
          </TextField>
        </div>
      </ModuleHeader>

      {/* Financial Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon="mdi:trending-up"
          color="emerald"
          trend={`${filteredIncomeByPeriod.length} transactions`}
        />
        <KPICard
          title="Total Expenses"
          value={formatCurrency(totalExpense)}
          icon="mdi:trending-down"
          color="red"
          trend={`Top: ${topExpenseCategory.category} (${topExpenseCategory.percentage.toFixed(1)}%)`}
        />
        <KPICard
          title="Net Profit"
          value={formatCurrency(netProfit)}
          icon="mdi:chart-line"
          color={netProfit >= 0 ? 'blue' : 'orange'}
          trend={netProfit >= 0 ? 'Healthy cash flow ✓' : 'Negative cash flow ⚠'}
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('income')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'income'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50 rounded-tl-xl'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-tl-xl'
              }`}
              style={{ borderTopLeftRadius: '0.75rem' }}
            >
              <div className="flex items-center justify-center space-x-2 cursor-pointer">
                <Icon icon="mdi:cash-plus" className="w-5 h-5" />
                <span>Income History</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('expense')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'expense'
                  ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2 cursor-pointer">
                <Icon icon="mdi:cash-minus" className="w-5 h-5" />
                <span>Operational Expenses</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('unpaid')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'unpaid'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50 rounded-tr-xl'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-tr-xl'
              }`}
              style={{ borderTopRightRadius: '0.75rem' }}
            >
              <div className="flex items-center justify-center space-x-2 cursor-pointer">
                <Icon icon="mdi:alert-circle" className="w-5 h-5" />
                <span>Unpaid Bills</span>
                {unpaidBills.length > 0 && (
                  <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unpaidBills.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Content View */}
        <div className="p-6">
          {/* Income Tab Content */}
          {activeTab === 'income' && (
            <DataTable
              title=""
              searchPlaceholder="Search by student name..."
              accentColor="#10b981"
              searchQuery={searchIncome}
              onSearchChange={(e) => setSearchIncome(e.target.value)}
              filterComponents={
                <>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    value={filterIncomeType}
                    onChange={(e) => setFilterIncomeType(e.target.value)}
                    sx={{
                      minWidth: '180px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&:hover fieldset': {
                          borderColor: '#10b981',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#10b981',
                          borderWidth: '2px',
                        },
                      },
                    }}
                  >
                    {incomeTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    value={filterPaymentMethod}
                    onChange={(e) => setFilterPaymentMethod(e.target.value)}
                    sx={{
                      minWidth: '140px',
                      marginLeft: '12px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&:hover fieldset': {
                          borderColor: '#10b981',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#10b981',
                          borderWidth: '2px',
                        },
                      },
                    }}
                  >
                    {paymentMethods.map(method => (
                      <MenuItem key={method} value={method}>{method}</MenuItem>
                    ))}
                  </TextField>
                </>
              }
              actionComponent={
                <button
                  onClick={handleExportCSV}
                  className="ml-3 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="mdi:file-export" className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              }
              columns={[
                {
                  header: "Date",
                  align: "left",
                  render: (income) => <span className="text-sm text-gray-600">{income.date}</span>,
                },
                {
                  header: "Student",
                  align: "left",
                  render: (income) => <p className="font-medium text-gray-800">{income.studentName}</p>,
                },
                {
                  header: "Type",
                  align: "left",
                  render: (income) => <span className="text-sm text-gray-600">{income.type}</span>,
                },
                {
                  header: "Method",
                  align: "left",
                  render: (income) => (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      income.method === 'Transfer' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {income.method}
                    </span>
                  ),
                },
                {
                  header: "Amount",
                  align: "right",
                  render: (income) => (
                    <span className="font-semibold text-emerald-600">{formatCurrency(income.amount)}</span>
                  ),
                },
                {
                  header: "Status",
                  align: "center",
                  render: (income) => (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      <Icon icon="mdi:check-circle" className="w-3 h-3 mr-1" />
                      Paid
                    </span>
                  ),
                },
              ]}
              data={filteredIncomeData.slice(incomePage * incomeRowsPerPage, incomePage * incomeRowsPerPage + incomeRowsPerPage)}
              pagination={{
                count: filteredIncomeData.length,
                page: incomePage,
                rowsPerPage: incomeRowsPerPage,
                handleChangePage: handleIncomeChangePage,
                handleChangeRowsPerPage: handleIncomeChangeRowsPerPage,
              }}
            />
          )}

          {/* Expense Tab Content */}
          {activeTab === 'expense' && (
            <DataTable
              title=""
              searchPlaceholder="Search by description..."
              searchQuery={searchExpense}
              onSearchChange={(e) => setSearchExpense(e.target.value)}
              filterComponents={
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  value={filterExpenseCategory}
                  onChange={(e) => setFilterExpenseCategory(e.target.value)}
                  sx={{
                    minWidth: '180px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#f43f5e',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#f43f5e',
                        borderWidth: '2px',
                      },
                    },
                  }}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  {expenseCategories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </TextField>
              }
              actionComponent={
                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="ml-3 flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Icon icon="mdi:plus-circle" className="w-5 h-5" />
                  <span>Record Expense</span>
                </button>
              }
              columns={[
                {
                  header: "Date",
                  align: "left",
                  render: (expense) => <span className="text-sm text-gray-600">{expense.date}</span>,
                },
                {
                  header: "Category",
                  align: "left",
                  render: (expense) => (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      expense.category === 'Salary' ? 'bg-purple-100 text-purple-700' :
                      expense.category === 'Utilities' ? 'bg-yellow-100 text-yellow-700' :
                      expense.category === 'Equipment' ? 'bg-orange-100 text-orange-700' :
                      expense.category === 'Supplies' ? 'bg-cyan-100 text-cyan-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {expense.category}
                    </span>
                  ),
                },
                {
                  header: "Description",
                  align: "left",
                  render: (expense) => <span className="text-sm text-gray-800">{expense.description}</span>,
                },
                {
                  header: "Amount",
                  align: "right",
                  render: (expense) => (
                    <span className="font-semibold text-rose-600">{formatCurrency(expense.amount)}</span>
                  ),
                },
                {
                  header: "Actions",
                  align: "center",
                  render: (expense) => (
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Expense"
                    >
                      <Icon icon="mdi:delete" className="w-5 h-5" />
                    </button>
                  ),
                },
              ]}
              data={filteredExpenseData.slice(expensePage * expenseRowsPerPage, expensePage * expenseRowsPerPage + expenseRowsPerPage)}
              pagination={{
                count: filteredExpenseData.length,
                page: expensePage,
                rowsPerPage: expenseRowsPerPage,
                handleChangePage: handleExpenseChangePage,
                handleChangeRowsPerPage: handleExpenseChangeRowsPerPage,
              }}
            />
          )}

          {/* Unpaid Bills Tab Content */}
          {activeTab === 'unpaid' && (
            <DataTable
              title=""
              subtitle={`${filteredUnpaidBills.length} outstanding bills`}
              searchPlaceholder="Search by student name..."
              searchQuery={searchUnpaid}
              onSearchChange={(e) => setSearchUnpaid(e.target.value)}
              columns={[
                  {
                    header: "Student Name",
                    align: "left",
                    render: (bill) => <p className="font-medium text-gray-800">{bill.studentName}</p>,
                  },
                  {
                    header: "Program",
                    align: "left",
                    render: (bill) => <span className="text-sm text-gray-600">{bill.program}</span>,
                  },
                  {
                    header: "Bill Type",
                    align: "left",
                    render: (bill) => <span className="text-sm text-gray-600">{bill.billType}</span>,
                  },
                  {
                    header: "Due Date",
                    align: "left",
                    render: (bill) => {
                      const overdue = isOverdue(bill.dueDate);
                      return (
                        <span className={`inline-flex items-center text-sm font-medium ${
                          overdue ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {overdue && <Icon icon="mdi:alert-circle" className="w-4 h-4 mr-1" />}
                          {bill.dueDate}
                          {overdue && <span className="ml-2 text-xs">(Overdue)</span>}
                        </span>
                      );
                    },
                  },
                  {
                    header: "Amount",
                    align: "right",
                    render: (bill) => (
                      <span className="font-semibold text-orange-600">{formatCurrency(bill.amount)}</span>
                    ),
                  },
                  {
                    header: "Action",
                    align: "center",
                    render: (bill) => (
                      <button
                        onClick={() => handleWhatsAppReminder(bill)}
                        className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        title="Send WhatsApp Reminder"
                      >
                        <Icon icon="mdi:whatsapp" className="w-5 h-5" />
                        <span className="text-sm font-medium">Remind</span>
                      </button>
                    ),
                  },
                ]}
                data={filteredUnpaidBills.slice(unpaidPage * unpaidRowsPerPage, unpaidPage * unpaidRowsPerPage + unpaidRowsPerPage)}
                pagination={{
                  count: filteredUnpaidBills.length,
                  page: unpaidPage,
                  rowsPerPage: unpaidRowsPerPage,
                  handleChangePage: handleUnpaidChangePage,
                  handleChangeRowsPerPage: handleUnpaidChangeRowsPerPage,
                }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
