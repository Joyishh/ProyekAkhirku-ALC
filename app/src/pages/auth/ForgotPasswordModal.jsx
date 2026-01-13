import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ open, onClose, onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi email
    if (!email.trim()) {
      toast.error("Email harus diisi!");
      setError("Email harus diisi");
      return;
    }

    // Validasi email yang lebih ketat
    const validateEmail = (email) => {
      // Cek apakah ada spasi
      if (email.includes(" ")) {
        return "Email tidak boleh mengandung spasi!";
      }

      // Cek jumlah simbol @
      const atCount = (email.match(/@/g) || []).length;
      if (atCount === 0) {
        return "Email harus mengandung simbol @ sebagai pemisah!";
      }
      if (atCount > 1) {
        return "Email hanya boleh mengandung satu simbol @!";
      }

      // Split email menjadi local-part dan domain
      const [localPart, domain] = email.split("@");

      // Validasi local-part (bagian sebelum @)
      if (!localPart || localPart.length === 0) {
        return "Bagian nama pengguna email tidak boleh kosong!";
      }

      // Cek titik di awal atau akhir local-part
      if (localPart.startsWith(".") || localPart.endsWith(".")) {
        return "Nama pengguna email tidak boleh diawali atau diakhiri dengan titik!";
      }

      // Cek dua titik berurutan di local-part
      if (localPart.includes("..")) {
        return "Nama pengguna email tidak boleh mengandung dua titik berurutan!";
      }

      // Cek karakter tidak valid di local-part
      const invalidChars = /[^a-zA-Z0-9._+-]/;
      if (invalidChars.test(localPart)) {
        return "Nama pengguna email hanya boleh mengandung huruf, angka, titik (.), garis bawah (_), hubung (-), dan plus (+)!";
      }

      // Validasi domain
      if (!domain || domain.length === 0) {
        return "Bagian domain email tidak boleh kosong!";
      }

      // Cek format domain minimal
      if (!domain.includes(".")) {
        return "Domain email harus memiliki ekstensi (contoh: .com, .id)!";
      }

      // Cek dua titik berurutan di domain
      if (domain.includes("..")) {
        return "Domain email tidak boleh mengandung dua titik berurutan!";
      }

      // Cek domain tidak boleh diawali dengan tanda hubung
      if (domain.startsWith("-")) {
        return "Domain email tidak boleh diawali dengan tanda hubung!";
      }

      // Cek karakter tidak valid di domain
      const domainInvalidChars = /[^a-zA-Z0-9.-]/;
      if (domainInvalidChars.test(domain)) {
        return "Domain email hanya boleh mengandung huruf, angka, titik (.), dan hubung (-)!";
      }

      // Cek ekstensi domain minimal 2 karakter
      const domainParts = domain.split(".");
      const extension = domainParts[domainParts.length - 1];
      if (extension.length < 2) {
        return "Ekstensi domain minimal 2 karakter (contoh: .co, .com, .id)!";
      }

      return null; // Valid
    };

    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      setError(emailError);
      return;
    }

    // Simulasi mengirim email reset
    setError("");
    setIsSubmitted(true);

    toast.success("Link reset kata sandi berhasil dikirim ke email Anda!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Auto close after 3 seconds and return to login
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      onClose();
      onBackToLogin();
    }, 3000);
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
    onClose();
    onBackToLogin();
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
        {!isSubmitted ? (
          <>
            <DialogTitle
              sx={{
                fontWeight: 700,
                fontSize: 24,
                p: 0,
                mb: 1,
                color: "#3b82f6",
              }}
            >
              Lupa Kata Sandi?
            </DialogTitle>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              Masukkan alamat email Anda dan kami akan mengirimkan link untuk
              reset kata sandi
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
                error={!!error}
                helperText={error}
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
                  mt: 3,
                  mb: 2,
                  border: "2px solid #3b82f6",
                  "&:hover": {
                    background: "#2563eb",
                    color: "#fff",
                    border: "2px solid #2563eb",
                  },
                }}
              >
                Kirim Link Reset
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Ingat kata sandi Anda?{" "}
              <Button
                variant="text"
                size="small"
                sx={{
                  textTransform: "none",
                  color: "#3b82f6",
                  fontWeight: 600,
                  fontSize: 12,
                }}
                onClick={handleBackToLogin}
              >
                Kembali ke Login
              </Button>
            </Typography>
          </>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Icon
                icon="material-symbols:mark-email-read"
                width={64}
                height={64}
                style={{ color: "#10b981" }}
              />
            </Box>
            <DialogTitle
              sx={{
                fontWeight: 700,
                fontSize: 24,
                p: 0,
                mb: 1,
                color: "#10b981",
              }}
            >
              Email Terkirim!
            </DialogTitle>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              Link reset kata sandi telah dikirim ke <strong>{email}</strong>.
              Silakan cek email Anda dan klik link yang tersedia.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: "text.secondary", fontSize: "0.875rem" }}
            >
              Link berlaku selama 15 menit. Jika tidak menerima email, periksa
              folder spam Anda.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={handleBackToLogin}
              sx={{
                background: "#3b82f6",
                borderRadius: 2,
                py: 1.2,
                fontWeight: 600,
                fontSize: 16,
                mt: 2,
                border: "2px solid #3b82f6",
                "&:hover": {
                  background: "#2563eb",
                  color: "#fff",
                  border: "2px solid #2563eb",
                },
              }}
            >
              Kembali ke Login
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
