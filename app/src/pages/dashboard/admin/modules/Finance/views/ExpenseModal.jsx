import React from 'react';
import { Icon } from '@iconify/react';
import { TextField, MenuItem } from '@mui/material';

const ExpenseModal = ({
  showExpenseModal,
  setShowExpenseModal,
  expenseForm,
  handleExpenseInputChange,
  formatNumberWithDot,
  parseFormattedNumber,
  handleAddExpense,
  expenseCategories,
}) => {
  if (!showExpenseModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="p-6 border-b border-white bg-rose-600 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <Icon icon="mdi:cash-minus" className="w-6 h-6 text-white" />
              <span className="text-white">Record New Expense</span>
            </h2>
            <button
              onClick={() => setShowExpenseModal(false)}
              className="p-2 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
            >
              <Icon icon="mdi:close" className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-1">
            <TextField
              fullWidth
              type="date"
              label="Date"
              variant="outlined"
              margin="normal"
              required
              value={expenseForm.date}
              onChange={(e) => handleExpenseInputChange('date', e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#f43f5e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e11d48',
                    borderWidth: '2px',
                  },
                },
                '& label.Mui-focused': {
                  color: '#e11d48',
                },
              }}
            />

            <TextField
              select
              fullWidth
              label="Category"
              variant="outlined"
              margin="normal"
              required
              value={expenseForm.category}
              onChange={(e) => handleExpenseInputChange('category', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#f43f5e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e11d48',
                    borderWidth: '2px',
                  },
                },
                '& label.Mui-focused': {
                  color: '#e11d48',
                },
              }}
            >
              <MenuItem value="">Select Category</MenuItem>
              {expenseCategories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              variant="outlined"
              margin="normal"
              required
              placeholder="Enter expense description..."
              value={expenseForm.description}
              onChange={(e) => handleExpenseInputChange('description', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#f43f5e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e11d48',
                    borderWidth: '2px',
                  },
                },
                '& label.Mui-focused': {
                  color: '#e11d48',
                },
              }}
            />

            <TextField
              fullWidth
              type="text"
              label="Amount (IDR)"
              variant="outlined"
              margin="normal"
              required
              placeholder="0"
              value={formatNumberWithDot(expenseForm.amount)}
              onChange={(e) => {
                const rawValue = parseFormattedNumber(e.target.value);
                handleExpenseInputChange('amount', rawValue);
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#f43f5e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e11d48',
                    borderWidth: '2px',
                  },
                },
                '& label.Mui-focused': {
                  color: '#e11d48',
                },
              }}
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowExpenseModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddExpense}
              className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium cursor-pointer"
            >
              Record Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
