import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const PaymentForm = ({
  uploadedFile,
  isDragging,
  isConfirmed,
  copiedAccount,
  selectedPackage,
  setUploadedFile,
  setIsDragging,
  setIsConfirmed,
  setCopiedAccount,
  onBack,
  onConfirm
}) => {
  const fileInputRef = useRef(null);

  const bankAccounts = [
    {
      id: 'bca',
      name: 'BCA',
      color: 'text-blue-600',
      accountNumber: '8273 9928 1123',
      accountName: 'Ababil Learning Center'
    },
    {
      id: 'mandiri',
      name: 'Mandiri',
      color: 'text-yellow-600',
      accountNumber: '123 00 998877 66',
      accountName: 'Ababil Learning Center'
    }
  ];

  const handleCopyAccount = (accountNumber, accountId) => {
    const cleanNumber = accountNumber.replace(/\s/g, '');
    navigator.clipboard.writeText(cleanNumber);
    setCopiedAccount(accountId);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.');
      return;
    }

    if (file.size > maxSize) {
      alert('Ukuran file maksimal 5MB.');
      return;
    }

    setUploadedFile(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirm = async () => {
    if (!uploadedFile) {
      alert('Silakan upload bukti pembayaran terlebih dahulu.');
      return;
    }
    if (!isConfirmed) {
      alert('Silakan centang konfirmasi bahwa bukti pembayaran yang diunggah adalah sah.');
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Konfirmasi Pembayaran',
      text: 'Apakah pembayaran yang Anda lakukan sudah benar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#135bec',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Sudah Benar',
      cancelButtonText: 'Periksa Kembali',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      toast.success('Pendaftaran dan pembayaran berhasil dikirim! Menunggu verifikasi admin.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      onConfirm({ file: uploadedFile });
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const packagePrice = 500000;
  const adminFee = 0;
  const totalPrice = packagePrice + adminFee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pembayaran Pendaftaran</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Silakan selesaikan pembayaran untuk mengaktifkan akun dan memulai proses pendaftaran Anda.
        </p>
      </div>

      {/* Divider */}
      <hr className="border-blue-200 mb-6" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Content - col-span-8 */}
        <div className="lg:col-span-8 space-y-6">
          {/* QRIS Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="mdi:qrcode-scan" className="w-5 h-5 text-[#135bec]" />
              <h2 className="text-lg font-semibold text-[#111318]">Pembayaran via QRIS</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QRIS-LEARNING-CENTER-500000"
                    alt="QRIS Code"
                    className="w-36 h-36 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">NMID: ID1020030040</p>
              </div>

              {/* Instructions */}
              <div className="flex-1">
                <p className="font-medium text-gray-700 mb-3">Cara Pembayaran:</p>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="font-medium text-gray-700">1.</span>
                    <span>Buka aplikasi e-wallet atau mobile banking Anda (BCA Mobile, Livin by Mandiri, GoPay, OVO, Dana, dll).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-gray-700">2.</span>
                    <span>Pilih menu <strong>Scan QRIS</strong> atau <strong>Bayar</strong>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-gray-700">3.</span>
                    <span>Scan kode QR di samping.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-gray-700">4.</span>
                    <span>Pastikan nama penerima adalah <strong>Ababil Learning Center</strong>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-gray-700">5.</span>
                    <span>Masukkan nominal pembayaran sebesar <strong>Rp {formatCurrency(totalPrice)}</strong>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-gray-700">6.</span>
                    <span>Selesaikan transaksi dan simpan bukti pembayaran.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Transfer Bank Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="mdi:bank" className="w-5 h-5 text-[#135bec]" />
              <h2 className="text-lg font-semibold text-[#111318]">Transfer Bank Manual</h2>
            </div>

            <div className="space-y-4">
              {bankAccounts.map((bank) => (
                <div
                  key={bank.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${bank.color}`}>{bank.name}</span>
                    <div>
                      <p className="text-xs text-gray-500">Nomor Rekening</p>
                      <p className="font-semibold text-[#111318] tracking-wide">{bank.accountNumber}</p>
                      <p className="text-xs text-gray-500">a.n {bank.accountName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyAccount(bank.accountNumber, bank.id)}
                    className="flex items-center gap-1 text-[#135bec] hover:text-[#0f4ed8] font-medium text-sm transition-colors cursor-pointer"
                  >
                    <Icon icon="mdi:content-copy" className="w-4 h-4" />
                    {copiedAccount === bank.id ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:file-upload-outline" className="w-5 h-5 text-[#135bec]" />
                <h2 className="text-lg font-semibold text-[#111318]">Konfirmasi Pembayaran</h2>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                Wajib
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">Upload Bukti Transfer/Screenshot</p>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#135bec] bg-blue-50'
                  : uploadedFile
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-[#135bec] hover:bg-blue-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile ? (
                <div className="space-y-2">
                  <Icon icon="mdi:check-circle" className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="font-medium text-green-700">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                  >
                    Hapus File
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Icon icon="mdi:cloud-upload" className="w-12 h-12 text-[#135bec] mx-auto" />
                  <p className="font-medium text-gray-700">
                    Klik untuk upload atau drag & drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Pastikan foto bukti transfer terlihat jelas, mencakup tanggal, nominal, dan nomor referensi.
                  </p>
                  <p className="text-xs text-gray-400">JPG, PNG, PDF (Max. 5MB)</p>
                </div>
              )}
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-start gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#135bec] border-gray-300 rounded focus:ring-[#135bec] cursor-pointer"
              />
              <span className="text-sm text-gray-600">
                Saya menyatakan bahwa bukti pembayaran yang diunggah adalah sah.
              </span>
            </label>
          </div>
        </div>

        {/* Right Sidebar - col-span-4 */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#111318] mb-4">Ringkasan Pembayaran</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Biaya Pendaftaran</p>
                    <p className="text-xs text-gray-400">
                      {selectedPackage?.name || 'Registrasi Peserta Didik Baru'}
                    </p>
                  </div>
                  <p className="font-medium text-[#111318]">Rp {formatCurrency(packagePrice)}</p>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="font-medium text-[#111318]">Rp {formatCurrency(packagePrice)}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Admin Fee</p>
                  <p className="font-medium text-green-600">Gratis</p>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[#111318]">Total Bayar Sekarang</p>
                    <p className="text-2xl font-bold text-[#135bec]">
                      Rp {formatCurrency(totalPrice)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Alert Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-2">
                  <Icon icon="mdi:information" className="w-5 h-5 text-[#135bec] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#135bec]">
                    <span className="font-semibold">Mohon lakukan pembayaran sebelum 1x24 jam.</span>{' '}
                    Jika tidak, pendaftaran Anda akan dibatalkan otomatis oleh sistem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row w-full gap-3 md:gap-4">
          <button
            onClick={onBack}
            className="w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer flex items-center justify-center"
          >
            Kembali
          </button>
          <button
            onClick={handleConfirm}
            disabled={!uploadedFile || !isConfirmed}
            className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
              uploadedFile && isConfirmed
                ? 'bg-[#135bec] text-white hover:bg-[#0f4ed8] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Icon icon="mdi:check-circle" className="w-4 h-4 mr-2" />
            Konfirmasi & Selesaikan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;