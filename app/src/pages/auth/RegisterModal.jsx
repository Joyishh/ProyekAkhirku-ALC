import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import authService from '../../services/authService';

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi username
    if (!username.trim()) {
      toast.error('Username harus diisi!');
      return;
    }
    
    if (username.length < 3) {
      toast.error('Username minimal 3 karakter!');
      return;
    }
    
    if (username.length > 20) {
      toast.error('Username maksimal 20 karakter!');
      return;
    }
    
    // Cek karakter tidak valid di username
    const usernameInvalidChars = /[^a-zA-Z0-9._-]/;
    if (usernameInvalidChars.test(username)) {
      toast.error('Username hanya boleh mengandung huruf, angka, titik (.), garis bawah (_), dan hubung (-)!');
      return;
    }
    
    // Username tidak boleh diawali atau diakhiri dengan karakter khusus
    if (username.startsWith('.') || username.startsWith('_') || username.startsWith('-') ||
        username.endsWith('.') || username.endsWith('_') || username.endsWith('-')) {
      toast.error('Username tidak boleh diawali atau diakhiri dengan titik, garis bawah, atau hubung!');
      return;
    }
    
    if (!email.trim()) {
      toast.error('Email harus diisi!');
      return;
    }
    
    // Validasi email yang lebih ketat
    const validateEmail = (email) => {
      // Cek apakah ada spasi
      if (email.includes(' ')) {
        return 'Email tidak boleh mengandung spasi!';
      }
      
      // Cek jumlah simbol @
      const atCount = (email.match(/@/g) || []).length;
      if (atCount === 0) {
        return 'Email harus mengandung simbol @ sebagai pemisah!';
      }
      if (atCount > 1) {
        return 'Email hanya boleh mengandung satu simbol @!';
      }
      
      // Split email menjadi local-part dan domain
      const [localPart, domain] = email.split('@');
      
      // Validasi local-part (bagian sebelum @)
      if (!localPart || localPart.length === 0) {
        return 'Bagian nama pengguna email tidak boleh kosong!';
      }
      
      // Cek titik di awal atau akhir local-part
      if (localPart.startsWith('.') || localPart.endsWith('.')) {
        return 'Nama pengguna email tidak boleh diawali atau diakhiri dengan titik!';
      }
      
      // Cek dua titik berurutan di local-part
      if (localPart.includes('..')) {
        return 'Nama pengguna email tidak boleh mengandung dua titik berurutan!';
      }
      
      // Cek karakter tidak valid di local-part
      const invalidChars = /[^a-zA-Z0-9._+-]/;
      if (invalidChars.test(localPart)) {
        return 'Nama pengguna email hanya boleh mengandung huruf, angka, titik (.), garis bawah (_), hubung (-), dan plus (+)!';
      }
      
      // Validasi domain
      if (!domain || domain.length === 0) {
        return 'Bagian domain email tidak boleh kosong!';
      }
      
      // Cek format domain minimal
      if (!domain.includes('.')) {
        return 'Domain email harus memiliki ekstensi (contoh: .com, .id)!';
      }
      
      // Cek dua titik berurutan di domain
      if (domain.includes('..')) {
        return 'Domain email tidak boleh mengandung dua titik berurutan!';
      }
      
      // Cek domain tidak boleh diawali dengan tanda hubung
      if (domain.startsWith('-')) {
        return 'Domain email tidak boleh diawali dengan tanda hubung!';
      }
      
      // Cek karakter tidak valid di domain
      const domainInvalidChars = /[^a-zA-Z0-9.-]/;
      if (domainInvalidChars.test(domain)) {
        return 'Domain email hanya boleh mengandung huruf, angka, titik (.), dan hubung (-)!';
      }
      
      // Cek ekstensi domain minimal 2 karakter
      const domainParts = domain.split('.');
      const extension = domainParts[domainParts.length - 1];
      if (extension.length < 2) {
        return 'Ekstensi domain minimal 2 karakter (contoh: .co, .com, .id)!';
      }
      
      return null; // Valid
    };

    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }
    
    if (!password.trim()) {
      toast.error('Kata sandi harus diisi!');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Kata sandi minimal 8 karakter!');
      return;
    }
    
    if (password.length > 50) {
      toast.error('Kata sandi maksimal 50 karakter!');
      return;
    }
    
    // Validasi kompleksitas password
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase) {
      toast.error('Kata sandi harus mengandung minimal satu huruf besar (A-Z)!');
      return;
    }
    
    if (!hasLowerCase) {
      toast.error('Kata sandi harus mengandung minimal satu huruf kecil (a-z)!');
      return;
    }
    
    if (!hasNumbers) {
      toast.error('Kata sandi harus mengandung minimal satu angka (0-9)!');
      return;
    }
    
    if (!hasSpecialChar) {
      toast.error('Kata sandi harus mengandung minimal satu karakter khusus (!@#$%^&*(),.?":{}|<>)!');
      return;
    }
    
    if (!confirmPassword.trim()) {
      toast.error('Konfirmasi kata sandi harus diisi!');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Kata sandi dan konfirmasi tidak sama!');
      return;
    }
    
    // Call API to register
    setIsLoading(true);
    
    try {
      const response = await authService.register(username, email, password, confirmPassword);
      
      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Close modal first to avoid z-index issues
      onClose();
      
      // Show success toast notification
      toast.success(response.message || 'Registrasi berhasil! Silakan login dengan akun Anda.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Wait a bit then switch to login modal
      setTimeout(() => {
        if (onSwitchToLogin) {
          onSwitchToLogin();
        }
      }, 500);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Show error toast (modal still open so user can fix the error)
      toast.error(error.message || 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 4, overflow: "visible", boxShadow: 3 },
      }}
      BackdropProps={{
        sx: { backdropFilter: "blur(8px)" },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        disabled={isLoading}
        sx={{ position: "absolute", right: 16, top: 16, color: "grey.500" }}
      >
        <Icon icon="material-symbols:close" width={24} height={24} />
      </IconButton>
      <DialogContent sx={{ p: 4, width: 350, textAlign: "center" }}>
        <DialogTitle
          sx={{ fontWeight: 700, fontSize: 24, p: 0, color: "#3b82f6" }}
        >
          Daftar Akun
        </DialogTitle>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Silakan isi data di bawah untuk membuat akun baru
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Username"
            type="text"
            placeholder="username"
            fullWidth
            required
            margin="normal"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            placeholder="nama@domain.com"
            fullWidth
            required
            margin="normal"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
          />
          <TextField
            label="Kata Sandi"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 karakter"
            fullWidth
            required
            margin="normal"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClickShowPassword} 
                    edge="end"
                    disabled={isLoading}
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "material-symbols:visibility-off"
                          : "material-symbols:visibility"
                      }
                      width={22}
                      height={22}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Konfirmasi Kata Sandi"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Ulangi kata sandi"
            fullWidth
            required
            margin="normal"
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                    disabled={isLoading}
                  >
                    <Icon
                      icon={
                        showConfirmPassword
                          ? "material-symbols:visibility-off"
                          : "material-symbols:visibility"
                      }
                      width={22}
                      height={22}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              background: "#3b82f6",
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              fontSize: 16,
              mt: 3,
              mb: 2,
              border: "2px solid #3b82f6",
              "&:hover": {
                background: "#2563eb",
                color: "#fff",
                border: "2px solid #2563eb",
              },
              "&:disabled": {
                background: "#93c5fd",
                color: "#fff",
                border: "2px solid #93c5fd",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              'Daftar'
            )}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Sudah punya akun?{" "}
          <Button
            variant="text"
            size="small"
            disabled={isLoading}
            sx={{
              textTransform: "none",
              color: "#3b82f6",
              fontWeight: 600,
              fontSize: 12,
            }}
            onClick={onSwitchToLogin}
          >
            Masuk
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;