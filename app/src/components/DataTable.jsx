import React from 'react';
import { TextField, InputAdornment, TablePagination, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';

const DataTable = ({
  title,
  subtitle,
  searchPlaceholder = "Search...",
  searchQuery,
  onSearchChange,
  filterComponents, // Ini untuk menampung Dropdown filter yang unik tiap halaman
  actionComponent, // Ini opsional, misal tombol "Export Data"
  headerActionComponent, // Action di sebelah kanan title/subtitle
  columns, // Konfigurasi Kolom
  data,
  pagination,
  accentColor="#155DFC"  // Object { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, count }
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* --- HEADER SECTION --- */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          {headerActionComponent && <div>{headerActionComponent}</div>}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar - Only show if searchQuery and onSearchChange are provided */}
          {searchQuery !== undefined && onSearchChange && (
            <div className="flex-1 w-full">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={onSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="mdi:magnify"
                        width={20}
                        className="text-gray-400"
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#f9fafb",
                    "&:hover fieldset": {
                      borderColor: accentColor,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: accentColor,
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            </div>
          )}

          {/* Dynamic Filters & Actions */}
          {(filterComponents || actionComponent) && (
            <div className="flex flex-wrap gap-3 items-center">
              {filterComponents}
              {actionComponent}
            </div>
          )}
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    col.align === "center" ? "text-center" : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <Icon
                    icon="mdi:school-outline"
                    className="w-16 h-16 text-gray-300 mx-auto mb-3"
                  />
                  <p className="text-gray-500 font-medium">No records found</p>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap ${
                        col.align === "center" ? "text-center" : "text-left"
                      }`}
                    >
                      {/* Render custom cell content if provided, else just show text */}
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION SECTION --- */}
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.count}
          page={pagination.page}
          onPageChange={pagination.handleChangePage}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={pagination.handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{
            borderTop: "1px solid #e5e7eb",
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                marginTop: "14px",
                marginBottom: "14px",
              },
          }}
        />
      )}
    </div>
  );
};

export default DataTable;