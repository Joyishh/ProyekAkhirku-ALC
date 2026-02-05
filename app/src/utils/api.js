// Import axios library
import axios from 'axios';

// ============================================
// 1. SETUP BASE URL
// ============================================
// Ambil URL API dari .env, kalau nggak ada pakai default localhost:3000
// Ini supaya kalau deploy ke production, tinggal ganti .env aja
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ============================================
// 2. BUAT AXIOS INSTANCE (Custom Axios)
// ============================================
// Ini kayak bikin "axios khusus" yang punya settingan sendiri
// Jadi nggak pakai axios biasa, tapi axios yang udah di-custom
const api = axios.create({
  baseURL: API_BASE_URL,  // Semua request otomatis pakai base URL ini
  headers: {
    'Content-Type': 'application/json',  // Default header: data berbentuk JSON
  },
});

// ============================================
// 3. REQUEST INTERCEPTOR
// ============================================
// Ini fungsi yang JALAN OTOMATIS sebelum setiap request dikirim
// Fungsinya: Pasang token ke header Authorization
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    
    // Kalau ada token, pasang ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Return config yang udah dimodifikasi
    return config;
  },
  (error) => {
    // Kalau ada error sebelum request dikirim
    return Promise.reject(error);
  }
);

// ============================================
// 4. RESPONSE INTERCEPTOR
// ============================================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Ambil config request asli untuk pengecekan
    const originalRequest = error.config;

    // Cek apakah error 401
    // DAN pastikan request yang error BUKAN dari endpoint login
    // (Karena kalau login gagal, biarkan LoginModal yang handle errornya, jangan redirect)
    if (error.response?.status === 401 && !originalRequest.url.includes('/auth/login')) {
      
      // Hapus token & user dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect ke Landing Page ('/'), bukan '/login' karena kamu pakai Modal
      // Gunakan window.location agar state benar-benar bersih
      window.location.href = '/'; 
    }
    
    // Tetap reject error agar bisa ditangkap oleh catch() di authService/Components
    return Promise.reject(error);
  }
);

// ============================================
// 5. EXPORT
// ============================================
// Export api supaya bisa dipakai di file lain
export default api;
