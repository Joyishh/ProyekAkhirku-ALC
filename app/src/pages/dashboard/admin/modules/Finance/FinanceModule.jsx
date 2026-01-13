import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Overview from './views/Overview';
import ExpenseModal from './views/ExpenseModal';

const FinanceModule = () => {
  // Global Filter State
  const [selectedPeriod, setSelectedPeriod] = useState('this_month'); // 'this_month' | 'last_month' | 'all_time'
  
  // Tab State
  const [activeTab, setActiveTab] = useState('income'); // 'income' | 'expense' | 'unpaid'
  
  // Modal State
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  
  // Local Filter States
  const [searchIncome, setSearchIncome] = useState('');
  const [filterIncomeType, setFilterIncomeType] = useState('All');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('All');
  
  const [searchExpense, setSearchExpense] = useState('');
  const [filterExpenseCategory, setFilterExpenseCategory] = useState('All');
  
  const [searchUnpaid, setSearchUnpaid] = useState('');
  
  // Form State for Expense
  const [expenseForm, setExpenseForm] = useState({
    date: '',
    category: '',
    description: '',
    amount: ''
  });

  // Pagination State
  const [incomePage, setIncomePage] = useState(0);
  const [incomeRowsPerPage, setIncomeRowsPerPage] = useState(10);
  const [expensePage, setExpensePage] = useState(0);
  const [expenseRowsPerPage, setExpenseRowsPerPage] = useState(10);
  const [unpaidPage, setUnpaidPage] = useState(0);
  const [unpaidRowsPerPage, setUnpaidRowsPerPage] = useState(10);

  // Mock Data: Income Transactions (Student Payments)
  const [incomeData] = useState([
    { id: 1, date: '2025-12-20', studentName: 'Ahmad Pratama', type: 'Registration Fee', amount: 1500000, method: 'Transfer', status: 'paid', phone: '081234567890' },
    { id: 2, date: '2025-12-19', studentName: 'Siti Nurhaliza', type: 'Tuition', amount: 2000000, method: 'Cash', status: 'paid', phone: '081234567891' },
    { id: 3, date: '2025-12-18', studentName: 'Budi Santoso', type: 'Tuition', amount: 1800000, method: 'Transfer', status: 'paid', phone: '081234567892' },
    { id: 4, date: '2025-12-17', studentName: 'Rina Wijaya', type: 'Registration Fee', amount: 1500000, method: 'Transfer', status: 'paid', phone: '081234567893' },
    { id: 5, date: '2025-12-16', studentName: 'Arief Rahman', type: 'Tuition', amount: 2000000, method: 'Cash', status: 'paid', phone: '081234567894' },
    { id: 6, date: '2025-12-15', studentName: 'Dewi Kartika', type: 'Tuition', amount: 1800000, method: 'Transfer', status: 'paid', phone: '081234567810' },
    { id: 7, date: '2025-12-14', studentName: 'Yoga Permana', type: 'Intensive Package', amount: 3500000, method: 'Cash', status: 'paid', phone: '081234567811' },
    { id: 8, date: '2025-12-13', studentName: 'Indah Permatasari', type: 'Tuition', amount: 2000000, method: 'Transfer', status: 'paid', phone: '081234567812' },
    { id: 9, date: '2025-12-12', studentName: 'Rizky Fadillah', type: 'Registration Fee', amount: 1500000, method: 'Cash', status: 'paid', phone: '081234567813' },
    { id: 10, date: '2025-12-11', studentName: 'Mega Wulandari', type: 'Tuition', amount: 1800000, method: 'Transfer', status: 'paid', phone: '081234567814' },
    { id: 11, date: '2025-12-10', studentName: 'Andi Saputra', type: 'Tuition', amount: 2000000, method: 'Transfer', status: 'paid', phone: '081234567815' },
    { id: 12, date: '2025-12-09', studentName: 'Sari Rahayu', type: 'Intensive Package', amount: 3500000, method: 'Cash', status: 'paid', phone: '081234567816' },
    { id: 13, date: '2025-12-08', studentName: 'Fajar Nugroho', type: 'Tuition', amount: 1800000, method: 'Transfer', status: 'paid', phone: '081234567817' },
    { id: 14, date: '2025-12-07', studentName: 'Nina Agustina', type: 'Registration Fee', amount: 1500000, method: 'Transfer', status: 'paid', phone: '081234567818' },
    { id: 15, date: '2025-12-06', studentName: 'Hadi Purnomo', type: 'Tuition', amount: 2000000, method: 'Cash', status: 'paid', phone: '081234567819' },
    { id: 16, date: '2025-11-28', studentName: 'Hendra Wijaya', type: 'Intensive Package', amount: 3500000, method: 'Transfer', status: 'paid', phone: '081234567895' },
    { id: 17, date: '2025-11-27', studentName: 'Lestari Wati', type: 'Tuition', amount: 1800000, method: 'Transfer', status: 'paid', phone: '081234567820' },
    { id: 18, date: '2025-11-26', studentName: 'Eko Prabowo', type: 'Registration Fee', amount: 1500000, method: 'Cash', status: 'paid', phone: '081234567821' },
    { id: 19, date: '2025-11-25', studentName: 'Fitri Handayani', type: 'Tuition', amount: 1800000, method: 'Cash', status: 'paid', phone: '081234567896' },
    { id: 20, date: '2025-11-24', studentName: 'Wahyu Hidayat', type: 'Tuition', amount: 2000000, method: 'Transfer', status: 'paid', phone: '081234567822' },
    { id: 21, date: '2025-11-23', studentName: 'Tuti Susilawati', type: 'Intensive Package', amount: 3500000, method: 'Transfer', status: 'paid', phone: '081234567823' },
    { id: 22, date: '2025-11-22', studentName: 'Bambang Haryanto', type: 'Tuition', amount: 1800000, method: 'Cash', status: 'paid', phone: '081234567824' },
    { id: 23, date: '2025-11-21', studentName: 'Yuni Astuti', type: 'Registration Fee', amount: 1500000, method: 'Transfer', status: 'paid', phone: '081234567825' },
    { id: 24, date: '2025-11-20', studentName: 'Dimas Aditya', type: 'Intensive Package', amount: 3500000, method: 'Transfer', status: 'paid', phone: '081234567897' },
    { id: 25, date: '2025-11-19', studentName: 'Ratna Sari', type: 'Tuition', amount: 2000000, method: 'Cash', status: 'paid', phone: '081234567826' },
    { id: 26, date: '2025-11-18', studentName: 'Agung Setiawan', type: 'Tuition', amount: 1800000, method: 'Transfer', status: 'paid', phone: '081234567827' },
    { id: 27, date: '2025-10-15', studentName: 'Lina Kusuma', type: 'Tuition', amount: 2000000, method: 'Transfer', status: 'paid', phone: '081234567898' },
    { id: 28, date: '2025-10-14', studentName: 'Rudi Hartawan', type: 'Intensive Package', amount: 3500000, method: 'Cash', status: 'paid', phone: '081234567828' },
    { id: 29, date: '2025-10-13', studentName: 'Sri Mulyani', type: 'Registration Fee', amount: 1500000, method: 'Transfer', status: 'paid', phone: '081234567829' },
    { id: 30, date: '2025-10-10', studentName: 'Eko Prasetyo', type: 'Registration Fee', amount: 1500000, method: 'Cash', status: 'paid', phone: '081234567899' }
  ]);

  // Mock Data: Expense Transactions (Operational Costs)
  const [expenseData, setExpenseData] = useState([
    { id: 1, date: '2025-12-20', category: 'Salary', description: 'Teacher Salary - Mrs. Siti', amount: 5000000 },
    { id: 2, date: '2025-12-19', category: 'Utilities', description: 'Electricity Bill December', amount: 800000 },
    { id: 3, date: '2025-12-18', category: 'Equipment', description: 'AC Repair - Room A-101', amount: 1200000 },
    { id: 4, date: '2025-12-17', category: 'Supplies', description: 'Office Stationery Bulk Purchase', amount: 450000 },
    { id: 5, date: '2025-12-16', category: 'Transportation', description: 'Student Field Trip Bus Rental', amount: 2500000 },
    { id: 6, date: '2025-12-15', category: 'Salary', description: 'Teacher Salary - Mr. Joko', amount: 4500000 },
    { id: 7, date: '2025-12-14', category: 'Supplies', description: 'Whiteboard Markers & Papers', amount: 350000 },
    { id: 8, date: '2025-12-13', category: 'Marketing', description: 'Instagram & Facebook Ads Campaign', amount: 750000 },
    { id: 9, date: '2025-12-12', category: 'Utilities', description: 'Internet & WiFi', amount: 500000 },
    { id: 10, date: '2025-12-11', category: 'Equipment', description: 'Laptop for Teacher - Dell Inspiron', amount: 8500000 },
    { id: 11, date: '2025-12-10', category: 'Marketing', description: 'Social Media Ads', amount: 1000000 },
    { id: 12, date: '2025-12-09', category: 'Salary', description: 'Admin Staff Salary - Ms. Rina', amount: 3500000 },
    { id: 13, date: '2025-12-08', category: 'Supplies', description: 'Cleaning Supplies & Sanitizers', amount: 280000 },
    { id: 14, date: '2025-12-07', category: 'Utilities', description: 'Water Bill December', amount: 350000 },
    { id: 15, date: '2025-12-06', category: 'Transportation', description: 'Courier Services - Monthly', amount: 150000 },
    { id: 16, date: '2025-12-05', category: 'Equipment', description: 'Printer Toner & Ink', amount: 650000 },
    { id: 17, date: '2025-12-04', category: 'Marketing', description: 'Google Ads - December', amount: 1200000 },
    { id: 18, date: '2025-12-03', category: 'Salary', description: 'Teacher Salary - Mr. Agus', amount: 4800000 },
    { id: 19, date: '2025-12-02', category: 'Other', description: 'Office Pantry Supplies', amount: 400000 },
    { id: 20, date: '2025-12-01', category: 'Supplies', description: 'Books for Library', amount: 1500000 },
    { id: 21, date: '2025-11-28', category: 'Salary', description: 'Teacher Salary - Mrs. Dewi', amount: 4800000 },
    { id: 22, date: '2025-11-27', category: 'Equipment', description: 'Chairs for Classroom - 20 units', amount: 4000000 },
    { id: 23, date: '2025-11-26', category: 'Utilities', description: 'Gas & Electricity November', amount: 950000 },
    { id: 24, date: '2025-11-25', category: 'Equipment', description: 'Projector Purchase', amount: 3500000 },
    { id: 25, date: '2025-11-24', category: 'Marketing', description: 'Brochure Printing - 1000 pcs', amount: 850000 },
    { id: 26, date: '2025-11-23', category: 'Salary', description: 'Security Guard Salary', amount: 3000000 },
    { id: 27, date: '2025-11-22', category: 'Transportation', description: 'Teacher Transportation Allowance', amount: 1200000 },
    { id: 28, date: '2025-11-21', category: 'Supplies', description: 'Student Learning Materials', amount: 680000 },
    { id: 29, date: '2025-11-20', category: 'Utilities', description: 'Water Bill November', amount: 300000 },
    { id: 30, date: '2025-11-19', category: 'Other', description: 'Building Maintenance - General', amount: 2500000 },
    { id: 31, date: '2025-11-18', category: 'Equipment', description: 'Whiteboard Installation - Room B', amount: 1800000 },
    { id: 32, date: '2025-11-17', category: 'Marketing', description: 'Website Hosting & Domain Renewal', amount: 500000 },
    { id: 33, date: '2025-10-15', category: 'Salary', description: 'Staff Salary - October', amount: 6000000 },
    { id: 34, date: '2025-10-14', category: 'Utilities', description: 'Electricity Bill October', amount: 780000 },
    { id: 35, date: '2025-10-13', category: 'Equipment', description: 'Fire Extinguisher - 5 units', amount: 1250000 },
    { id: 36, date: '2025-10-12', category: 'Supplies', description: 'Paper Ream - 50 boxes', amount: 2000000 },
    { id: 37, date: '2025-10-11', category: 'Transportation', description: 'Monthly Parking Pass', amount: 300000 },
    { id: 38, date: '2025-10-10', category: 'Marketing', description: 'Banner & Flyers', amount: 800000 },
    { id: 39, date: '2025-10-09', category: 'Other', description: 'Insurance Premium - Monthly', amount: 1500000 },
    { id: 40, date: '2025-10-08', category: 'Salary', description: 'Teacher Salary - Mrs. Linda', amount: 4700000 }
  ]);

  // Mock Data: Unpaid Bills / Accounts Receivable
  const [unpaidBills] = useState([
    { id: 1, studentName: 'Rudi Hartono', program: 'Intensive English', billType: 'December Tuition', dueDate: '2025-12-15', amount: 2000000, phone: '081234560001' },
    { id: 2, studentName: 'Sari Wulandari', program: 'Regular Math', billType: 'December Tuition', dueDate: '2025-12-10', amount: 1800000, phone: '081234560002' },
    { id: 3, studentName: 'Joko Susilo', program: 'Advanced Science', billType: 'Registration Fee', dueDate: '2025-12-05', amount: 1500000, phone: '081234560003' },
    { id: 4, studentName: 'Putri Andini', program: 'Intensive English', billType: 'November Tuition', dueDate: '2025-11-20', amount: 2000000, phone: '081234560004' },
    { id: 5, studentName: 'Bambang Kusuma', program: 'Regular Programming', billType: 'December Tuition', dueDate: '2025-12-25', amount: 2200000, phone: '081234560005' },
    { id: 6, studentName: 'Deni Setiawan', program: 'Regular English', billType: 'December Tuition', dueDate: '2025-12-18', amount: 1800000, phone: '081234560006' },
    { id: 7, studentName: 'Maya Anggraini', program: 'Advanced Math', billType: 'Registration Fee', dueDate: '2025-12-08', amount: 1500000, phone: '081234560007' },
    { id: 8, studentName: 'Fauzi Rahman', program: 'Intensive Programming', billType: 'December Tuition', dueDate: '2025-12-12', amount: 3500000, phone: '081234560008' },
    { id: 9, studentName: 'Vina Melati', program: 'Regular Science', billType: 'December Tuition', dueDate: '2025-12-20', amount: 1800000, phone: '081234560009' },
    { id: 10, studentName: 'Herman Wijaya', program: 'Advanced English', billType: 'Registration Fee', dueDate: '2025-12-03', amount: 1500000, phone: '081234560010' },
    { id: 11, studentName: 'Laila Sari', program: 'Intensive Math', billType: 'November Tuition', dueDate: '2025-11-25', amount: 3500000, phone: '081234560011' },
    { id: 12, studentName: 'Tono Sugiarto', program: 'Regular Programming', billType: 'December Tuition', dueDate: '2025-12-28', amount: 2200000, phone: '081234560012' }
  ]);

  // Categories and Types
  const expenseCategories = ['Salary', 'Utilities', 'Equipment', 'Supplies', 'Marketing', 'Transportation', 'Other'];
  const incomeTypes = ['All', 'Tuition', 'Registration Fee', 'Intensive Package'];
  const paymentMethods = ['All', 'Transfer', 'Cash'];

  // Helper: Get date range based on period
  const getDateRange = (period) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (period === 'this_month') {
      const startDate = new Date(currentYear, currentMonth, 1);
      const endDate = new Date(currentYear, currentMonth + 1, 0);
      return { startDate, endDate };
    } else if (period === 'last_month') {
      const startDate = new Date(currentYear, currentMonth - 1, 1);
      const endDate = new Date(currentYear, currentMonth, 0);
      return { startDate, endDate };
    }
    return null; // all_time
  };

  // Filter data by period
  const filterByPeriod = (data, dateField) => {
    if (selectedPeriod === 'all_time') return data;
    
    const { startDate, endDate } = getDateRange(selectedPeriod);
    return data.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  // Filtered Data based on Period
  const filteredIncomeByPeriod = useMemo(() => filterByPeriod(incomeData, 'date'), [incomeData, selectedPeriod]);
  const filteredExpenseByPeriod = useMemo(() => filterByPeriod(expenseData, 'date'), [expenseData, selectedPeriod]);

  // Calculate Financial Stats
  const totalRevenue = filteredIncomeByPeriod.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = filteredExpenseByPeriod.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalRevenue - totalExpense;

  // Calculate Top Expense Category
  const expenseByCategoryData = useMemo(() => {
    const categoryTotals = {};
    filteredExpenseByPeriod.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    
    const sorted = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
    
    return sorted;
  }, [filteredExpenseByPeriod, totalExpense]);

  const topExpenseCategory = expenseByCategoryData[0] || { category: 'N/A', percentage: 0 };

  // Filter Income with local filters
  const filteredIncomeData = useMemo(() => {
    return filteredIncomeByPeriod.filter(income => {
      const matchSearch = income.studentName.toLowerCase().includes(searchIncome.toLowerCase());
      const matchType = filterIncomeType === 'All' || income.type === filterIncomeType;
      const matchMethod = filterPaymentMethod === 'All' || income.method === filterPaymentMethod;
      return matchSearch && matchType && matchMethod;
    });
  }, [filteredIncomeByPeriod, searchIncome, filterIncomeType, filterPaymentMethod]);

  // Filter Expense with local filters
  const filteredExpenseData = useMemo(() => {
    return filteredExpenseByPeriod.filter(expense => {
      const matchSearch = expense.description.toLowerCase().includes(searchExpense.toLowerCase());
      const matchCategory = filterExpenseCategory === 'All' || expense.category === filterExpenseCategory;
      return matchSearch && matchCategory;
    });
  }, [filteredExpenseByPeriod, searchExpense, filterExpenseCategory]);

  // Filter Unpaid Bills
  const filteredUnpaidBills = useMemo(() => {
    return unpaidBills.filter(bill => 
      bill.studentName.toLowerCase().includes(searchUnpaid.toLowerCase())
    );
  }, [unpaidBills, searchUnpaid]);

  // Format Currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format number with thousand separator (dot)
  const formatNumberWithDot = (value) => {
    if (!value) return '';
    // Remove all non-digit characters
    const numericValue = value.toString().replace(/\D/g, '');
    // Format with dot as thousand separator
    return numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  // Parse formatted number to plain number
  const parseFormattedNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\./g, '');
  };

  // Check if date is overdue
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  // Handle WhatsApp Reminder
  const handleWhatsAppReminder = (bill) => {
    const message = `Halo ${bill.studentName}, ini adalah pengingat untuk pembayaran ${bill.billType} sebesar ${formatCurrency(bill.amount)} yang jatuh tempo pada ${bill.dueDate}. Terima kasih.`;
    const whatsappUrl = `https://wa.me/${bill.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle form input change
  const handleExpenseInputChange = (field, value) => {
    setExpenseForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle add expense
  const handleAddExpense = async () => {
    if (!expenseForm.date || !expenseForm.category || !expenseForm.description || !expenseForm.amount) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const result = await Swal.fire({
      title: 'Record Expense?',
      text: `Record expense of ${formatCurrency(parseFloat(expenseForm.amount))} for ${expenseForm.category}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Record It',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      const newExpense = {
        id: expenseData.length + 1,
        date: expenseForm.date,
        category: expenseForm.category,
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount)
      };

      setExpenseData(prev => [newExpense, ...prev]);
      
      setExpenseForm({ date: '', category: '', description: '', amount: '' });
      setShowExpenseModal(false);
      toast.success('Expense recorded successfully!');
    }
  };

  // Handle delete expense
  const handleDeleteExpense = async (expenseId) => {
    const result = await Swal.fire({
      title: 'Delete Expense?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete It',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setExpenseData(prev => prev.filter(e => e.id !== expenseId));
      toast.success('Expense deleted successfully!');
    }
  };

  // Handle export CSV
  const handleExportCSV = () => {
    alert('CSV Export: This will download a CSV file with filtered data');
  };

  // Pagination Handlers
  const handleIncomeChangePage = (event, newPage) => {
    setIncomePage(newPage);
  };

  const handleIncomeChangeRowsPerPage = (event) => {
    setIncomeRowsPerPage(parseInt(event.target.value, 10));
    setIncomePage(0);
  };

  const handleExpenseChangePage = (event, newPage) => {
    setExpensePage(newPage);
  };

  const handleExpenseChangeRowsPerPage = (event) => {
    setExpenseRowsPerPage(parseInt(event.target.value, 10));
    setExpensePage(0);
  };

  const handleUnpaidChangePage = (event, newPage) => {
    setUnpaidPage(newPage);
  };

  const handleUnpaidChangeRowsPerPage = (event) => {
    setUnpaidRowsPerPage(parseInt(event.target.value, 10));
    setUnpaidPage(0);
  };

  return (
    <>
      <Overview
        // Period filter
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        
        // Tab state
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        
        // Search and filter states
        searchIncome={searchIncome}
        setSearchIncome={setSearchIncome}
        filterIncomeType={filterIncomeType}
        setFilterIncomeType={setFilterIncomeType}
        filterPaymentMethod={filterPaymentMethod}
        setFilterPaymentMethod={setFilterPaymentMethod}
        searchExpense={searchExpense}
        setSearchExpense={setSearchExpense}
        filterExpenseCategory={filterExpenseCategory}
        setFilterExpenseCategory={setFilterExpenseCategory}
        searchUnpaid={searchUnpaid}
        setSearchUnpaid={setSearchUnpaid}
        
        // Modal control
        setShowExpenseModal={setShowExpenseModal}
        
        // Data
        filteredIncomeByPeriod={filteredIncomeByPeriod}
        filteredIncomeData={filteredIncomeData}
        filteredExpenseData={filteredExpenseData}
        filteredUnpaidBills={filteredUnpaidBills}
        unpaidBills={unpaidBills}
        
        // Financial stats
        totalRevenue={totalRevenue}
        totalExpense={totalExpense}
        netProfit={netProfit}
        topExpenseCategory={topExpenseCategory}
        
        // Functions
        formatCurrency={formatCurrency}
        handleExportCSV={handleExportCSV}
        handleDeleteExpense={handleDeleteExpense}
        handleWhatsAppReminder={handleWhatsAppReminder}
        isOverdue={isOverdue}
        
        // Constants
        incomeTypes={incomeTypes}
        paymentMethods={paymentMethods}
        expenseCategories={expenseCategories}
        
        // Pagination
        incomePage={incomePage}
        incomeRowsPerPage={incomeRowsPerPage}
        handleIncomeChangePage={handleIncomeChangePage}
        handleIncomeChangeRowsPerPage={handleIncomeChangeRowsPerPage}
        expensePage={expensePage}
        expenseRowsPerPage={expenseRowsPerPage}
        handleExpenseChangePage={handleExpenseChangePage}
        handleExpenseChangeRowsPerPage={handleExpenseChangeRowsPerPage}
        unpaidPage={unpaidPage}
        unpaidRowsPerPage={unpaidRowsPerPage}
        handleUnpaidChangePage={handleUnpaidChangePage}
        handleUnpaidChangeRowsPerPage={handleUnpaidChangeRowsPerPage}
      />
      
      <ExpenseModal
        showExpenseModal={showExpenseModal}
        setShowExpenseModal={setShowExpenseModal}
        expenseForm={expenseForm}
        handleExpenseInputChange={handleExpenseInputChange}
        formatNumberWithDot={formatNumberWithDot}
        parseFormattedNumber={parseFormattedNumber}
        handleAddExpense={handleAddExpense}
        expenseCategories={expenseCategories}
      />
    </>
  );
};

export default FinanceModule;
