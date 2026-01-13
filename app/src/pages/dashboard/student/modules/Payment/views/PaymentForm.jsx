import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const PaymentForm = ({ bill, isLoading, onCancel, onSubmit }) => {
  // --- LOCAL UI STATE ---
  const [paymentMethod, setPaymentMethod] = useState('transfer'); // 'transfer' | 'qris'
  const [paymentProof, setPaymentProof] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);
  
  const fileInputRef = useRef(null);

  // --- DERIVED DATA FROM BILL ---
  const selectedPackage = { price: bill.amount - 50000 };
  const moduleFee = 50000;
  const totalPayment = bill.amount;

  const bankAccounts = [
    { id: 'bca', name: 'Bank BCA', accountNumber: '827399281123', accountName: 'Ababil Learning Center' },
    { id: 'mandiri', name: 'Bank Mandiri', accountNumber: '1230099887766', accountName: 'Ababil Learning Center' }
  ];

  // --- HELPER FUNCTIONS ---
  const formatCurrency = (val) => new Intl.NumberFormat('id-ID').format(val);

  // --- HANDLERS ---
  const handleCopyAccount = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const validateAndSetFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      alert('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.');
      return;
    }

    if (file.size > maxSize) {
      alert('Ukuran file maksimal 2MB.');
      return;
    }

    setPaymentProof(file);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setPaymentProof(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaymentSubmit = async () => {
    // Validate locally
    if (!paymentProof) {
      alert('Silakan upload bukti pembayaran terlebih dahulu.');
      return;
    }

    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Konfirmasi Pembayaran',
      html: `
        <div class="text-left">
          <p class="mb-2">Apakah Anda yakin data pembayaran sudah benar?</p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Metode: <strong>${paymentMethod === 'transfer' ? 'Transfer Bank' : 'QRIS'}</strong></li>
            <li>• Bukti: <strong>${paymentProof.name}</strong></li>
            <li>• Total: <strong>Rp ${formatCurrency(totalPayment)}</strong></li>
          </ul>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#135bec',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Kirim',
      cancelButtonText: 'Periksa Kembali',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // Show success toast notification
      toast.success('Bukti pembayaran berhasil dikirim! Menunggu verifikasi admin.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      // Pass data to parent for processing
      onSubmit({ paymentMethod, paymentProof });
    }
  };

  // --- RETURN UI (Sesuai kode kamu) ---
  return (
    <div className="space-y-6 animate-fade-in">
       {/* Tombol Back Tambahan untuk UX */}
       <button onClick={onCancel} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
        <Icon icon="mdi:arrow-left" className="w-5 h-5" /> Kembali
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111318]">Pembayaran Bulanan</h1>
        <p className="text-gray-500 mt-1">
          Selesaikan pembayaran SPP bulan ini sebelum tanggal jatuh tempo untuk menghindari denda.
        </p>
      </div>

      <hr className="border-blue-200 mb-6" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - span 2 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {/* Billing Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tagihan Bulan Ini</p>
                <h2 className="text-xl font-bold text-[#111318]">
                  {bill.month}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Jatuh Tempo</p>
                <div className="flex items-center gap-1 text-[#135bec]">
                  <Icon icon="mdi:calendar-clock" className="w-4 h-4" />
                  <span className="font-semibold text-sm">{bill.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya SPP Reguler</span>
                <span className="font-medium text-[#111318]">Rp {formatCurrency(selectedPackage.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Modul Tambahan</span>
                <span className="font-medium text-[#111318]">Rp {formatCurrency(moduleFee)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#111318]">Total Pembayaran</span>
                  <span className="text-2xl font-bold text-[#135bec]">Rp {formatCurrency(totalPayment)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#111318] mb-4">Pilih Metode Pembayaran</h3>

            <div className="space-y-4">
              {/* Transfer Bank Option */}
              <label 
                className={`block cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  paymentMethod === 'transfer' 
                    ? 'border-[#135bec] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 w-4 h-4 text-[#135bec] border-gray-300 focus:ring-[#135bec]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#111318]">Transfer Bank</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">BCA</span>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">MANDIRI</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Transfer manual ke rekening bank kami. Anda perlu mengunggah bukti bayar.
                    </p>

                    {/* Transfer Details (shown when selected) */}
                    {paymentMethod === 'transfer' && (
                      <div className="mt-4 space-y-4">
                        {bankAccounts.map((bank) => (
                          <div key={bank.id} className="bg-white rounded-lg border border-gray-200 p-4">
                            <p className="text-xs text-gray-500">{bank.name}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-lg font-bold text-[#111318] tracking-wide">{bank.accountNumber}</p>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCopyAccount(bank.accountNumber, bank.id);
                                }}
                                className="flex items-center gap-1 text-[#135bec] hover:text-[#0f4ed8] font-medium text-sm transition-colors"
                              >
                                <Icon icon="mdi:content-copy" className="w-4 h-4" />
                                {copiedAccount === bank.id ? 'TERSALIN!' : 'SALIN'}
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">a.n. {bank.accountName}</p>
                          </div>
                        ))}

                        {/* Instructions */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Instruksi:</p>
                          <ol className="text-sm text-gray-600 space-y-1">
                            <li>1. Lakukan transfer sesuai nominal tagihan (<strong>Rp {formatCurrency(totalPayment)}</strong>).</li>
                            <li>2. Simpan bukti transaksi / struk transfer.</li>
                            <li>3. Unggah bukti transaksi pada kolom di sebelah kanan.</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </label>

              {/* QRIS Option */}
              <label 
                className={`block cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  paymentMethod === 'qris' 
                    ? 'border-[#135bec] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="qris"
                    checked={paymentMethod === 'qris'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 w-4 h-4 text-[#135bec] border-gray-300 focus:ring-[#135bec]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#111318]">QRIS</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">INSTANT</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Scan QR code menggunakan GoPay, OVO, Dana, ShopeePay. Verifikasi otomatis.
                    </p>

                    {/* QRIS Details (shown when selected) */}
                    {paymentMethod === 'qris' && (
                      <div className="mt-4 flex flex-col items-center">
                        <div className="w-48 h-48 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-2">
                           <Icon icon="mdi:qrcode-scan" className="w-40 h-40 text-gray-800" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Scan dengan aplikasi e-wallet</p>
                      </div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - span 1 (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#111318] mb-2">Konfirmasi Pembayaran</h3>
              <p className="text-sm text-gray-500 mb-4">
                Unggah bukti transfer Anda di sini untuk menyelesaikan pembayaran.
              </p>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#135bec] bg-blue-50'
                    : paymentProof
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

                {paymentProof ? (
                  <div className="space-y-2">
                    <Icon icon="mdi:check-circle" className="w-10 h-10 text-green-500 mx-auto" />
                    <p className="font-medium text-green-700 text-sm truncate">{paymentProof.name}</p>
                    <p className="text-xs text-gray-500">
                      {(paymentProof.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Hapus File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon icon="mdi:cloud-upload" className="w-10 h-10 text-[#135bec] mx-auto" />
                    <p className="font-medium text-gray-700 text-sm">
                      Klik untuk unggah
                    </p>
                    <p className="text-xs text-gray-400">JPG, PNG, PDF (Maks. 2MB)</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handlePaymentSubmit}
                  disabled={!paymentProof || isLoading}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors ${
                    paymentProof && !isLoading
                      ? 'bg-[#135bec] text-white hover:bg-[#0f4ed8]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:send" className="w-5 h-5" />
                      Kirim Bukti Pembayaran
                    </>
                  )}
                </button>

                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;