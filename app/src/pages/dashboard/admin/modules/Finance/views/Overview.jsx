import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, InputAdornment, MenuItem, TablePagination } from '@mui/material';

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
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon icon="mdi:chart-box" className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Finance Dashboard</h1>
              <p className="text-gray-600">Real-time financial tracking and analytics</p>
            </div>
          </div>
          
          {/* Global Period Filter */}
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
        </div>
      </div>

      {/* Financial Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-white/20 rounded-lg">
              <Icon icon="mdi:trending-up" className="w-8 h-8" />
            </div>
            <Icon icon="mdi:arrow-up" className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{formatCurrency(totalRevenue)}</h3>
          <p className="text-emerald-100 font-medium">Total Revenue</p>
          <p className="text-sm text-emerald-200 mt-2">{filteredIncomeByPeriod.length} transactions</p>
        </div>

        {/* Total Expenses */}
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-white/20 rounded-lg">
              <Icon icon="mdi:trending-down" className="w-8 h-8" />
            </div>
            <Icon icon="mdi:arrow-down" className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{formatCurrency(totalExpense)}</h3>
          <p className="text-rose-100 font-medium">Total Expenses</p>
          <div className="mt-3 bg-white/20 rounded-lg p-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium">Top: {topExpenseCategory.category}</span>
              <span className="font-bold">{topExpenseCategory.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${topExpenseCategory.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Net Profit */}
        <div className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-xl p-6 shadow-lg text-white`}>
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-white/20 rounded-lg">
              <Icon icon="mdi:chart-line" className="w-8 h-8" />
            </div>
            <Icon icon={netProfit >= 0 ? "mdi:check-circle" : "mdi:alert-circle"} className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{formatCurrency(netProfit)}</h3>
          <p className={`${netProfit >= 0 ? 'text-blue-100' : 'text-orange-100'} font-medium`}>Net Profit</p>
          <p className={`text-sm ${netProfit >= 0 ? 'text-blue-200' : 'text-orange-200'} mt-2`}>
            {netProfit >= 0 ? 'Healthy cash flow ✓' : 'Negative cash flow ⚠'}
          </p>
        </div>
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
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-3">
                <div className="flex-1">
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Search by student name..."
                    value={searchIncome}
                    onChange={(e) => setSearchIncome(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="mdi:magnify" width={20} className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
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
                  />
                </div>
                <div className="flex space-x-2">
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
                  <button
                    onClick={handleExportCSV}
                    className="ml-3 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Icon icon="mdi:file-export" className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Income Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Method</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredIncomeData.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No income data found
                        </td>
                      </tr>
                    ) : (
                      filteredIncomeData
                        .slice(incomePage * incomeRowsPerPage, incomePage * incomeRowsPerPage + incomeRowsPerPage)
                        .map(income => (
                        <tr key={income.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-600">{income.date}</td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-800">{income.studentName}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{income.type}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              income.method === 'Transfer' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {income.method}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                            {formatCurrency(income.amount)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                              <Icon icon="mdi:check-circle" className="w-3 h-3 mr-1" />
                              Paid
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <TablePagination
                component="div"
                count={filteredIncomeData.length}
                page={incomePage}
                onPageChange={handleIncomeChangePage}
                rowsPerPage={incomeRowsPerPage}
                onRowsPerPageChange={handleIncomeChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                labelRowsPerPage="Rows per page:"
                sx={{
                  borderTop: '1px solid #e5e7eb',
                  '.MuiTablePagination-toolbar': {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  },
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                    marginBottom: 0,
                    fontSize: '0.875rem',
                  },
                  '.MuiTablePagination-select': {
                    fontSize: '0.875rem',
                  },
                }}
              />
            </div>
          )}

          {/* Expense Tab Content */}
          {activeTab === 'expense' && (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-3">
                <div className="flex-1">
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Search by description..."
                    value={searchExpense}
                    onChange={(e) => setSearchExpense(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="mdi:magnify" width={20} className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
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
                  />
                </div>
                <div className="flex space-x-2">
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
                  <button
                    onClick={() => setShowExpenseModal(true)}
                    className="ml-3 flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Icon icon="mdi:plus-circle" className="w-5 h-5" />
                    <span>Record Expense</span>
                  </button>
                </div>
              </div>

              {/* Expense Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredExpenseData.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No expense data found
                        </td>
                      </tr>
                    ) : (
                      filteredExpenseData
                        .slice(expensePage * expenseRowsPerPage, expensePage * expenseRowsPerPage + expenseRowsPerPage)
                        .map(expense => (
                        <tr key={expense.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-600">{expense.date}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              expense.category === 'Salary' ? 'bg-purple-100 text-purple-700' :
                              expense.category === 'Utilities' ? 'bg-yellow-100 text-yellow-700' :
                              expense.category === 'Equipment' ? 'bg-orange-100 text-orange-700' :
                              expense.category === 'Supplies' ? 'bg-cyan-100 text-cyan-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-800">{expense.description}</td>
                          <td className="px-4 py-3 text-right font-semibold text-rose-600">
                            {formatCurrency(expense.amount)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteExpense(expense.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Expense"
                            >
                              <Icon icon="mdi:delete" className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <TablePagination
                component="div"
                count={filteredExpenseData.length}
                page={expensePage}
                onPageChange={handleExpenseChangePage}
                rowsPerPage={expenseRowsPerPage}
                onRowsPerPageChange={handleExpenseChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                labelRowsPerPage="Rows per page:"
                sx={{
                  borderTop: '1px solid #e5e7eb',
                  '.MuiTablePagination-toolbar': {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  },
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                    marginBottom: 0,
                    fontSize: '0.875rem',
                  },
                  '.MuiTablePagination-select': {
                    fontSize: '0.875rem',
                  },
                }}
              />
            </div>
          )}

          {/* Unpaid Bills Tab Content */}
          {activeTab === 'unpaid' && (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Search by student name..."
                    value={searchUnpaid}
                    onChange={(e) => setSearchUnpaid(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="mdi:magnify" width={20} className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&:hover fieldset': {
                          borderColor: '#f97316',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f97316',
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                </div>
                <div className="ml-3 text-sm text-gray-600">
                  <span className="font-medium">{filteredUnpaidBills.length}</span> outstanding bills
                </div>
              </div>

              {/* Unpaid Bills Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Program</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bill Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUnpaidBills.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          <Icon icon="mdi:check-circle" className="w-12 h-12 mx-auto mb-2 text-green-500" />
                          <p className="font-medium">All payments up to date!</p>
                        </td>
                      </tr>
                    ) : (
                      filteredUnpaidBills
                        .slice(unpaidPage * unpaidRowsPerPage, unpaidPage * unpaidRowsPerPage + unpaidRowsPerPage)
                        .map(bill => {
                        const overdue = isOverdue(bill.dueDate);
                        return (
                          <tr key={bill.id} className={`hover:bg-gray-50 ${overdue ? 'bg-red-50' : ''}`}>
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-800">{bill.studentName}</p>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{bill.program}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{bill.billType}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center text-sm font-medium ${
                                overdue ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {overdue && <Icon icon="mdi:alert-circle" className="w-4 h-4 mr-1" />}
                                {bill.dueDate}
                                {overdue && <span className="ml-2 text-xs">(Overdue)</span>}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-orange-600">
                              {formatCurrency(bill.amount)}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => handleWhatsAppReminder(bill)}
                                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                title="Send WhatsApp Reminder"
                              >
                                <Icon icon="mdi:whatsapp" className="w-5 h-5" />
                                <span className="text-sm font-medium">Remind</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <TablePagination
                component="div"
                count={filteredUnpaidBills.length}
                page={unpaidPage}
                onPageChange={handleUnpaidChangePage}
                rowsPerPage={unpaidRowsPerPage}
                onRowsPerPageChange={handleUnpaidChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                labelRowsPerPage="Rows per page:"
                sx={{
                  borderTop: '1px solid #e5e7eb',
                  '.MuiTablePagination-toolbar': {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  },
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                    marginBottom: 0,
                    fontSize: '0.875rem',
                  },
                  '.MuiTablePagination-select': {
                    fontSize: '0.875rem',
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
