import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginModal = ({ open, onClose, onSwitchToRegister, onSwitchToForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Email dan kata sandi harus diisi!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
      toast.error(emailError, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Hardcoded credentials
    const credentials = {
      'admin@example.com': 'admin',
      'teacher@example.com': 'teacher',
      'student@example.com': 'student',
    };

    if (credentials[email] && credentials[email] === password) {
      // Success toast
      toast.success("Login berhasil! Selamat datang!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigate based on role
      setTimeout(() => {
        if (email === 'admin@example.com') {
          navigate('/dashboard/admin');
        } else if (email === 'teacher@example.com') {
          navigate('/dashboard/teacher');
        } else if (email === 'student@example.com') {
          navigate('/dashboard/student');
        }
        onClose();
      }, 1000); // Delay navigation to show success toast

    } else {
      // Error toast
      toast.error("Email atau kata sandi salah!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
        sx={{ position: "absolute", right: 16, top: 16, color: "grey.500" }}
      >
        <Icon icon="material-symbols:close" width={24} height={24} />
      </IconButton>
      <DialogContent sx={{ p: 4, width: 350, textAlign: "center" }}>
        <DialogTitle
          sx={{ fontWeight: 700, fontSize: 24, p: 0, mb: 1, color: "#3b82f6" }}
        >
          Masuk
        </DialogTitle>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Masukan email dan kata sandi anda untuk masuk
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
                  <IconButton onClick={handleClickShowPassword} edge="end">
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 400, fontSize: 14 }}
                >
                  Tetap masuk
                </Typography>
              }
            />
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: "none", fontSize: 14, color: "#3b82f6" }}
              onClick={onSwitchToForgotPassword}
            >
              Lupa kata sandi?
            </Button>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: "#3b82f6",
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              fontSize: 16,
              mb: 2,
              border: "2px solid #3b82f6",
              "&:hover": {
                background: "#2563eb",
                color: "#fff",
                border: "2px solid #2563eb",
              },
            }}
          >
            Masuk
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Belum memiliki akun?{" "}
          <Button
            variant="text"
            size="small"
            sx={{
              textTransform: "none",
              color: "#3b82f6",
              fontWeight: 600,
              fontSize: 12,
            }}
            onClick={onSwitchToRegister}
          >
            Buat Akun
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;